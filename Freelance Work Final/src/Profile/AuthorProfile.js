import { useState,useEffect } from 'react';
import {useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import MainNavigation from '../Components/Navigation/MainNavigation'
import classes from './AuthorProfile.Module.css'
import TextField from '@mui/material/TextField';

import { initializeApp,getApps } from "firebase/app";
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

function OwnWorks(){
    
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
        const app = initializeApp(firebaseConfig);}
      var storage = getStorage();

    const history =useHistory();

    const commentInputRef = useRef();

    const location = useLocation();
    var email;
    useEffect(()=>{
        if(location.state===undefined){history.replace('./Main')}
        else{
        email = location.state.detail;

        const storageRef = ref(storage,email);
        console.log(email);
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
          const img = document.getElementById('myimg1');
          img.setAttribute('src', url);
        }).catch((error)=>{
            if(error.code==='storage/object-not-found')
                {}
        })
        // loading the profile data
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
            {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                
                if(data[keyAll[key]].email===email){
                    document.getElementById('fname').innerHTML = data[keyAll[key]].fname;
                    document.getElementById('lname').innerHTML = data[keyAll[key]].lname;
                    document.getElementById('email').innerHTML = data[keyAll[key]].email;
                    document.getElementById('birth').innerHTML = data[keyAll[key]].birthDay + ' / ' + data[keyAll[key]].birthMonth + ' / ' +  data[keyAll[key]].birthYear;
                    if(data[keyAll[key]].number!=''){
                        document.getElementById('number').innerHTML = data[keyAll[key]].number;
                    }
                    else{
                        document.getElementById('number').innerHTML = 'None yet';
                    }
                    document.getElementById('gender').innerHTML = data[keyAll[key]].gender;

                    var name = data[keyAll[key]].fname + ' ' + data[keyAll[key]].lname;
                    document.getElementById('name').innerHTML = name;

                    if(data[keyAll[key]].comments===''){
                        document.getElementById('noComments').style.visibility = "vsible";
                        console.log("yes")
                    }
                    else{
                        document.getElementById('noComments').style.visibility = "hidden";
                        var comments = '';var commentName = '';var commentDate = '';var comment = '';var finalComment = '';

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
                                comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowfalse')+14,data[keyAll[key]].comments.indexOf('+')); //get first comment (name & comment)
                                commentName = comments.substring(0,comments.indexOf('=')); //get name of commetnt
                                commentDate = comments.substring(comments.indexOf('%ymdnowtrue') + 11,comments.indexOf('%ymdnowfalse'));
                                comment = comments.substring(comments.indexOf('=') + 1,comments.indexOf('%ymdnowtrue')); //get comment
                                
                                const dateOld = new Date(commentDate);
                                const date1utc = Date.UTC(dateOld.getFullYear(), dateOld.getMonth(), dateOld.getDate());
                                const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                                const day = 1000*60*60*24;
                                const days = (date2utc - date1utc)/day;

                                finalComment +=`<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`
                                    + `<img src="Images/Profile.png" alt="Profile" style="position:relative;left:-155px;top:5px;width:50px;height:50px"/>`+
                                    `<span style="text-align:left;position:relative;left:-145px;top:-20px">` + `<b>` + commentName + `</b>`+ `<span style="position:relative;left:10px;font-size:12px">` + '(Posted ' + days + 'd ago)' + `</span>` +`</br>` 
                                    + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
                                    + `<p style="position:relative;left:200px;width:90%;height:auto;text-align:left">` + comment+ `</p>` + `</span>` + `</div>` + `<hr/>`;
                                data[keyAll[key]].comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('+') + 1);
                            }
                            else{
                                comments = comments = data[keyAll[key]].comments.substring(data[keyAll[key]].comments.indexOf('%emailnowfalse')+14); //get last comment
                                commentName = comments.substring(0,comments.indexOf('=')); //get name of commetnt
                                commentDate = comments.substring(comments.indexOf('%ymdnowtrue') + 11,comments.indexOf('%ymdnowfalse'));
                                comment = comments.substring(comments.indexOf('=') + 1,comments.indexOf('%ymdnowtrue')); //get comment

                                const dateOld = new Date(commentDate);
                                const date1utc = Date.UTC(dateOld.getFullYear(), dateOld.getMonth(), dateOld.getDate());
                                const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
                                const day = 1000*60*60*24;
                                const days = (date2utc - date1utc)/day;

                                finalComment +=`<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`
                                    + `<img src="Images/Profile.png" alt="Profile" style="position:relative;left:-155px;top:5px;width:50px;height:50px"/>`+
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
        });
    }

    },[location])
    
    function btnOwnWorks(){
        history.push({
            pathname : '/Author-Works',
            search : '?query=abc',
            state : { detail : email}
        })
    }

    function addComment(){
        document.getElementById('noComments').style.visibility = "hidden";
        // document.getElementById('comments').innerHTML = "";
        var today = new Date();
        // const date1 = new Date("2020-12-10");
        // var a=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const date2utc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        const day = 1000*60*60*24;
    // console.log((date2utc - date1utc)/day)
    // console.log(today.getFullYear()+'-'+ (today.getMonth()+1) +'-'+ today.getDate())

        const enteredcomment=commentInputRef.current.value;
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            
            const keyAll =Object.keys(data);
            var keysMem;var myFName; var myLName;
            
            for ( const key in keyAll ){
                if (data[keyAll[key]].email===localStorage.getItem('email')){
                    myFName = data[keyAll[key]].fname;
                    myLName = data[keyAll[key]].lname;
                }
            }
            for ( const key in keyAll ){
                if (data[keyAll[key]].email===email){
                    keysMem = keyAll[key];

                    data[keyAll[key]].comments += '+';
                    data[keyAll[key]].comments += '%emailnowtrue';
                    data[keyAll[key]].comments += localStorage.getItem('email');
                    data[keyAll[key]].comments += '%emailnowfalse';
                    data[keyAll[key]].comments +=myFName + ' ' + myLName;
                    data[keyAll[key]].comments += '=';
                    data[keyAll[key]].comments += enteredcomment;
                    data[keyAll[key]].comments += '%ymdnowtrue';
                    data[keyAll[key]].comments += today.getFullYear()+'-'+ (today.getMonth()+1) +'-'+ today.getDate();
                    data[keyAll[key]].comments += '%ymdnowfalse';

                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysMem}.json`,
                    {
                    method : 'PATCH',
                    body : JSON.stringify({ comments : data[keyAll[key]].comments }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                    });
                }
            }
                //load new comment
        // document.getElementById('comments').innerHTML += `<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`;
        // document.getElementById('comments').innerHTML += `<img src="Images/Profile.png" alt="Profile" style="position:relative;left:-220px;top:5px;width:50px;height:50px"/>`;
        // document.getElementById('comments').innerHTML += `<span style="text-align:left;position:relative;left:-210px;top:-20px">`;
        // document.getElementById('comments').innerHTML += `<b>`;
        // document.getElementById('comments').innerHTML += myFName;
        // document.getElementById('comments').innerHTML += ' ';
        // document.getElementById('comments').innerHTML += myLName;
        // document.getElementById('comments').innerHTML += `</b>`;
        // document.getElementById('comments').innerHTML += `</br>`;
        // document.getElementById('comments').innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        // document.getElementById('comments').innerHTML += `<p style="position:relative;left:260px;width:90%;height:auto;text-align:left">`;
        // document.getElementById('comments').innerHTML += enteredcomment;
        // document.getElementById('comments').innerHTML +=  `</p>`;
        // document.getElementById('comments').innerHTML +=  `</p>`;
        // document.getElementById('comments').innerHTML += `</div>`;
        // document.getElementById('comments').innerHTML += `<hr/>`;
        document.getElementById('comments').innerHTML += `<div style="border: 1px solid #f1f1f1;background-color:#f1f1f1;height:auto">`
        + `<img src="Images/Profile.png" alt="Profile" style="position:relative;left:-155px;top:5px;width:50px;height:50px"/>`+
        `<span style="text-align:left;position:relative;left:-145px;top:-20px">` + `<b>` + myFName + ' ' + myLName + `</b>`+ `<span style="position:relative;left:10px;font-size:12px">` + '(Posted just now)' + `</span>` +`</br>` 
        + `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
        + `<p style="position:relative;left:200px;width:90%;height:auto;text-align:left">` + enteredcomment+ `</p>` + `</span>` + `</div>` + `<hr/>`;
        
        });
        document.getElementById('addComment').value='';
        
        
    }



    
    return(
        <div>
            <MainNavigation />
            

            <span className={classes.header}>Account Information</span>


            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td className={classes.bold}>First Name</td>
                        <td id='fname' className={classes.right}></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Last Name</td>
                        <td id='lname' className={classes.right}></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Email</td>
                        <td id='email' className={classes.right}></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Phone Number</td>
                        <td id='number' className={classes.right}></td>
                    </tr>

                    <tr>
                        <td className={classes.bold}>Birthday</td>
                        <td id='birth' className={classes.right}></td>
                    </tr>
                    
                    <tr>
                        <td className={classes.bold}>Gender</td>
                        <td id='gender' className={classes.right}></td>
                    </tr>

                    <tr>
                        <textarea placeholder="Add new comment" rows='3' ref={commentInputRef} className={classes.addComment} id='addComment'></textarea>
                            
                    </tr>

                </tbody>
            </table>

            <img id='myimg1' src='Images/Profile.png' className={classes.profile}/>
            <span className={classes.vertical}></span>

            <button className={classes.addCommentBtn} onClick={addComment}>Add Comment</button>
            <div className={classes.comments} id='comments'></div>
            <div className={classes.comments} id='noComments'>No comments yet.</div>

            <div className={classes.divName}>
                <span className={classes.name} id='name'></span>
            </div>

            <button className={classes.header3} onClick={btnOwnWorks} style={{}}>All Works by the author</button>

        </div>

    );
}
export default OwnWorks;