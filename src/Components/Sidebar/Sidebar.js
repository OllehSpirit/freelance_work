
//import useState hook to create menu collapse state
import React, { useState,useEffect } from "react";
import { useHistory } from 'react-router-dom';

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";


const Header = () => {
  const history =useHistory();
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)
    var url=''; 
    //when all works clicked the 5 buttons background image none
  //   (function(history){
  //     var pushState = history.pushState;
  //     history.pushState = function(state) {
  //       // YOUR CUSTOM HOOK / FUNCTION
  //       document.getElementById('a').style.backgroundImage = 'none';
  //       document.getElementById('b').style.backgroundImage = 'none';
  //       document.getElementById('c').style.backgroundImage = 'none';
  //       document.getElementById('d').style.backgroundImage = 'none';
  //       document.getElementById('e').style.backgroundImage = 'none';
  //       // console.log('I am called from pushStateHook');
  //       return pushState.apply(history, arguments);
  //     };
  // })(window.history);
    useEffect( () => {
      
      if(window.location.href.includes('#')===false || window.location.href!='http://localhost:3000/About-US'){
        url = window.location.href.substring(window.location.href.indexOf('#') + 1);
        document.getElementById('a').style.backgroundImage = 'none';
        document.getElementById('b').style.backgroundImage = 'none';
        document.getElementById('c').style.backgroundImage = 'none';
        document.getElementById('d').style.backgroundImage = 'none';
        document.getElementById('e').style.backgroundImage = 'none';
      }
      else{url='none'}
      // console.log(url)
    },[window.history,history.pushState]);//بدون فائدة

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    // console.log(document.getElementById('a').style.backgroundImage);
    // document.getElementById('a').style.backgroundImage = 'none';
  };

  function fun(e){
    // console.log(e.target.id)
    var workFilter = e.target.id;
    if(workFilter==='Tailor'){
      document.getElementById('a').style.backgroundImage = 'linear-gradient(0deg, #55324a 0%, #cc2062 100%)';

      document.getElementById('b').style.backgroundImage = 'none';
      document.getElementById('c').style.backgroundImage = 'none';
      document.getElementById('d').style.backgroundImage = 'none';
      document.getElementById('e').style.backgroundImage = 'none';
    }

    if(workFilter==='Painter'){
      document.getElementById('b').style.backgroundImage = 'linear-gradient(0deg, #55324a 0%, #cc2062 100%)';
      document.getElementById('b').style.left = '0px'
      document.getElementById('a').style.backgroundImage = 'none';
      document.getElementById('c').style.backgroundImage = 'none';
      document.getElementById('d').style.backgroundImage = 'none';
      document.getElementById('e').style.backgroundImage = 'none';
    }

    if(workFilter==='TaxiDriver'){
      document.getElementById('c').style.backgroundImage = 'linear-gradient(0deg, #55324a 0%, #cc2062 100%)';

      document.getElementById('a').style.backgroundImage = 'none';
      document.getElementById('b').style.backgroundImage = 'none';
      document.getElementById('d').style.backgroundImage = 'none';
      document.getElementById('e').style.backgroundImage = 'none';
    }

    if(workFilter==='Carpenter'){
      document.getElementById('d').style.backgroundImage = 'linear-gradient(0deg, #55324a 0%, #cc2062 100%)';

      document.getElementById('a').style.backgroundImage = 'none';
      document.getElementById('c').style.backgroundImage = 'none';
      document.getElementById('b').style.backgroundImage = 'none';
      document.getElementById('e').style.backgroundImage = 'none';
    }

    if(workFilter==='AboutUS'){
      document.getElementById('e').style.backgroundImage = 'linear-gradient(0deg, #55324a 0%, #cc2062 100%)';

      document.getElementById('a').style.backgroundImage = 'none';
      document.getElementById('c').style.backgroundImage = 'none';
      document.getElementById('d').style.backgroundImage = 'none';
      document.getElementById('b').style.backgroundImage = 'none';
      history.replace('/About-US')
    }
  //   history.push({
  //     pathname: '/Main',
  //     // search: '?query=abc',
  //     state: {detail: workFilter}
  // });
  }

  return (
    <>
      <div id="header" className="side">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          {/* <div className="logotext"> */}
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div> */}
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent >
            <Menu iconShape="square" style={{marginTop:'20px'}}>
              <MenuItem active={true} icon={<img src="Images/T.png"/>} id='a' onClick={fun} ><a  href="#Tailor" id='Tailor'>Tailor</a></MenuItem>
              <MenuItem icon={<img src="Images/P.png"/>} id='b'  onClick={fun}><a  href="#Painter" id='Painter'>Painter</a></MenuItem>
              <MenuItem icon={<img src="Images/Tax.png"/>} id='c'  onClick={fun}><a  href="#TaxiDriver" id='TaxiDriver'>Taxi Driver</a></MenuItem>
              <MenuItem icon={<img src="Images/C.png"/>} id='d' onClick={fun}><a  href="#Carpenter" id='Carpenter'>Carpenter</a></MenuItem>
              <MenuItem icon={<img src="Images/A.png"/>} id='e' onClick={fun} ><a id='AboutUS'>About US</a></MenuItem>
            </Menu>
          </SidebarContent>
          {/* <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter> */}
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;