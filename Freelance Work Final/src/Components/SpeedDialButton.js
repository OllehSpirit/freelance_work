import { useState, useEffect, useRef } from 'react';

import MainNavigation from "./Navigation/MainNavigation.js";
import Navigation from "./Navigation/Navigation.js";
import AllWorks from "./Works/AllWorks.js";
import MainFooter from './Footer/MainFooter'
import Footer from './Footer/Footer'
import { useHistory } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

//speed dial (floating action button)
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
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
// import classes from './Main.Module.css'

function SpeedDialButton(){
    const actions = [
        { icon: <AssignmentTurnedInIcon />, name: 'Add new order'},
        { icon: <DesignServicesIcon />, name: 'Add new work' },
      ];
    
    const history =useHistory();
    function add(e){
        // console.log(e.currentTarget.getAttribute('aria-label'));
        if(e.currentTarget.getAttribute('aria-label') === 'Add new work'){
            history.replace('/Add_New_Work')
        }
        else{
            history.replace('/Add-New-Order')
        }

    }
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
    return(
        <div>
            {/* <p style={{position:'fixed'}}>bnklblkblk</p> */}
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 ,position:'fixed',bottom:'-100px',right:'50px',overflow:'hidden'}}>
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
            </Box>

    
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
export default SpeedDialButton;