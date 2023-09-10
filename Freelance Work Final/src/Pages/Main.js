import { useState, useEffect, useRef } from 'react';

import MainNavigation from "../Components/Navigation/MainNavigation.js";
import Navigation from "../Components/Navigation/Navigation.js";
import AllWorks from "../Components/Works/AllWorks.js";
import MainFooter from '../Components/Footer/MainFooter'
import Footer from '../Components/Footer/Footer'
import { useHistory } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import SpeeedDialButton from '../Components/SpeedDialButton'

//speed dial (floating action button)
import * as React from 'react';
import Box from '@mui/material/Box';
// import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialButton from '../Components/SpeedDialButton.js';
import SearchInput from '../Components/SearchInput.js';
import Sidebar from '../Components/Sidebar/Sidebar.js';
// import index from '../Components/SidebarMenu-main/index.html'
// import classes from './Main.Module.css'

function Main(){
    // const actions = [
    //     { icon: <AssignmentTurnedInIcon />, name: 'Add new order'},
    //     { icon: <DesignServicesIcon />, name: 'Add new work' },
    //   ];
    
    const[num,setNum] = useState(0);var cnt=0;
    const[num2,setNum2] = useState(1);
    useEffect(()=>{
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                cnt++;
                setNum(Math.ceil(cnt/6));
            }
        });
    },[])
    
    function numPage(e){
        setNum2(e.target.innerText);
    }

    // const history =useHistory();
    // function add(e){
    //     // console.log(e.currentTarget.getAttribute('aria-label'));
    //     if(e.currentTarget.getAttribute('aria-label') === 'Add new work'){
    //         history.replace('/Add_New_Work')
    //     }
    //     else{
    //         history.replace('/Add-New-Order')
    //     }

    // }
    //     const [open, setOpen] = React.useState(false);
    //     const handleOpen = () => setOpen(true);
    //     const handleClose = () => setOpen(false);

    //Sidebar
    // var sidebar = require('../Components/SidebarMenu-main/index.html');
    return(
        <div>
            
            <MainNavigation id='top' />

            <AllWorks num2={num2}/>
            
            
            {/* <iframe src={sidebar}></iframe> */}
            
            {/* <p style={{position:'fixed'}}>bnklblkblk</p> */}
            {/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 ,position:'fixed',bottom:'-100px',right:'50px',overflow:'hidden'}}>
                <SpeedDial style={{overflow:'hidden'}} 
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon style={{overflow:'hidden'}} openIcon={<EditIcon />} 

                    
                    />}
                >
                    {actions.map((action) => (
                    <SpeedDialAction style={{overflow:'hidden'}}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={add}
                        tooltipopen
                        // sx={{backgroundColor:'red'}}
                    />
                    ))}
                </SpeedDial>
            </Box> */}

            {/* <Navigation/> */}
            <SearchInput/>
            
            {/* <a href='#top'>
                <Stack spacing={2} style={{'position':'relative','left':'45%'}} onClick={numPage}>
                    <Pagination count={num} color="secondary" />
                </Stack>
            </a>
            <br/><br/><br/><br/> */}
            
            <MainFooter />
            <Footer />
            
            <Sidebar/>
            <SpeedDialButton/>

    
            {/* <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 ,overflow:'hidden'}}>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                    />
                    ))}
                </SpeedDial>
            </Box> */}
  
            
        </div>
    );
}
export default Main;
