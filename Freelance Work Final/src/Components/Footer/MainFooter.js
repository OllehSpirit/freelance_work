import React from "react";
import {Link} from 'react-router-dom';
import { Grommet as GrommetIcon } from 'grommet-icons';
import { Anchor, Box, Footer, Main, Text } from 'grommet';

import { useHistory } from 'react-router-dom';

import classes from './MainFooter.module.css';

function MainFooter(){

    const history =useHistory();
    
    const FooterAnchor = ({ ...rest }) => (
        <Anchor href="/" size="small" color="white" {...rest} />
      );

 
      function filterhandler(e){
        var workFilter = e.target.id;
        history.push({
            // pathname: '/Main',
            // search: '?query=abc',
            state: {detail: workFilter}
        });
        // if(window.location.href.search("Fav")===-1){
        //     history.replace("/Job-Tailor");
        // }
        // else{
        //     history.replace("/Job-Tailor-Fav");
        // }
    }

    function about(){
        history.replace('/About-US')
    }


    return(
        <div className={classes.mainFooter}>

        <Box>
            <Footer style={{backgroundImage: 'linear-gradient(180deg, #2E424D , #5B8291 )'}} pad="large">
                <Box direction="row-responsive" gap="xsmall">
                    <Box align="center" gap="small">
                        <img src="Images/LOGO2.png" style={{width:'300px'}} className={classes.logo}/>
                        {/* <Text alignSelf="center" color="white" weight="bold">
                            Freelance Work
                        </Text> */}
                    </Box>
                </Box>
          
                <Box gap="medium" >
                    <Text weight="bold" size="small" color='white'>
                    {/* nothing */}
                    </Text>
                    <Box className={classes.main}>
                        <FooterAnchor className={classes.title}><Link to='/Main' className={classes.link}>All Works</Link></FooterAnchor>
                        <FooterAnchor className={classes.title}><Link to='/My_Favorites' className={classes.link}>My Favorites</Link></FooterAnchor>
                        <FooterAnchor className={classes.title}><Link to='/Add_New_Work' className={classes.link}>Add New Work</Link></FooterAnchor>
                        <FooterAnchor className={classes.title}><Link to='/All-Orders' className={classes.link}>All Orders</Link></FooterAnchor>
                        <FooterAnchor className={classes.title}><Link to='/Add-New-Order' className={classes.link}>Add New Order</Link></FooterAnchor>
                    </Box>


                </Box>

                <Box gap="medium" className={classes.main2}>
                    <Text weight="bold" size="small" style={{color:'white',fontSize:'21px'}}>
                    Jobs :
                    </Text>
                    <Box className={classes.main2}>
                        <FooterAnchor className={classes.title}><a href="#tailor" onClick={filterhandler} id='tailor' className={classes.link}>Tailor</a></FooterAnchor>
                        <FooterAnchor className={classes.title}><a href="#painter" onClick={filterhandler} className={classes.link}>Painter</a></FooterAnchor>
                        <FooterAnchor className={classes.title}><a href="#td"onClick={filterhandler} className={classes.link}>Taxi driver</a></FooterAnchor>
                        <FooterAnchor className={classes.title}><a href="#carpenter"onClick={filterhandler} className={classes.link}>Carpenter</a></FooterAnchor>
                    </Box>
                </Box>

                <Box gap="medium" >
                    <Text weight="bold" size="small" color='white'>
                    <button className={classes.aboutUs} onClick={about}>About US</button>
                    </Text>
                    <Box>
                         {/* nothing */}
                    </Box>
                </Box>
            </Footer>
        </Box>
        
        </div>
    );
}
export default MainFooter;