import React from "react";
import {useRef} from 'react';
import { useHistory } from 'react-router-dom';
import {useEffect,useState } from 'react';

import { Hide, View } from 'grommet-icons';
import { Box, Button, TextInput } from 'grommet';

import CircularProgress from '@mui/material/CircularProgress';


// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { sendForm } from 'emailjs-com';

import classes from './My_Project.module.css';
import Footer from '../Components/Footer/Footer'

import { initializeApp,getApps} from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL, connectStorageEmulator  } from "firebase/storage";

function My_Project (){
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

    // const [ block , setBlock ] = useState( false );
    const [pass , setPass] = useState('')
    const [wrong , setWrong] = useState('')

    const [pic1 , setPic1] = useState('')
    const [pic2 , setPic2] = useState('')
    const [pic3 , setPic3] = useState('')
    const [pic4 , setPic4] = useState('')
    const [pic5 , setPic5] = useState('')
    
    
    var block=0;
    const emailInputRef = useRef();
    const passwdInputRef = useRef();
    const recEmail = useRef();

    const history =useHistory();
useEffect(()=>{
    var cnt=0;
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).
    then(response =>
    {return response.json();}
    ).
    then(async data => {
        const keyAll =Object.keys(data);
        keyAll.reverse();
        for ( const key in keyAll ){
            cnt++;
            if(cnt>=6){break;}
            // console.log(cnt)
            if(cnt===1){
                setPic1(data[keyAll[key]].title)
            }
            else if(cnt===2){
                setPic2(data[keyAll[key]].title)
            }
            else if(cnt===3){
                setPic3(data[keyAll[key]].title)
            }
            else if(cnt===4){
                setPic4(data[keyAll[key]].title)
            }
            else if(cnt===5){
                setPic5(data[keyAll[key]].title)
            }
        }
        
    });
    if(pic1){
    // console.log(pic1)
    const storageRef = ref(storage , pic1);
    getDownloadURL(storageRef)
    .then( (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    document.getElementById('1').src=url;
    }).catch((error)=>{if(error.code==='storage/object-not-found'){}})
    }

// // ------------------picture2----------------
    if(pic2){
    const storageRef2 = ref(storage , pic2);
    getDownloadURL(storageRef2)
    .then( (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    document.getElementById('2').src=url;
    }).catch((error)=>{if(error.code==='storage/object-not-found'){}})
    }
    
// // ------------------picture3----------------
    if(pic3){
    const storageRef3 = ref(storage , pic3);
    getDownloadURL(storageRef3)
    .then( (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    document.getElementById('3').src=url;
    }).catch((error)=>{if(error.code==='storage/object-not-found'){}})
    }
 
// // ------------------picture4----------------
    if(pic4){
    const storageRef4 = ref(storage , pic4);
    getDownloadURL(storageRef4)
    .then( (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    document.getElementById('4').src=url;
    }).catch((error)=>{if(error.code==='storage/object-not-found'){}})
    }
    
// // ------------------picture5----------------
    if(pic5){
    const storageRef5 = ref(storage , pic5);
    getDownloadURL(storageRef5)
    .then( (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
    document.getElementById('5').src=url;
    }).catch((error)=>{if(error.code==='storage/object-not-found'){}})
    }
})

    // localStorage.setItem('name','3arnous');
    // console.log(localStorage.getItem('name'))
    
    function btnsignup(){
        history.replace('/Sign_Up');
    }

    async function submitHandler(event){
        document.getElementById('progress').style.visibility = 'visible'
        // setBlock(false);
        block=0;
        document.getElementById('wrong').innerHTML="";
        // document.getElementById('wrong2').innerHTML="";

        event.preventDefault();

        const enteredemail=emailInputRef.current.value;
        const enteredpasswd=passwdInputRef.current.value;
        // const workData ={
        //     email: enteredemail,
        //     password : enteredpasswd
        // };
        await fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/BlockList.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].email===enteredemail){
                    // setBlock(true);
                    block=1;
                    document.getElementById('progress').style.visibility = 'hidden'
                    // console.log(block);
                }
            }
           
        });
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            
            for ( const key in keyAll ){

                
//  console.log(block)
                if(block){
                    document.getElementById('wrong').innerHTML="We apologize that this account has been locked due to violations you have committed";
                }
                // else if(data[keyAll[key]].email!=enteredemail || data[keyAll[key]].passwd!=enteredpasswd){
                //    document.getElementById('wrong').innerHTML="Invalid email or password";
                // }
                else if (data[keyAll[key]].email===enteredemail && data[keyAll[key]].passwd===enteredpasswd){
                    // {   const logInNow ={ email : enteredemail };
                    // document.getElementById('progress').style.visibility = 'visible'
                        window.name = enteredemail;
                        localStorage.setItem('email',enteredemail);
                        localStorage.setItem('name' , data[keyAll[key]].fname + ' ' + data[keyAll[key]].lname)
                        history.replace('/Main');

                        // fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/logInNow.json',
                        //     {
                        //         method : 'POST',
                        //         body : JSON.stringify(logInNow),
                        //         headers : {
                        //             'Content-Type' : 'application/json'
                        //         }
                        //     }
                        // ).then( () => { history.replace('/Main') } ); 
                }
                else{
                //     // console.log(key1[key]); ///id
                    // setTimeout(()=>{
                        setWrong("Invalid email or password")
                    // document.getElementById('progress').style.visibility = 'hidden';
                        
                    // },3000)
                        
                    
                    
                }
             }
        });
        document.getElementById('progress').style.visibility = 'hidden';
    }
    
