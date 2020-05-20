import React from "react";
import { searchAutocomplete } from "../../api";

// Mui stuff
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

class Searchbar extends React.Component {
  _isMounted = false;

  state = {
    open: false,
    dialogOpen: false,
    options: [],
    query: "",
    loading: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchOptions = async (query) => {
    if (query !== "") {
      let optionList;
      try {
        const response = await searchAutocomplete(query);
        optionList = [...response.stocks, ...response.analysts];
      } catch (err) {
        console.log(err);
      }

      if (this._isMounted && optionList) {
        this.setState({
          loading: false,
          options: optionList.map((item) => {
            const type = item["1. symbol"] ? "Stock" : "Analyst";
            const matchScore = item["9. matchScore"]
              ? parseFloat(item["9. matchScore"])
              : 100;
            const name = item["1. symbol"]
              ? `${item["2. name"]} (${item["1. symbol"]})`
              : item.username;
            const value = item["1. symbol"] ? item["1. symbol"] : item.username;
            return {
              type: type,
              matchScore: matchScore,
              name: name,
              value: value,
            };
          }),
        });
      }
    }
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value, loading: true });
    this.fetchOptions(event.target.value);
    if (event.target.value === "") {
      this.setState({ loading: false });
    }
  };

  handleOptionSelect = async (value) => {
    if (value) {
      if (value.type === "Analyst") {
        this.props.history.push(`/profile/${value.value}`);
      } else if (value.type === "Stock") {
        this.props.history.push(`/ideas/${value.value}`);
      } else {
        // handles hitting enter without selecting an option
        // submit a search query, and take first option
        // else, alert "sorry we couldn't find a stock or analyst that matched that query"
        this.setState({ loading: true });
        const response = await searchAutocomplete(value);
        if (response !== undefined && response.analysts.length > 0) {
          this.props.history.push(`/profile/${response.analysts[0].username}`);
        } else if (response !== undefined && response.stocks.length > 0) {
          this.props.history.push(`/ideas/${response.stocks[0]["1. symbol"]}`);
        } else {
          this.setState({
            open: false,
            dialogOpen: true,
            options: [],
            query: "",
            loading: false,
          });
        }
      }
    }
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <Autocomplete
          open={this.state.open}
          style={{ width: "100%" }}
          onChange={(event, value) => this.handleOptionSelect(value)}
          onOpen={() => this.setState({ open: true })}
          onClose={() => this.setState({ open: false })}
          groupBy={(option) => option.type}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => (option.name ? option.name : option)}
          options={this.state.options.sort(
            (a, b) => b.matchScore - a.matchScore
          )}
          loading={this.state.loading}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="search analysts and stocks..."
              variant="outlined"
              value={this.state.query}
              onChange={this.handleChange}
              InputProps={{
                ...params.InputProps,
                style: { paddingRight: 12 },
                endAdornment: (
                  <React.Fragment>
                    {this.state.loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Dialog open={this.state.dialogOpen} onClose={this.handleDialogClose}>
          <DialogTitle>
            Sorry, we couldn't find a stock or analyst that matched that query.
          </DialogTitle>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Searchbar;
