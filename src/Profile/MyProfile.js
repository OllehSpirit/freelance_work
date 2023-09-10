import {useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


import MainNavigation from '../Components/Navigation/MainNavigation'
import classes from './MyProfile.Module.css'

import { initializeApp, getApps } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MyProfile(){
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
          const [image , setImage] = useState('');
          const [Url , setUrl] = useState("Images/Profile.png");

    const history =useHistory();

    const newPasswdInputRef = useRef();
    const confirmInputRef = useRef();
    const oldPasswdInputRef = useRef();

    const numberInputRef = useRef();
    


useEffect(()=>{
// loading the profile data
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
    ).then(response =>
        {return response.json();}
    ).then(data => {
        const keyAll =Object.keys(data);
        for ( const key in keyAll ){
            
            if(data[keyAll[key]].email===localStorage.getItem('email')){
                document.getElementById('fname').innerHTML = data[keyAll[key]].fname;
                document.getElementById('lname').innerHTML = data[keyAll[key]].lname;
                document.getElementById('email').innerHTML = data[keyAll[key]].email;
                if(data[keyAll[key]].number!=''){
                    document.getElementById('number').innerHTML = data[keyAll[key]].number;
                }
                else{
                    document.getElementById('number').innerHTML = 'None yet';
                }

                document.getElementById('birth').innerHTML = data[keyAll[key]].birthDay + ' / ' + data[keyAll[key]].birthMonth + ' / ' +  data[keyAll[key]].birthYear;
                document.getElementById('gender').innerHTML = data[keyAll[key]].gender;

                var pass = '';
                for ( const ss in  data[keyAll[key]].passwd){
                    pass += '*'
                }
                document.getElementById('passwd').innerHTML=pass;

                var name = data[keyAll[key]].fname + ' ' + data[keyAll[key]].lname;
                document.getElementById('name').innerHTML = name;

                if(data[keyAll[key]].comments===''){
                    document.getElementById('noComments').style.visibility = "vsible";
                    // console.log("yes")
                }
                else{
                    document.getElementById('noComments').style.visibility = "hidden";
                    var comments = '';var commentEmail ='';var commentName = '';var commentDate = '';var comment = '';var finalComment = '';

                    var today = new Date();
                    // const date1 = new Date("2020-12-10");
                    // var a=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    // const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
                    const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                    const day = 1000*60*60*24;
                    // console.log((date2utc - date1utc)/day)

                    data[keyAll[key]].comments = data[keyAll[key]].comments.substring(1); //delete first character --> first +
                    while(data[keyAll[key]].comments!=''){
                        // console.log(data[keyAll[key]].comments)
                        if(data[keyAll[key]].comments.includes('+')){
                            commentEmail=data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowtrue')+13,data[keyAll[key]].comments.indexOf('%emailnowfalse'));
                            // console.log(commentEmail);
                            comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowfalse')+14,data[keyAll[key]].comments.indexOf('+')); //get first comment (name & comment)
                            commentName = comments.substring(0,comments.indexOf('=')); //get name of commetnt
                            commentDate = comments.substring(comments.indexOf('%ymdnowtrue') + 11,comments.indexOf('%ymdnowfalse'));
                            comment = comments.substring(comments.indexOf('=') + 1,comments.indexOf('%ymdnowtrue')); //get comment
                            
                            const dateOld = new Date(commentDate);
                            const date1utc = Date.UTC(dateOld.getFullYear(), dateOld.getMonth(), dateOld.getDate());
                            const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                            const day = 1000*60*60*24;
                            const days = (date2utc - date1utc)/day;

                            // const storageRe = ref(storage , commentEmail);
                            // getDownloadURL(storageRe)
                            //    .then( (url) => {
                            // `url` is the download URL for 'images/stars.jpg'
                                        
                            // This can be downloaded directly:
                            // const xhr = new XMLHttpRequest();
                            // xhr.responseType = 'blob';
                            // xhr.onload = (event) => {
                            //     const blob = xhr.response;
                            // };
                            // xhr.open('GET', url);
                            // xhr.send();
                        
                            // Or inserted into an <img> element
                            // setUrl(url);
                            
                            // }).catch((error)=>{
                            //     if(error.code==='storage/object-not-found'){
                            //         // {console.log("can't found it")
                            //     setUrl("Images/Profile.png")}
                            // })
                            // console.log(Url)

                            finalComment +=`<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`
                                + `<img src='Images/Profile.png' alt="Profile" style="position:relative;left:-155px;top:5px;width:50px;height:50px"/>`+
                                `<span style="text-align:left;position:relative;left:-145px;top:-20px">` + `<b>` + commentName + `</b>`+ `<span style="position:relative;left:10px;font-size:12px">` + '(Posted ' + days + 'd ago)' + `</span>` +`</br>` 
                                + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
                                + `<p style="position:relative;left:200px;width:90%;height:auto;text-align:left">` + comment+ `</p>` + `</span>` + `</div>` + `<hr/>`;
                            data[keyAll[key]].comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('+') + 1);
                        }
                        else{
                            commentEmail=data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowtrue')+13,data[keyAll[key]].comments.indexOf('%emailnowfalse'));
                            comments = comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowfalse')+14); //get last comment
                            commentName = comments.substring(0,comments.indexOf('=')); //get name of commetnt
                            commentDate = comments.substring(comments.indexOf('%ymdnowtrue') + 11,comments.indexOf('%ymdnowfalse'));
                            comment = comments.substring(comments.indexOf('=') + 1,comments.indexOf('%ymdnowtrue')); //get comment

                            const dateOld = new Date(commentDate);
                            const date1utc = Date.UTC(dateOld.getFullYear(), dateOld.getMonth(), dateOld.getDate());
                            const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                            const day = 1000*60*60*24;
                            const days = (date2utc - date1utc)/day;


                            // const storageRe = ref(storage , commentEmail);
                            // getDownloadURL(storageRe)
                            //    .then( (url) => {
                                   
                            // `url` is the download URL for 'images/stars.jpg'
                                        
                            // This can be downloaded directly:
                            // const xhr = new XMLHttpRequest();
                            // xhr.responseType = 'blob';
                            // xhr.onload = (event) => {
                            //     const blob = xhr.response;
                            // };
                            // xhr.open('GET', url);
                            // xhr.send();
                            // console.log(url)
                        
                            // Or inserted into an <img> element
                            // setUrl(url);
                            
                            // }).catch((error)=>{
                            //     if(error.code==='storage/object-not-found'){
                            //         // {console.log("can't found it")
                            //         setUrl("Images/Profile.png")}
                            // })
                            // console.log(Url)

                            finalComment +=`<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`
                                + `<img src='Images/Profile.png' alt="Profile" style="position:relative;left:-155px;top:5px;width:50px;height:50px"/>`+
                                `<span style="text-align:left;position:relative;left:-145px;top:-20px">` + `<b>` + commentName + `</b>`+ `<span style="position:relative;left:10px;font-size:12px">` + '(Posted ' + days + 'd ago)' + `</span>` +`</br>` 
                                + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
                                + `<p style="position:relative;left:200px;width:90%;height:auto;text-align:left">` + comment+ `</p>` + `</span>` + `</div>` + `<hr/>`;
                            data[keyAll[key]].comments='';
                        }
                        document.getElementById('comments').innerHTML = finalComment;

    
                        // console.log(comments)
                        // console.log(commentName)
                        // console.log(comment)
                        // console.log(data[keyAll[key]].comments)
                    }
                }
            }
        }
})
        getDownloadURL(storageRef)
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
      
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            // const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
      
          // Or inserted into an <img> element
        //   const img = document.getElementById('myimg');
        //   img.setAttribute('src', url);
        //   console.log(url)
        setUrl(url)
        }).catch((error)=>{
            if(error.code==='storage/object-not-found')
                {}
        })