// console.log(block)
    const [value, setValue] = React.useState('');
    const [reveal, setReveal] = React.useState(false);


  //Dialog
  const [open, setOpen] = useState(false);
      
  const handleClickOpen = () => {
    setOpen(true);
    // fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    //           ).
    //           then(response =>
    //           {return response.json();}
    //           ).
    //           then(data => {
                  
    //               const keyAll =Object.keys(data);
    //               for ( const key in keyAll ){
    //               if (data[keyAll[key]].title==='foo'){
    //                   setDialog(data[keyAll[key]].author)
    //                   }
    //               }
    //           });
              // {console.log(dialog);
              //     console.log(localStorage.getItem('name'));
              //     console.log(localStorage.getItem('email'));
              //     console.log(props.title);
              //     console.log(name);
              //     }
            //   console.log(form)
  };

  var foundEmail =true;
  var passs;
  const handleClose = () => {
    setOpen(false);
  };

  const form = useRef();
  var foundEmail =true;
  async function sendEmail(e){
    //   console.log(recEmail.current.value);
      e.preventDefault();
      foundEmail =true;
      document.getElementById('error').innerHTML = '';

      await fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].email===recEmail.current.value){
                    foundEmail =false;
                    setPass(data[keyAll[key]].passwd);
                    passs=data[keyAll[key]].passwd;
                    // console.log(data[keyAll[key]].passwd)
                }
            }
        });

        if(foundEmail){
            document.getElementById('error').innerHTML = 'This email is not available';
        }
        else{
            sendForm('service_bwbpl28', 'template_5tnll98', form.current, 'Ralqsj8R7HzqjR-DE')
            .then((result) => {
                //  console.log(result.text);
                setOpen(false);
            }, (error) => {
                //  console.log(error.text);
            });
            setOpen(false);
        }
        
    };
