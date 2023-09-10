import React from "react";
import {Link} from 'react-router-dom';
import {useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../ConfirmLogOut/Modal.js';
import Backdrop from '../ConfirmLogOut/Backdrop.js';
import Navigation from './Navigation'

import { initializeApp,getApps} from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL, connectStorageEmulator  } from "firebase/storage";

import classes from './MainNavigation.module.css';

function MainNavigation(){

    // var emailNow;
    const history =useHistory();
    if(localStorage.getItem('email')===null || localStorage.getItem('email')===''){history.replace('/')}
    // console.log(window.location.href.includes('#'))
    // if(null!='')
    // console.log(localStorage.getItem('email'))

    const firebaseConfig = {

        apiKey: "AIzaSyCOhPjTsO-SvutOhD-7apWXM0B3QmqofSo",
      
        authDomain: "freelance-work-fde92.firebaseapp.com",
      
        databaseURL: "https://freelance-work-fde92-default-rtdb.firebaseio.com",
      
        projectId: "freelance-work-fde92",
      
        storageBucket: "freelance-work-fde92.appspot.com",
      
        messagingSenderId: "1075773849029",
      
        appId: "1:1075773849029:web:0e71b107fca8f396eb5fac"
      
      };

  if(getApps().length<1){
    const app = initializeApp(firebaseConfig);
  } 
  var storage = getStorage();
  const storageRef = ref(storage,localStorage.getItem('email'));

  const [ modalIsOpen , setModalIsOpen ] = useState( false );
    
useEffect(()=>{
    
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
    ).
    then(response =>
    {return response.json();}
    ).
    then(data => {
        const keyAll =Object.keys(data);
    
        for ( const key in keyAll ){
            if (data[keyAll[key]].email===localStorage.getItem('email')){
                document.getElementById('notif').innerHTML = data[keyAll[key]].countFavorites;
            }
        }
    })

    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).
    then(response =>
    {return response.json();}
    ).
    then(data => {
        const keyAll =Object.keys(data);
        for ( const key in keyAll ){
          if(data[keyAll[key]].author===localStorage.getItem('email')){
            if(data[keyAll[key]].rating < 2 && data[keyAll[key]].cntRating >= 10){
              fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/BlockList.json',
              {
                method : 'POST',
                body : JSON.stringify({email : localStorage.getItem('email')}),
                headers : {
                    'Content-Type' : 'application/json'
                }
              }).then( () => { history.replace('/') } );
            }
          }
        }
      });
},[]);

// function reload(){
//   document.location.reload(true)
//   history.replace('/Main')
// }


    


    // fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/logInNow.json'
    //     ).
    //     then(response =>
    //     {return response.json();}
    //     ).
    //     then(data => {
    //         if(!data){history.replace('/')}
    //         else{
    //             const keyAll =Object.keys(data);
    //             emailNow = data[keyAll].email;
                
    //             fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
    //             ).
    //             then(response =>
    //             {return response.json();}
    //             ).
    //             then(data => {
    //                 const keyAll =Object.keys(data);
                
    //                 for ( const key in keyAll ){
    //                     if (data[keyAll[key]].email===emailNow){
                            
    //                     }
    //                 }
    //                 fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/logInNow.json',
    //                             {
    //                                 method : 'DELETE',
    //                                 body : JSON.stringify(emailNow),
    //                                 headers : {
    //                                     'Content-Type' : 'application/json'
    //                                 }
    //                             }
    //                         ); 
    //             });
    //         }
            
    //     });

    var vis=false;
    function profile(){
      vis=!vis;
      if(vis){
        document.getElementById('profileBorder').style.visibility='visible';
      }
      else{
        document.getElementById('profileBorder').style.visibility='hidden';
      }
  }

  function viewProfile(){
    history.replace("/My-Profile")
  }

  
  function deleteHandler(){
    setModalIsOpen(true);
  }

  function closeModalHandler(){
      setModalIsOpen(false);
      document.getElementById('profileBorder').style.visibility='hidden';
  }

  
  function confirmModalHandler(){
    window.name='';
    localStorage.setItem('email','');
    localStorage.setItem('name','');
    history.replace('/');
  }

  getDownloadURL(storageRef)
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  }).catch((error)=>{
    if(error.code==='storage/object-not-found')
        {}
  })

    

    return(
        <header>
            <h1 className={classes.IntroMainNavigation} >Find Work With Me</h1>
            <img src="Images/LOGO2.png" className={classes.logo}/>

            <ul>
                <li>
                
                    <Link to='/Main'>All Works</Link>
                </li>
            
                <li>
                    <Link to='/My_Favorites'>My Favorites
                            <span className={classes.notif} id='notif'></span>
                    </Link>
                </li>

                {/* <li>
                    <Link to='/Add_New_Work'>Add New Work</Link>
                </li> */}

                <li>
                    <Link to='/All-Orders'>All Orders</Link>
                </li>

                {/* <li>
                    <Link to='/Add-New-Order'>Add New Order</Link>
                </li> */}
            </ul>

            <input id='myimg' type="image" src="Images/Profile.png" alt="Profile" className={classes.profile} onClick={profile}/>
            <div className={classes.profileBorder} id='profileBorder'>
              {/* <p className={classes.email}>{window.name}</p> */}
              <button className={classes.prof} onClick={viewProfile}>View profile</button>
              <button className={classes.logOut} onClick={deleteHandler}>Log out</button>
            </div>

            { modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={confirmModalHandler} /> }
            { modalIsOpen && <Backdrop onCancel={closeModalHandler} /> }

            <Navigation/>
            
        </header>
    );
}
export default MainNavigation;