
import React from 'react'
import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon,  LineShareButton, LineIcon, WhatsappIcon, WhatsappShareButton} from 'react-share';

import Grid from '@material-ui/core/Grid'

function Footer() {
    const url = "https://dwondiarywrite.azurewebsites.net/"

    return(
        <div>
            <Grid container spacing ={3} >
                <Grid item xs={6} >
                <p style={{textAlign: "end"}}>Copyright &copy; 2020 DiaryWrite Co. All rights reserved</p>
                </Grid>
                
                <Grid item xs={6}>
                    <WhatsappShareButton url={url}><WhatsappIcon round={true} size={32}/></WhatsappShareButton>
                    <LineShareButton url={url}><LineIcon round={true} size={32}/> </LineShareButton>
                    <FacebookShareButton url ={url}><FacebookIcon round={true} size={32}/></FacebookShareButton>
                    <TwitterShareButton url = {url}><TwitterIcon round={true} size={32}/></TwitterShareButton>
                </Grid>

            </Grid>
    
        </div>
    )

}

export default Footer