//   console.log(pic1)


      return(
        <div >
            <h1 className={classes.IntroNavigation} >Find Work With Me</h1> 
            <img src="Images/LOGO2.png" className={classes.logo2}/>
            <section>
                <img src="Images/Background.png" alt="about Project" className={classes.mainBackGround}/>
            </section>
            
            <form className={classes.log_in} onSubmit={submitHandler}>
                <a name="targetname" className={classes.target}></a>
                <img src="Images/signIn.png" alt="signin" className={classes.img} /><br/>
                <h1 style={{color:'#2E424D'}}>Sign in to your account</h1>
                <p className={classes.wrong} id='wrong'>{wrong}</p>
                {/* <p className={classes.wrong} id='wrong2'></p> */}

                <input type="email" className={classes.input} name="email" placeholder="Email" ref={emailInputRef} required /><br/>
                {/* <input type="password" className={classes.input} name="password" placeholder="Password" ref={passwdInputRef} required /><br/> */}
                <Box width="small" direction="row" margin="large" align="center" round="small" border className={classes.box} style={{'position':'relative','margin':'auto',marginTop:'-20px','width':'75%','height':'10%','borderRadius':'10px',overflow:'hidden'}}>
                    <TextInput placeholder="Password" plain type={reveal ? 'text' : 'password'} value={value} onChange={(event) => setValue(event.target.value)} style={{'backgroundColor':'white','opacity':'0.5','marginLeft':'25px'}} ref={passwdInputRef} required/>
                    <Button icon={reveal ? <View size="medium" /> : <Hide size="medium" />} onClick={() => setReveal(!reveal)}/>
                </Box>

                {/*<input type="submit" className={classes.submit} value="Sign In"/><br/>*/}
                <button className={classes.submit}>Sign In</button><br/>

                <Box sx={{ display: 'flex' }} style={{"position":'relative',"top":'-45px',"left":'70%',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                    <CircularProgress />
                </Box>

                <a onClick={handleClickOpen} style={{fontSize: '20px', position:"relative",top:'-25px',cursor:'pointer',color:'#2E424D'}}>Forgot password?</a><br/>
                <hr style={{position:"relative",top:'-25px',width:'75%',opacity:'0.3'}}/><br/>
                <Dialog open={open} onClose={handleClose}>
                        <DialogTitle style={{color:'#2E424D'}}>Forget your password</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Write your email address
                            </DialogContentText>
                            <p style={{color:'red', fontWeight:'900'}} id='error'></p>
                            <form ref={form}>
                                <TextField autoFocus inputRef={recEmail} margin="dense" name="email" label="Email" type="text" fullWidth variant="standard"/>
                                <input type="hidden" name="pass" value={pass}/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={sendEmail}>Send</Button>
                        </DialogActions>
                    </Dialog>


                <span style={{position:"relative",top:'-25px',color:'#2E424D'}}>Don't have an account?</span><br/>

                <button className={classes.btn} onClick={btnsignup} >Sign up!</button>
               
                {/*<button style={{backgroundColor: '#55324a' , borderRadius: '30px' , color: 'whitesmoke'}}>
                    <Link to='/Sign_Up'>Sign up!</Link>
                  </button>*/}
            </form>

            <img src="Images/LOGO.png" alt="about Project" className={classes.logo}/>

            <p className={classes.about}><h1 style={{marginTop:'100px'}}><b style={{color:'#2E424D'}}>If you want to get a job, hurry up and register on our website.
                <br/>These are the last 5 works on our site:</b></h1></p>
            <div className={classes.gallery}>
                  <img src="Images/LOGO.png" id="1"/>
                  <img src="Images/LOGO.png" id="2"/>
                  <img src="Images/LOGO.png" id="3"/>
                  <img src="Images/LOGO.png" id="4"/>
                  <img src="Images/LOGO.png" id="5"/>
            </div>

            <article>
                <p className={classes.about}><h1><b style={{color:'#2E424D'}}>ABOUT US</b></h1></p>
                
                <img src="Images/aboutUs1.png" alt="setting down" className={classes.ourfirstgoal}/>
                    <span className={classes.ourfirstgoal}>Here you can relax..we are the ones who will look for a job for you</span>

                <img src="Images/aboutUs2.png" alt="setting down" className={classes.oursecondgoal}/>
                    <span className={classes.oursecondgoal}>Now you can do what you like</span>

                <img src="Images/aboutUs3.png" alt="setting down" className={classes.ourthirdgoal}/>
                    <span className={classes.ourthirdgoal}>Whether you are in a team or an individual business</span>

                <img src="Images/aboutUs4.png" alt="setting down" className={classes.ourfourthgoal}/>
                    <span className={classes.ourfourthgoal}>Here you can find people to help you with your work</span>

{/*
                <div id="searchJobBox">
                    <img src="Images/newJob.jpg" alt="searching for a job"/>
                    <div id="searchJob">
                        <p className="searchNewJob">New jobs available</p>
                        <svg width="600" height="300" >
                            <circle cx="50" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="22" y="275">SVG</text>

                            <circle cx="150" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="122" y="275">SVG</text>

                            <circle cx="250" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="222" y="275">SVG</text>

                            <circle cx="350" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="322" y="275">SVG</text>

                            <circle cx="450" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="422" y="275">SVG</text>

                            <circle cx="550" cy="200" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="522" y="275">SVG</text>
                        </svg>

                        <p className="searchType">Types of business available</p>
                        <svg width="600" height="200" style={{position: 'absolute' , top: '400px' , left: '0'}}>
                            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="22" y="125">SVG</text>

                            <circle cx="150" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="122" y="125">SVG</text>

                            <circle cx="250" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="222" y="125">SVG</text>

                            <circle cx="350" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="322" y="125">SVG</text>

                            <circle cx="450" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="422" y="125">SVG</text>

                            <circle cx="550" cy="50" r="40" stroke="black" stroke-width="4" fill="white"/>
                            <text fill="#ffffff" font-size="15" font-family="Verdana" x="522" y="125">SVG</text>
                        </svg>

                    </div>
                </div>
*/} 
            </article>

            <Footer style={{'position':'absolute','top':'5000px'}}/>

            
        </div>
        );
}

export default My_Project;