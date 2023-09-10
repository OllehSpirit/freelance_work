import React from "react";

import classes from './Footer.module.css';

function Footer(){
    return(
        <footer className={classes.foo}>
            <span className={classes.fooSpan}> <b> for more information please contact us </b></span><br/>
            <a href="https://www.google.com/gmail/about/">
                <img src="Images/gmail.png" className={classes.socialdetails1}/>
            </a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <a href="https://www.facebook.com/" >
                <img src="Images/facebook.png" className={classes.socialdetails2}/>
            </a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <a href="https://www.instagram.com/">
                <img src="Images/instagram.png" className={classes.socialdetails3}/>
            </a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <a href="https://telegram.org/" >
                <img src="Images/telegram.png" className={classes.socialdetails4}/>
            </a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <a href="https://www.whatsapp.com/" >
                <img src="Images/whatsapp.png" className={classes.socialdetails5}/>
            </a>

            <br/><br/><br/>
            <div className={classes.fooSpan} style={{color:'black'}}><b>Copyright © Freelance Work 2022</b></div>
        </footer>
    );
}
export default Footer;