// console.log(Url)
    },[])
    
    // -----------edit your email--------------
    // function editEmail(){
    //     document.getElementById('email').style.visibility='hidden'
    //     document.getElementById('editEmail').style.visibility='hidden'
    //     document.getElementById('newEmail').style.visibility='visible'
    // }
    // function cancelNewEmail(){
    //     document.getElementById('email').style.visibility='visible'
    //     document.getElementById('editEmail').style.visibility='visible'
    //     document.getElementById('newEmail').style.visibility='hidden'
    // }
    // function patchEmail(){
    //     const enteredemail=emailInputRef.current.value;
    //     const enteredpasswd=passwdInputRef.current.value;
    //     console.log(window.name);
    //     fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
    //     ).
    //     then(response =>
    //         {return response.json();}
    //     ).
    //     then(data => {
    //         console.log("1");
    //         var keys;
    //         const keyAll =Object.keys(data);
    //         for ( const key in keyAll ){
                
    //             if(data[keyAll[key]].email===window.name){
                    
    //                 if(data[keyAll[key]].passwd===enteredpasswd){
    //                     console.log("2");
    //                     keys = keyAll[key];
    //                     console.log("3");
    //                     fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members2/${keys}.json`,
    //                             {
    //                             method : 'POST',
    //                             body : JSON.stringify({ email : enteredemail }),
    //                             headers : {
    //                                 'Content-Type' : 'application/json'
    //                             }
    //                             });
    //                             console.log("4");
    //                 }
    //             }
    //         }
    //     });
    //     // console.log("yes");
    // }

    // -----------edit your Phone number--------------
    function editNumberBtn(){
        document.getElementById('number').style.visibility='hidden'
        document.getElementById('editNumber').style.visibility='hidden'
        document.getElementById('newNumber').style.visibility='visible'
    }
    function cancelNewNumber(){
        document.getElementById('number').style.visibility='visible'
        document.getElementById('editNumber').style.visibility='visible'
        document.getElementById('newNumber').style.visibility='hidden'
    }
    function editNumber(){
        const enteredNewNumber=numberInputRef.current.value;
        // console.log(enteredNewNumber)
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).then(response =>
            {return response.json();}
        ).then(data => {
            var keys;
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                
                if(data[keyAll[key]].email===localStorage.getItem('email')){
                    keys = keyAll[key];
                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keys}.json`,
                    {
                    method : 'PATCH',
                    body : JSON.stringify({ number : enteredNewNumber }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                    }).then( () => { document.location.reload(true); } );
                }
            }
        });
    }


    // -----------edit your Password--------------
    function editPasswdBtn(){
        document.getElementById('passwd').style.visibility='hidden'
        document.getElementById('editPasswd').style.visibility='hidden'
        document.getElementById('newPasswd').style.visibility='visible'
        document.getElementById('invalid').style.visibility = 'hidden'
        document.getElementById('invalid2').style.visibility = 'hidden'
    }

    function editPasswd(){
        const enteredNewPasswd=newPasswdInputRef.current.value;
        const enteredConfirm=confirmInputRef.current.value;
        const enteredOldPasswd=oldPasswdInputRef.current.value;
        
        if(enteredNewPasswd!==enteredConfirm){
            document.getElementById('invalid').style.visibility = 'visible'
            document.getElementById('invalid2').style.visibility = 'hidden'
        }
        else{
            document.getElementById('invalid').style.visibility = 'hidden'
            
            fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
            ).then(response =>
                {return response.json();}
            ).then(data => {
                var keys;
                const keyAll =Object.keys(data);
                for ( const key in keyAll ){
                    
                    if(data[keyAll[key]].email===localStorage.getItem('email')){
                        
                        if(data[keyAll[key]].passwd===enteredOldPasswd){
                            document.getElementById('passwd').style.visibility='visible'
                            document.getElementById('editPasswd').style.visibility='visible'
                            document.getElementById('newPasswd').style.visibility='hidden'
                            document.getElementById('invalid').style.visibility='hidden'
                            document.getElementById('invalid2').style.visibility='hidden'
                            keys = keyAll[key];
                            
                            fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keys}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({ passwd : enteredNewPasswd }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    }).then( () => { document.location.reload(true); } );
                                    
                        }
                        else{
                            document.getElementById('invalid2').style.visibility = 'visible'
                            document.getElementById('invalid').style.visibility = 'hidden'
                        }
                    }
                }
            });
        }

    }
    function cancelNewPasswd(){
        document.getElementById('passwd').style.visibility='visible'
        document.getElementById('editPasswd').style.visibility='visible'
        document.getElementById('newPasswd').style.visibility='hidden'
        document.getElementById('invalid').style.visibility='hidden'
        document.getElementById('invalid2').style.visibility='hidden'
    }

    function btnOwnWorks(){
        history.replace('/Own-Works')
    }

    async function EditPhoto(e){
        await setImage(e.target.files[0]);
        document.getElementById("UploadChange").style.display="block";
      }
      async function UploadChange(){
        document.getElementById("progress").style.visibility="visible";
          await uploadBytes(storageRef,image);
          window.location.reload();
          
      }
    return(
        <div>
            <MainNavigation />
            

            <span className={classes.header}>Account Information</span>


            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td className={classes.bold}>First Name</td>
                        <td id='fname'></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Last Name</td>
                        <td id='lname'></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Email</td>
                        <td id='email'></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Phone Number</td>
                        <td id='number'></td>
                        <div className={classes.number}>
                            <button className={classes.editNumber} id='editNumber' onClick={editNumberBtn}>Edit</button>
                            <div className={classes.newNumber} id='newNumber'>
                                <input type="number" name="newNumber" placeholder="Your new Phone Number" min='9' max='13' ref={numberInputRef} required autoFocus autoComplete="on"/>
                                <button id='editNumber' onClick={editNumber}>OK</button> 
                                <button onClick={cancelNewNumber}>Cancel</button> 
                            </div>
                        </div>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Password</td>
                        <td id='passwd'></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Birthday</td>
                        <td id='birth'></td>
                    </tr>
                    
                    <tr>
                        <td className={classes.bold}>Gender</td>
                        <td id='gender'></td>
                    </tr>
                </tbody>
            </table>

            {/* <button className={classes.editFName} id='editFName' onClick={editFName}>Edit</button>
            <button className={classes.editLName}>Edit</button> */}
            {/* <button className={classes.editEmail} id='editEmail' onClick={editEmail}>Edit</button> */}
            <button className={classes.editPasswd} id='editPasswd' onClick={editPasswdBtn}>Edit</button>
            {/* <button className={classes.editBirth}>Edit</button>
            <button className={classes.editGender}>Edit</button> */}

            {/* <div className={classes.newEmail} id='newEmail'> */}
            {/* <form autoComplete="on" method='post' className={classes.newEmail} id='newEmail' onSubmit={patchEmail}>
                <input type="email" name="email" placeholder="Your new email" maxLength="256" className={classes.newEmailInput} ref={emailInputRef} required autoFocus autoComplete="on"/>
                <input type="password" name="passwd" placeholder="Your Password" maxLength="256" className={classes.newEmailInput} ref={passwdInputRef} required autoFocus autoComplete="on"/>

                <button id='editEmail' type='submit' onClick={patchEmail}>OK</button>
                <button onClick={cancelNewEmail}>Cancel</button> */}
                {/* <input type="submit" value="OK" id='editEmail' className={classes.editEmailInput}/> */}
            {/* </form> */}
            {/* </div> */}

            <div className={classes.newPasswd} id='newPasswd'>
                <input type="password" name="newPasswd" placeholder="Your new Password" maxLength="256" ref={newPasswdInputRef} required autoFocus autoComplete="on"/>
                <input type="password" name="newPasswd" placeholder="Retype new Password" maxLength="256" ref={confirmInputRef} required autoFocus autoComplete="on"/>
                <input type="password" name="oldPasswd" placeholder="Your old Password" maxLength="256" ref={oldPasswdInputRef} required autoFocus autoComplete="on"/>

                <button id='editPasswd' onClick={editPasswd}>OK</button>
                <button onClick={cancelNewPasswd}>Cancel</button>
                <span className={classes.invalid} id='invalid'>The two new passwords do not match</span><br/>
                <span className={classes.invalid2} id='invalid2'>This is not your current password</span>
            </div>

            <div className={classes.comments} id='comments' style={{'position':'relative'}}></div>
            <div className={classes.comments} id='noComments' style={{'position':'relative'}}>No comments yet.</div>

            <div className={classes.divName}>
                <span className={classes.name} id='name'></span>
            </div>

            <span className={classes.vertical}></span>
            
            <div className={classes.allProf}>
                <img id='myimg' alt='MyImg' src={Url} className={classes.profile}/>
                    <label htmlFor="file-upload"  className={classes.image} style={{'top':'398px'}}>
                            <input id="file-upload" type="file" name="img" onChange={EditPhoto}/>
                            Edit your photo
                    </label>
                    <button className={classes.uploadChange} onClick={UploadChange} id="UploadChange">Submit</button>
            </div>
            <button className={classes.header2} onClick={btnOwnWorks}>My Works</button>
            <Box sx={{ display: 'flex' }} style={{"position":'absolute',"top":'237px',"left":'135px',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                 <CircularProgress />
            </Box>
            <img src='Images/done.png' alt='Done' style={{"position":'absolute',"top":'415px',"left":'245px',"overflow":'hidden',"visibility":'hidden','width':'35px'}} id='done'/>

        </div>
    );
}
export default MyProfile;