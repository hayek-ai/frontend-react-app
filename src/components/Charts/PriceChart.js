import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import dayjs from "dayjs";

import { useTheme } from "@material-ui/core/styles";

const PriceChart = ({ chartInfo }) => {
  const theme = useTheme();

  return (
    <div style={{ margin: "auto" }}>
      <LineChart
        width={340}
        height={250}
        data={chartInfo}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          dataKey="date"
          stroke={theme.palette.text.primary}
          tickFormatter={(timeStr) => dayjs(timeStr).format("MMM")}
        />
        <YAxis stroke={theme.palette.text.primary} domain={["auto", "auto"]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="close"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
};

export default PriceChart;
