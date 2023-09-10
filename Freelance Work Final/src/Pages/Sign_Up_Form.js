import {useRef} from 'react';
import React from 'react';
import { useState } from 'react';

import { initializeApp , getApps } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { sendForm } from 'emailjs-com';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Checkbox from '@mui/material/Checkbox';

import { Hide, View } from 'grommet-icons';
import { TextInput } from 'grommet';

import classes from "./Sign_Up_Form.module.css"

function Sign_Up_Form(props){
    
    // const signUpData = new Object();
    // console.log(signUpData)
    const firebaseConfig = {

        apiKey: "AIzaSyCOhPjTsO-SvutOhD-7apWXM0B3QmqofSo",
      
        authDomain: "freelance-work-fde92.firebaseapp.com",
      
        databaseURL: "https://freelance-work-fde92-default-rtdb.firebaseio.com",
      
        projectId: "freelance-work-fde92",
      
        storageBucket: "freelance-work-fde92.appspot.com",
      
        messagingSenderId: "1075773849029",
      
        appId: "1:1075773849029:web:0e71b107fca8f396eb5fac"
      
      };

      const [dialog1 , setDialog1] = useState('')
      const [dialog2 , setDialog2] = useState('')
      const [dialog3 , setDialog3] = useState(0)
      const [signUpData , setSignUpData] = useState('')
      var block=0;

      if(getApps().length<1){
        const app = initializeApp(firebaseConfig);}
        var storage = getStorage();
      const [image , setImage] = useState('');

    const fnameInputRef = useRef();
    const lnameInputRef = useRef();
    const emailInputRef = useRef();
    const passwdInputRef = useRef();
    const confirmPasswdInputRef = useRef();

    const birthDayInputRef = useRef();
    const birthMonthInputRef = useRef();
    const birthYearInputRef = useRef();

    const genderInputRef1 = useRef();
    const genderInputRef2 = useRef();

    const numberInputRef = useRef();

    var flag =1;

    async function submitHandler(event){
        event.preventDefault();
        block=0;

        const enteredfname=fnameInputRef.current.value;
        const enteredlname=lnameInputRef.current.value;
        const enteredemail=emailInputRef.current.value;
        const enterednumber=numberInputRef.current.value;
        const enteredpasswd=passwdInputRef.current.value;
        const enteredconfirmPasswd=confirmPasswdInputRef.current.value;

        const enteredbirthDay=birthDayInputRef.current.value;
        const enteredbirthMonth=birthMonthInputRef.current.value;
        const enteredbirthYear=birthYearInputRef.current.value;

        const CntFavorites=0;
        const comnt = '';

        flag=1;

        let enteredgender;
        if( genderInputRef1.current.checked===true )
            enteredgender=genderInputRef1.current.value;

        else if( genderInputRef2.current.checked===true )
            enteredgender=genderInputRef2.current.value;

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
                        // console.log(block);
                    }
                }
            
            });
            
            fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
            ).
            then(response =>
            {return response.json();}
            ).
            then(async data => {
            const keyAll =Object.keys(data);
                
            for ( const key in keyAll ){
                if (data[keyAll[key]].email===enteredemail){
                    document.getElementById('didntMatch').innerHTML="This email is already registed";
                    flag=0;break;
                }
            }
            if(block){
                document.getElementById('didntMatch').innerHTML="We apologize that this account has been locked due to violations you have committed";
            }
            else if(!checked){
                document.getElementById('didntMatch').innerHTML="If you want to register on the site, you must agree to our policy";
            }
            else if(flag===1){
                if(enteredpasswd===enteredconfirmPasswd){
                     setSignUpData({
                        fname: enteredfname,
                        lname : enteredlname,

                        email : enteredemail,
                        passwd : enteredpasswd,

                        number: enterednumber,

                        birthDay : enteredbirthDay,
                        birthMonth : enteredbirthMonth,
                        birthYear : enteredbirthYear,

                        gender : enteredgender,

                        countFavorites : CntFavorites,
                        
                        comments : comnt,

                        money : 50000,
                        bill : ''
                });
                    // signUpData.fname = enteredfname;
                    // console.log(signUpData)

                // window.name=enteredemail;
                // localStorage.setItem('email',enteredemail);
                // localStorage.setItem('name' , enteredfname + ' ' + enteredlname)
                // props.addMember(signUpData);
                setDialog1(enteredemail);
                setDialog2(enteredfname + ' ' + enteredlname)
                setDialog3(Math.round(Math.random()*100000))
                handleClickOpen()
                // console.log("Add Member")
                const storageRef = ref(storage , localStorage.getItem('email'));

                document.getElementById('progress').style.visibility = 'visible'
                await uploadBytes(storageRef, image);
                document.getElementById('progress').style.visibility = 'hidden'
                
                }
                else{
                    document.getElementById('didntMatch').innerHTML="Those passwords didn't match. Please try again";
                }
            }
        })
            
    }

    function onFileChange(e){
        setImage(e.target.files[0])
        document.getElementById('done').style.visibility = 'visible'
      }

      //Dialog
    const [open, setOpen] = useState(false);
      
    const handleClickOpen = () => {
      setOpen(true);
    
          sendForm('service_1o6nwvw', 'template_zml5hw9', form.current, 'ohOS6QlC-qLfiY2AG')
          .then((result) => {
            //   console.log(result.text);
              
          }, (error) => {
            //   console.log(error.text);
          });

                // {console.log(dialog);
                //     console.log(localStorage.getItem('name'));
                //     console.log(localStorage.getItem('email'));
                //     console.log(props.title);
                //     console.log(name);
                //     }
                // console.log(form)
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const form = useRef();
    const verify = useRef();
    const sendEmail = (e) => {
        if(parseInt(verify.current.value)===dialog3)
        {
            // console.log('yes');
            document.getElementById('invNum').style.visibility='hidden'
            document.getElementById('trueNum').style.visibility='visible'
            window.name=dialog1;
            localStorage.setItem('email',dialog1);
            localStorage.setItem('name' , dialog2)
            props.addMember(signUpData);
            // console.log(signUpData)
        }
        else{
            // console.log('no');
            document.getElementById('trueNum').style.visibility='hidden'
            document.getElementById('invNum').style.visibility='visible'
            
            // console.log(parseInt(verify.current.value))
            // console.log(parseInt(dialog3))
        }
          
      };

// console.log(signUpData)

 // agree
 const [checked, setChecked] = useState(false);
 var gov = '';var gov1='';var gov2='';

 const handleChange = (event) => {
     if(event.target.checked===true){
        setChecked(true);
     }
     else{
         setChecked(false)
     }
    //  console.log(checked)
 };
//  console.log(checked)
    return(
        <div>

            <form autocomplete="on" method="post" className={classes.form} onSubmit={submitHandler}>

            <img src="Images/LOGO.png" alt="project pic" className={classes.formImg}/>

                <input type="hidden" id="custId" name="custId" value="3487"/>

                <h1>Create a new Account</h1>

                <div className={classes.formWrapper}>
                    <p className={classes.didntMatch} id='didntMatch'></p>

                    <input type="text" name="fname" placeholder="First name" maxlength="15" className={classes.fname} ref={fnameInputRef} required autofocus autocomplete="on"/>
                    <input type="text" name="lname" placeholder="Last name" maxlength="15" className={classes.lname} ref={lnameInputRef} required autocomplete="on"/>
                    <br/>

                    <input type="email" name="email" placeholder="Email" className={classes.email} ref={emailInputRef} required autocomplete="on"/><br/>
                    <input type="number" name="number" placeholder="Phone number (optional)" className={classes.email} ref={numberInputRef} autocomplete="on"/><br/>

                    <input type="password" name="password" placeholder="Password" className={classes.passwd} ref={passwdInputRef} required/>
                    <input type="password" name="confirm password" placeholder="Confirm password" className={classes.confirmPasswd} ref={confirmPasswdInputRef} required/>

                    <label for="file-upload"  className={classes.image}>
                        <input id="file-upload" type="file" name="img" onChange={onFileChange}/>
                        Upload your photo
                    </label>
                    <img src='Images/done.png' style={{"position":'relative'/*,"top":'295px',*/,"left":'20px',"overflow":'hidden',"visibility":'hidden','width':'35px'}} id='done'/>

                    {/* <Box sx={{ display: 'flex' }} style={{"position":'absolute',"top":'295px',"left":'455px',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                    <CircularProgress />
                    </Box> */}

                    {/* <img src='Images/done.png' style={{"position":'absolute',"top":'295px',"left":'455px',"overflow":'hidden',"visibility":'hidden','width':'35px'}} id='done'/> */}

                    <hr className={classes.hr1}/>

                    <div className={classes.fieldsetWrapper}>
                        <fieldset className={classes.birth}>
                            <legend><b>Birthday</b></legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <select name="birthday_Day" ref={birthDayInputRef}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select> &nbsp;&nbsp;&nbsp;


                                <select name="birthday_month" ref={birthMonthInputRef}>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>&nbsp;&nbsp;&nbsp;

                            <select name="birthday_year"  ref={birthYearInputRef}>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000" selected>2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            </select>
                        </fieldset>

                        {/*<hr/>*/}

                        <fieldset className={classes.gender}>
                            <legend><b>Gender</b></legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            <input type="radio" name="gender" value="male" required ref={genderInputRef1}/>
                            <label>Male</label>&nbsp;&nbsp;&nbsp;

                            <input type="radio" name="gender" value="female" ref={genderInputRef2}/>
                            <label>Female</label>
                        </fieldset>
                    </div>


                    {/* <input type="image" src="Images/Submit.png" alt="Submit" className={classes.submit}/> */}

                    
                </div>

                <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='agree' style={{position:'relative',margin:'auto'}}/>
                <label>I agree to the terms of the site by adhering to the specified rules and dealing with social decency</label>

                <Box sx={{ display: 'flex' }} style={{"position":'relative','top':'-45px',"left":'820px',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                    <CircularProgress />
                </Box>

                <input type="image" src="Images/Submit.png" alt="Submit" className={classes.submit}/>

                
                <div>
                    
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Verification</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                We have sent a code to your gmail, please write this number to confirm it
                            </DialogContentText>
                            <span id='invNum' style={{color:'red',visibility:'hidden'}}>invalid number</span><br/>
                            <span id='trueNum' style={{color:'green',visibility:'hidden'}}>Done, please wait a second..</span>
                            <form ref={form}>
                                <TextField autoFocus margin="dense" label="Code" type="text" fullWidth variant="standard" inputRef={verify}/>
                                <input type="hidden" name="to" value={dialog1}/>
                                <input type="hidden" name="name" value={dialog2}/>
                                <input type="hidden" name="message" value={dialog3}/>
                                {/* <input type="hidden" name="from" value='freelancework@gmail.com'/> */}
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={sendEmail}>verify</Button>
                        </DialogActions>
                        </Dialog>
                    </div>
            </form>
            
        </div>
    );
}
export default Sign_Up_Form;