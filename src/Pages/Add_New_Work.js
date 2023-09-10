import React from 'react';
import {useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { initializeApp , getApps } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

// import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

import { Box, RangeInput } from 'grommet';

import MainNavigation from '../Components/Navigation/MainNavigation';
import classes from "./Add_New_Work.module.css";
import Footer from '../Components/Footer/Footer';
import SpeedDialButton from '../Components/SpeedDialButton'

function Add_New_Work(){
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
    const [image , setImage] = useState('');


    const history =useHistory();

    var flag =false;
    var flag2 =false;

    const titleInputRef = useRef();
    // const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    const jobInputRef1 = useRef();
    const jobInputRef2 = useRef();
    const jobInputRef3 = useRef();
    const jobInputRef4 = useRef();
    const jobInputRef5 = useRef();
    const jobInputRef6 = useRef();

    const priceInputRef = useRef();
    
    function submitHandler(event){
        event.preventDefault();
        document.getElementById("titleExist").innerHTML=""
        flag=false;
        flag2=false;

        const enteredTitle=titleInputRef.current.value;
        // const enteredImage=imageInputRef.current.value;
        const enteredaddress=addressInputRef.current.value;
        const entereddescription=descriptionInputRef.current.value;
        const enteredpricedetails=priceInputRef.current.value;

        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
            {return response.json();}
        ).
        then(async data => {

            const keyAll =Object.keys(data);
            
            for ( const key in keyAll ){
                if(data[keyAll[key]].title===enteredTitle){
                    flag=true;
                }
            }

            if(flag){
                document.getElementById("titleExist").innerHTML="This title is already exist"
            }
            else if(checked===''){
                document.getElementById("titleExist").innerHTML="Please choose one or more of the governorates"
            }
            else if(document.getElementById('done').style.visibility==='hidden'){
                document.getElementById("titleExist").innerHTML="Please choose a photo to your work"
            }
            else if(jobInputRef5.current.checked === true && jobInputRef6.current.value === ''){
                document.getElementById("titleExist").innerHTML="Please type the type of work you want to add"
            }
            else{
                let enteredjob;
                if(jobInputRef1.current.checked === true)
                    enteredjob=jobInputRef1.current.value;
    
                else if(jobInputRef2.current.checked === true)
                    enteredjob=jobInputRef2.current.value;
    
                else if(jobInputRef3.current.checked === true)
                    enteredjob=jobInputRef3.current.value;
    
                else if(jobInputRef4.current.checked === true)
                    enteredjob=jobInputRef4.current.value;

                else if(jobInputRef5.current.checked === true)
                    enteredjob=jobInputRef5.current.value;

                    const storageRef = ref(storage , enteredTitle);
                    // console.log(image)
                    document.getElementById('progress').style.visibility = 'visible'
                    await uploadBytes(storageRef, image);
                    document.getElementById('progress').style.visibility = 'hidden'
                    // console.log(enteredpricedetails)
                    
    
                const workData ={
                    title: enteredTitle,
                    // image : enteredImage,
                    address : enteredaddress,
                    description : entereddescription,
                    job : enteredjob,
                    fav : "",
                    author : localStorage.getItem('email'),
                    rating : 0,
                    cntRating : 0,
                    ratingDetails : '',
                    govChecked : checked,
                    price : value,
                    priceDetails : enteredpricedetails,
                    other : jobInputRef6.current.value
                };
                // console.log(workData)
                
                fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json',
                    {
                        method : 'POST',
                        body : JSON.stringify(workData),
                        headers : { 'Content-Type' : 'application/json' }
                    }
                ).then( () => { history.replace('/Main') } );
            }
        });

        const storageRef = ref(storage , enteredTitle);
            uploadBytes(storageRef, image);
            //  console.log('Done!')

    }

    async function onFileChange(e){
        await setImage(e.target.files[0])
        document.getElementById('done').style.visibility='visible';
        // const enteredpricedetails=priceInputRef.current.value;
        // console.log(priceInputRef.current.value)
        // console.log('yes')
       }

    // governorate
    const [checked, setChecked] = useState('');
    var gov = '';var gov1='';var gov2='';
   
    const handleChange = (event) => {
        if(event.target.checked===true){
            // gov += event.target.id;
            // gov += '+';
            setChecked(checked+event.target.id+'+');
            
        }
        else{
            gov = checked;
            gov1 = gov.substring(0,gov.indexOf(event.target.id))
            var num=0;
            for(var ss in event.target.id){
                num++;
            }
            gov2 = gov.substring(gov.indexOf(event.target.id)+num+1)
            setChecked(gov1+gov2)
            // console.log(gov1)
            // console.log(gov2)
            // console.log(gov1+gov2)
        }
    };

    //range
    const [value, setValue] = React.useState(1000);
    const onChange = (event) => setValue(event.target.value);


    //add other
    function addOther(){
        document.getElementById('other').style.visibility = 'visible'
    }

    return(
        <div>
        {/* <MainNavigation/> */}
        <form autoComplete="on" method="post" className={classes.form} onSubmit={submitHandler}>

            <h1 className={classes.h1}>Add New Work</h1>
            {/* <h1 className={classes.h1}>{checked}</h1> */}

            <p className={classes.titleExist} id='titleExist'></p>

            <div className={classes.title}>
                <label htmlFor='title'>Work Title : </label>
                <input type="text" name="title" placeholder="Title" maxLength="256" ref={titleInputRef} required autoFocus autoComplete="on"/>
                
            </div>
            {/* <div className={classes.image}>
                <label htmlFor='image'>Work Image : </label>
                <input type="url" name="title" placeholder="URL Image" ref={imageInputRef} required autocomplete="on"/>
            </div> */}

            <div className={classes.address}>
                <label htmlFor='address'>Work Address : </label>
                <input type="text" name="address" placeholder="Address (Optional)" ref={addressInputRef} autoComplete="on"/>
            </div>

            <div className={classes.description}>
                <label htmlFor='description'>Work Description : </label>
                <textarea placeholder="Description" rows='3' ref={descriptionInputRef}  required></textarea>
            </div>

            <label htmlFor="file-upload"  className={classes.image}>
                    <input id="file-upload" type="file" name="img"
                     onChange={onFileChange} 
                     />
                    Upload a photo of your job
            </label>
            <img src='Images/done.png' style={{"position":'relative',"left":'30px',top:'-10px',"overflow":'hidden',"visibility":'hidden','width':'35px'}} id='done'/>

                <fieldset className={classes.cv}>
                    <legend><b>Choose the type of job you are adding</b></legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <input type="radio" name="job" value="Tailor" required ref={jobInputRef1}/>
                        <label>Tailor</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="job" value="Painter" ref={jobInputRef2}/>
                        <label>Painter</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="job" value="TaxiDriver" ref={jobInputRef3}/>
                        <label>Taxi driver</label>&nbsp;&nbsp;&nbsp;
                    </div>


                    <div>
                        <input type="radio" name="job" value="Carpenter" ref={jobInputRef4}/>
                        <label>Carpenter</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <br/><br/>
                    <div>
                        <input type="radio" name="job" value="Other" ref={jobInputRef5}/>
                        <label>Other</label>&nbsp;&nbsp;&nbsp;
                        <input type="text" name="other" placeholder="Type of work you want to add" maxLength="50" ref={jobInputRef6} autoComplete="on" style={{borderRadius:'5px',width:'200px'}} id='other'/>
                    </div>

                </fieldset>

                <fieldset className={classes.gov}>
                    <legend><b>Choose the type of job you are adding</b></legend>
                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Damascus' />  {/* checked={checked}  */}
                    <label>Damascus</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Aleppo'/>
                    <label>Aleppo</label>&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Daraa'/>  {/* checked={checked}  */}
                    <label>Daraa</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Deir ez-Zor'/>  {/* checked={checked}  */}
                    <label>Deir ez-Zor</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Hama'/>  {/* checked={checked}  */}
                    <label>Hama</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Hasaka'/>  {/* checked={checked}  */}
                    <label>Hasaka</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Homs'/>  {/* checked={checked}  */}
                    <label>Homs</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Idlib'/>  {/* checked={checked}  */}
                    <label>Idlib</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Latakia'/>  {/* checked={checked}  */}
                    <label>Latakia</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='As-Suwayda'/>  {/* checked={checked}  */}
                    <label>As-Suwayda</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Tartus'/>  {/* checked={checked}  */}
                    <label>Tartus</label>&nbsp;&nbsp;&nbsp;&nbsp;

                    <Checkbox  onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} id='Raqqa'/>  {/* checked={checked}  */}
                    <label>Raqqa</label>&nbsp;&nbsp;&nbsp;&nbsp;

                </fieldset>

                <Box align="center" pad="large" style={{'position':'relative'}}>
                    <span>Determine the amount of money which corresponding to your work:</span>
                    <RangeInput value={value} onChange={onChange} max='100000'step='500'/>
                    <span>{value} S.P.</span>
                </Box>

                <input type="text" name="price" placeholder="More details about the service provided with this specific money" maxlength="256" className={classes.priceDetails} ref={priceInputRef} required autofocus autocomplete="on"/>

                 {/* <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch'},}} noValidate autoComplete="on"className={classes.priceDetails}>
                    <TextField id="filled-basic" label="More details about the service provided with this specific money" variant="filled" maxLength="256"  ref={priceInputRef} required autoFocus autoComplete="on"/>
                </Box> */}
            

                <button className={classes.btn}>Add Work</button>

                <Box sx={{ display: 'flex' }} style={{"position":'relative',"top":'-75px',"left":'65%',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                    <CircularProgress />
                </Box>

        </form>
        <SpeedDialButton/>
        <Footer/>
        </div>

    );
}
export default Add_New_Work;