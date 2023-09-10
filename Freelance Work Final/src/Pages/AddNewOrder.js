import React from 'react';
import {useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, RangeInput } from 'grommet';

import { initializeApp , getApps } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import Checkbox from '@mui/material/Checkbox';

import MainNavigation from '../Components/Navigation/MainNavigation';
import classes from "./AddNewOrder.Module.css";
import Footer from '../Components/Footer/Footer';
import SpeedDialButton from '../Components/SpeedDialButton'


function Add_New_Order(){

    
    // const firebaseConfig = {

    //     apiKey: "AIzaSyCOhPjTsO-SvutOhD-7apWXM0B3QmqofSo",
      
    //     authDomain: "freelance-work-fde92.firebaseapp.com",
      
    //     databaseURL: "https://freelance-work-fde92-default-rtdb.firebaseio.com",
      
    //     projectId: "freelance-work-fde92",
      
    //     storageBucket: "freelance-work-fde92.appspot.com",
      
    //     messagingSenderId: "1075773849029",
      
    //     appId: "1:1075773849029:web:0e71b107fca8f396eb5fac"
      
    //   };

    // if(getApps().length<1){
    //     const app = initializeApp(firebaseConfig);}
    // var storage = getStorage();
    // const [image , setImage] = useState('');


    const history =useHistory();

    var flag =false;
    var flag2 =false;

    const titleInputRef = useRef();
    // const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    const govInputRef1 = useRef();
    const govInputRef2 = useRef();
    const govInputRef3 = useRef();
    const govInputRef4 = useRef();
    const govInputRef5 = useRef();
    const govInputRef6 = useRef();
    const govInputRef7 = useRef();
    const govInputRef8 = useRef();
    const govInputRef9 = useRef();
    const govInputRef10 = useRef();
    const govInputRef11 = useRef();
    const govInputRef12 = useRef();
    
    function submitHandler(event){
        event.preventDefault();

        flag=false;
        flag2=false;

        const enteredTitle=titleInputRef.current.value;
        // const enteredImage=imageInputRef.current.value;
        const enteredaddress=addressInputRef.current.value;
        const entereddescription=descriptionInputRef.current.value;

        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json'
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
            else{
                let enteredGov;
                if(govInputRef1.current.checked === true)
                    enteredGov=govInputRef1.current.value;
    
                else if(govInputRef2.current.checked === true)
                    enteredGov=govInputRef2.current.value;
    
                else if(govInputRef3.current.checked === true)
                    enteredGov=govInputRef3.current.value;
    
                else if(govInputRef4.current.checked === true)
                    enteredGov=govInputRef4.current.value;

                else if(govInputRef5.current.checked === true)
                    enteredGov=govInputRef5.current.value;

                else if(govInputRef6.current.checked === true)
                    enteredGov=govInputRef6.current.value;

                else if(govInputRef7.current.checked === true)
                    enteredGov=govInputRef7.current.value;

                else if(govInputRef8.current.checked === true)
                    enteredGov=govInputRef8.current.value;

                else if(govInputRef9.current.checked === true)
                    enteredGov=govInputRef10.current.value;

                else if(govInputRef10.current.checked === true)
                    enteredGov=govInputRef10.current.value;

                else if(govInputRef11.current.checked === true)
                    enteredGov=govInputRef11.current.value;

                else if(govInputRef12.current.checked === true)
                    enteredGov=govInputRef12.current.value;

                    // const storageRef = ref(storage , enteredTitle);
                    
                    // await uploadBytes(storageRef, image)
    
    

                const workData ={
                    title: enteredTitle,
                    // image : enteredImage,
                    address : enteredaddress,
                    description : entereddescription,
                    gov : enteredGov,
                    author : localStorage.getItem('email'),
                    countTailor : value1,
                    countPainter : value2,
                    countTd : value3,
                    countCarpenter : value4
                };
                fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json',
                    {
                        method : 'POST',
                        body : JSON.stringify(workData),
                        headers : { 'Content-Type' : 'application/json' }
                    }
                ).then( () => { history.replace('/All-Orders') } );
            }
        });

        // const storageRef = ref(storage , enteredTitle);
        //     uploadBytes(storageRef, image);
        //      console.log('Done!')

    }

    // async function onFileChange(e){
    //     await setImage(e.target.files[0])
    //    }

    // // governorate
    // const [checked, setChecked] = useState('');
    // var gov = '';var gov1='';var gov2='';

    // const handleChange = (event) => {
    //     if(event.target.checked===true){
    //         // gov += event.target.id;
    //         // gov += '+';
    //         setChecked(checked+event.target.id+'+');
    //     }
    //     else{
    //         gov = checked;
    //         gov1 = gov.substring(0,gov.indexOf(event.target.id))
    //         var num=0;
    //         for(var ss in event.target.id){
    //             num++;
    //         }
    //         gov2 = gov.substring(gov.indexOf(event.target.id)+num+1)
    //         setChecked(gov1+gov2)
    //         // console.log(gov1)
    //         // console.log(gov2)
    //         // console.log(gov1+gov2)
    //     }
    // };
    const [value1, setValue1] = React.useState(0);
    const [worker1, setWorker1] = React.useState('Worker');
    const onChange1 = (event) => {setValue1(event.target.value); if(event.target.value>=2){setWorker1('Workers')}else{setWorker1('Worker')}}

    const [value2, setValue2] = React.useState(0);
    const [worker2, setWorker2] = React.useState('Worker');
    const onChange2 = (event) => {setValue2(event.target.value); if(event.target.value>=2){setWorker2('Workers')}else{setWorker2('Worker')}}

    const [value3, setValue3] = React.useState(0);
    const [worker3, setWorker3] = React.useState('Worker');
    const onChange3 = (event) => {setValue3(event.target.value); if(event.target.value>=2){setWorker3('Workers')}else{setWorker3('Worker')}}

    const [value4, setValue4] = React.useState(0);
    const [worker4, setWorker4] = React.useState('Worker');
    const onChange4 = (event) => {setValue4(event.target.value); if(event.target.value>=2){setWorker4('Workers')}else{setWorker4('Worker')}}

    return(
        <div>
        <MainNavigation/>
        <form autocomplete="on" method="post" className={classes.form} onSubmit={submitHandler}>

            <h1 className={classes.h1}>Add New Order</h1>
            {/* <h1 className={classes.h1}>{checked}</h1> */}

            <p className={classes.titleExist} id='titleExist'></p>

            <div className={classes.title}>
                <label htmlFor='title'>Order Title : </label>
                <input type="text" name="title" placeholder="Title" maxlength="256" ref={titleInputRef} required autofocus autocomplete="on"/>
            </div>
            
            {/* <div className={classes.image}>
                <label htmlFor='image'>Work Image : </label>
                <input type="url" name="title" placeholder="URL Image" ref={imageInputRef} required autocomplete="on"/>
            </div> */}

            <div className={classes.address}>
                <label htmlFor='address'>Order Address : </label>
                <input type="text" name="address" placeholder="Address (Optional)" ref={addressInputRef} autocomplete="on"/>
            </div>

            <div className={classes.description}>
                <label htmlFor='description'>Work Description : </label>
                <textarea placeholder="Description" rows='3' ref={descriptionInputRef}  required></textarea>
            </div>

            {/* <label for="file-upload"  className={classes.image}>
                    <input id="file-upload" type="file" name="img"
                     onChange={onFileChange} 
                    />
                    Upload a photo of your job
            </label> */}

            
                <fieldset className={classes.cv}>
                    <legend><b>Choose the governorate where you need workers</b></legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <input type="radio" name="gov" value="damascus" required ref={govInputRef1}/>
                        <label>Damascus</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="aleppo" ref={govInputRef2}/>
                        <label>Aleppo</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="daraa" ref={govInputRef3}/>
                        <label>Daraa</label>&nbsp;&nbsp;&nbsp;
                    </div>


                    <div>
                        <input type="radio" name="gov" value="deir" ref={govInputRef4}/>
                        <label>Deir ez-Zor</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="hama" ref={govInputRef5}/>
                        <label>Hama</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="hasaka" ref={govInputRef6}/>
                        <label>Hasaka</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="homs" ref={govInputRef7}/>
                        <label>Homs</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="idlib" ref={govInputRef8}/>
                        <label>Idlib</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="latakia" ref={govInputRef9}/>
                        <label>Latakia</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="suwayda" ref={govInputRef10}/>
                        <label>As-Suwayda</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="tartus" ref={govInputRef11}/>
                        <label>Tartus</label>&nbsp;&nbsp;&nbsp;
                    </div>

                    <div>
                        <input type="radio" name="gov" value="raqqa" ref={govInputRef12}/>
                        <label>Raqqa</label>&nbsp;&nbsp;&nbsp;
                    </div>

                </fieldset>

                <fieldset className={classes.cv2}>
                    <legend><b>Choose the number of workers required from each category</b></legend>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <label>Tailor</label>
                        <Box align="center" pad="large" style={{'position':'relative',"top":'0px','display':'inline-flex','width':'70%','marginTop':'-20px'}}>
                        {/* <span>Determine the amount of money which corresponding to your work:</span> */}
                        <RangeInput value={value1} className={classes.box} onChange={onChange1} max='100'/>
                        </Box>
                        <span style={{'position':'relative','top':'-10px'}}>{value1} {worker1}</span>
                    </div>

                    <div>
                        <label>Painter</label>
                        <Box align="center" pad="large" style={{'position':'relative',"top":'0px','left':'-3px','display':'inline-flex','width':'70%','marginTop':'-45px'}}>
                        {/* <span>Determine the amount of money which corresponding to your work:</span> */}
                        <RangeInput value={value2} className={classes.box} onChange={onChange2} max='100'/>
                        </Box>
                        <span style={{'position':'relative',"left":'-5px','top':'-10px'}}>{value2} {worker2}</span>
                    </div>

                    <div>
                        <label style={{'position':'relative'}}>Taxi driver</label>
                        <Box align="center" pad="large" style={{'position':'relative','display':'inline-flex','width':'70%','marginTop':'-45px',marginLeft:'-25px'}}>
                        {/* <span>Determine the amount of money which corresponding to your work:</span> */}
                        <RangeInput value={value3} className={classes.box} onChange={onChange3} max='100'/>
                        </Box>
                        <span style={{'position':'relative'}}>{value3} {worker3}</span>
                    </div>

                    <div>
                        <label style={{'position':'relative'}}>Carpenter</label>
                        <Box align="center" pad="large" style={{'position':'relative','display':'inline-flex','width':'70%','marginTop':'-45px',marginLeft:'-25px'}}>
                        {/* <span>Determine the amount of money which corresponding to your work:</span> */}
                        <RangeInput value={value4} className={classes.box} onChange={onChange4} max='100'/>
                        </Box>
                        <span style={{'position':'relative'}}>{value4} {worker4}</span>
                    </div>
                   
                </fieldset>

                <button className={classes.btn}>Add Order</button>

        </form>
        <SpeedDialButton/>
        <Footer/>

        {/* <p style={{'position':'absolute','top':'1025px','visibility':'hidden'}}>.</p> */}
        </div>

    );
}
export default Add_New_Order;