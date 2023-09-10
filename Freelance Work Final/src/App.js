import React from 'react';
import { Route,Switch } from 'react-router-dom';

import My_Project from './Pages/My_Project.js'
import Sign_Up from './Pages/Sign_Up.js';
import Main from './Pages/Main.js';
import Add_New_Work from './Pages/Add_New_Work.js';
import Navigation from './Components/Navigation/Navigation.js';
import My_Favorites from './Pages/My_Favorites.js';

import MyProfile from './Profile/MyProfile';
import OwnWorks from './Profile/ownWorks';

import AuthorProfile from './Profile/AuthorProfile';
import AuthorWorks from './Profile/AuthorWorks';

import AboutUS from './Pages/AboutUS';

import AllOrders from './Components/Orders/AllOrders';
import Add_New_Order from './Pages/AddNewOrder.js';

function App() {
  return (
    <div>
      
      <Switch>

        <Route path='/' exact>
          <My_Project/>
        </Route>

        <Route path='/Sign_Up'>
          <Sign_Up/>
        </Route>

        <Route path='/Main'>
          <Main />
        </Route>

        <Route path='/Add_New_Work'>
          <Add_New_Work />
        </Route>

        <Route path='/My_Favorites'>
          <My_Favorites />
        </Route>

        <Route path='/My-Profile'>
          <MyProfile />
        </Route>

        <Route path='/Own-Works'>
          <OwnWorks />
        </Route>

        <Route path='/Author-Profile'>
          <AuthorProfile />
        </Route>

        <Route path='/Author-Works'>
          <AuthorWorks />
        </Route>

        <Route path='/About-US'>
          <AboutUS />
        </Route>

        <Route path='/All-Orders'>
          <AllOrders />
        </Route>

        <Route path='/Add-New-Order'>
          <Add_New_Order />
        </Route>
      </Switch>

      {/* <Footer/> */}
    </div>
  );
}

export default App;
