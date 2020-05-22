import React from 'react';
import axios from '../util/axios';

//Mui Stuff
import Typography from "@material-ui/core/Typography";

import FullPageLayout from "../components/Layout/FullPageLayout";


const Account = (props) => {

	
	return(
		<FullPageLayout containerType="wideContainer" >
			<div style="text-align:center">
			<Typography variant='h5'>
				Want to become an Analyst?
			</Typography>
			<Typography variant='body1'>
				We split half of all advertising and subscription proceeds
				with our analyst community. Analysts also get free access to 
				Hayek pro if they publish at least two ideas per year.
			</Typography>
			<Typography variant = 'body1'>
				To apply, send an email to team@hayek.ai with 1) Your Username
				2)2-3 sentences on your background 3) A write of of your first 
				investment idea that you plan to post.
			</Typography>
			<Typography variant = "body1">
				We will do our best to get back to you in less than 12 hours.
			</Typography>
			</div>
		</FullPageLayout>
	)



}
