import React from 'react';
import { useState,useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';

import WorkList from './WorkList.js';

import classes from "./Work.Module.css";
import Modal from '../ConfirmLogOut/Modal.js';
import Backdrop from '../ConfirmLogOut/Backdrop.js';

import styled from 'styled-components';

import { Box, Spinner } from 'grommet';

import { initializeApp,getApps} from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function AllWorks(props){
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

  //Loading
  const gradient =
  'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)';

const gradientRainbow =
  'radial-gradient(circle at 50% -3.03%, #ff99ff 0, #ff91ff 3.33%, #ff8bf9 6.67%, #ff86e4 10%, #ff85cf 13.33%, #ff85b9 16.67%, #ff89a4 20%, #ff8f90 23.33%, #ff967d 26.67%, #ff9e6a 30%, #ffa758 33.33%, #ffb047 36.67%, #ffb937 40%, #ffc228 43.33%, #ffca1a 46.67%, #f8d110 50%, #e5d812 53.33%, #d0de1f 56.67%, #bae32f 60%, #a2e840 63.33%, #87ec52 66.67%, #67ef65 70%, #36f279 73.33%, #00f48e 76.67%, #00f6a3 80%, #00f7b9 83.33%, #00f8cf 86.67%, #00f9e5 90%, #00f9fb 93.33%, #00f9ff 96.67%, #00f8ff 100%);';

const BounceSpinner = styled(Spinner)`
  animation-name: bounce-1;
  animation-timing-function: ease;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  @keyframes bounce-1 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const [meterValue, setMeterValue] = useState(0);
const[num,setNum] = useState(0);var cnt=0;
const[num2,setNum2] = useState(1);
const[pageNum,setPageNum] = useState(1);

useEffect(() => {
  const timer = setInterval(() => {
    if (meterValue < 100) setMeterValue(meterValue + 0.02);
  });
  return () => {
    clearTimeout(timer);
  };
}, [meterValue]);
//end of the loading
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
  const storageRef = ref(storage,window.name);

  const history =useHistory();
  const location = useLocation()

  const [isLoading , setIsLoading] = useState(true);
  const [loadedWorks , setLoadedWorks] = useState( [] );
  const [ modalIsOpen , setModalIsOpen ] = useState( false );
  const [ filter , setFilter ] = useState( false );

  const [pag , setPag] = useState(0);var c=1;var previous=0;//pagination


  useEffect( () => {
    
    setIsLoading(true);
    // console.log("yes")
    c=(( ( (num2)-1 )*6 )+1);
    previous = c-1;
    var url='';
    if(window.location.href.includes('#')){
    url = window.location.href.substring(window.location.href.indexOf('#') + 1);
    }
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).
    then(response =>
      {return response.json();}
    ).
    then(data => {
      // console.log(Object.keys(data).reverse());
      // const dataReverse = Object.keys(data).reverse();
      const works = [];
      // console.log(url)
      if(url!='' && url!='top' ){//location filter
        // console.log("if")
        cnt=0;
        const keyAll =Object.keys(data);
        keyAll.reverse();
        console.log(keyAll)
        for ( const key in keyAll ){
          // console.log(url)
          if (data[keyAll[key]].job===url || data[keyAll[key]].title.includes(url)){
            cnt++;
            // setNum(Math.ceil(cnt/6));
            const work ={
              id : key,
              ...data[keyAll[key]]
            }
            works.push(work);
          }
          
        }
        // window.onload(()=>{
        //   document.getElementById('top').style.visibility = 'hidden';
        // })
        setNum(Math.ceil(cnt/6));
      }
      else{//Normal
        // if(url==='top'){document.getElementById('top').style.visibility = 'hidden'}
        // console.log("else")
        const keyAll =Object.keys(data);
        keyAll.reverse();
        for ( const key in keyAll ){
          // while( (( ( (props.num2)-1 )*4 )+1)<=c && (( ( (props.num2) )*4 )+1)>c ){
           if(previous !=0){previous--;continue}
          if((( ( (num2)-1 )*6 )+1)<=c && (( ( (num2) )*6 )+1)>c){
            // console.log(c)
            c++;setPag(c);
            cnt++;
            // setNum(Math.ceil(cnt/6));
          const work ={
            id : key,
            ...data[keyAll[key]]
          };
          works.push(work);
        }
      }
          // console.log(key)
          
      } 
        setIsLoading(false);
        setLoadedWorks(works);
      // console.log(works.reverse())
    });
    // }
    
    
  } , [window.location.href,num2] );


    if(isLoading){
      // if(true){
      return (
        <section>
          <p><b>Loading...</b></p>
          <Box
            gap="xlarge"
            pad={{ vertical: 'xlarge', horizontal: 'large' }}
            margin="xlarge"
            
          >
            
            <Spinner style={{margin:'auto',marginTop:'0px'}}
              background={gradient}
              size="large"
              
              animation={[
                { type: 'fadeIn', duration: 1400, size: 'large' },
                { type: 'pulse', duration: 1000, size: 'large' },
              ]}
              border={false}
            />
             {/* <BounceSpinner
                  background={gradientRainbow}
                  border={false}
                  size="medium"
                /> */}
          </Box>
        </section>
      );
    }
    
    
  //   var vis=false;
  //   function profile(){
  //     vis=!vis;
  //     if(vis){
  //       document.getElementById('profileBorder').style.visibility='visible';
  //     }
  //     else{
  //       document.getElementById('profileBorder').style.visibility='hidden';
  //     }
  // }

  // function viewProfile(){
  //   history.replace("/My-Profile")
  // }

  
  // function deleteHandler(){
  //   setModalIsOpen(true);
  // }

  // function closeModalHandler(){
  //     setModalIsOpen(false);
  // }

  
  // function confirmModalHandler(){
  //   window.name='';
  //   history.replace('/');
  // }

  // getDownloadURL(storageRef)
  // .then((url) => {
  //   // `url` is the download URL for 'images/stars.jpg'

  //   // This can be downloaded directly:
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     const blob = xhr.response;
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();

  //   // Or inserted into an <img> element
  //   const img = document.getElementById('myimg');
  //   img.setAttribute('src', url);
  // }).catch((error)=>{
  //   if(error.code==='storage/object-not-found')
  //       {}
  // })
    
  // console.log(loadedWorks)
 
  function numPage(e){
    setNum2(e.target.innerText);
    setPageNum(parseInt(e.target.innerText))
    // console.log(parseInt(e.target.innerText))
    // console.log(2)
}
return (
        <div>
            <WorkList works={loadedWorks}/>

            <a href='#top' id='top'>
                <Stack spacing={2} style={{'position':'relative','left':'45%'}} onClick={numPage}>
                    <Pagination count={num} color="primary" page={pageNum}/>
                </Stack>
            </a>
            <br/><br/><br/><br/>

            

            {/* <input id='myimg' type="image" src="Images/Profile.png" alt="Profile" className={classes.profile} onClick={profile}/>
            
            <div className={classes.profileBorder} id='profileBorder'> */}
              {/* <p className={classes.email}>{window.name}</p> */}
              {/* <button className={classes.prof} onClick={viewProfile}>View profile</button>
              <button className={classes.logOut} onClick={deleteHandler}>Log out</button>
            </div>

            { modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={confirmModalHandler} /> }
            { modalIsOpen && <Backdrop onCancel={closeModalHandler} /> } */}
        </div>
    );
}
export default AllWorks;