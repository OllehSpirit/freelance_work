import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './My_Project.module.css';
import Sign_Up_Form from './Sign_Up_Form';
import Footer from '../Components/Footer/Footer';

function Sign_Up(){
    
    const history =useHistory();
    
    function addMemberHandler(signUpData){
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json',
            {
                method : 'POST',
                body : JSON.stringify(signUpData),
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
        ).then( () => { history.replace('/Main') } );
    }

    function btnLogIn(){
        history.replace('/')
    }
    // console.log(localStorage.getItem('name'))

return( 
    <section>
        <div>
            <h1 className={classes.IntroNavigation} >Find Work With Me</h1> 
            <img src="Images/LOGO2.png" className={classes.logo2}/>
            <Sign_Up_Form addMember={addMemberHandler}/>
            {/* <div style={{marginTop: '15px'}}> */}
                {/* <span style={position:"absolute",top:'600px' , left:"200px"}>Already have an account?</span><br/> */}
                {/* <button style={position:"absolute",top:'585px' , left:"375px"} onClick={btnLogIn} className={classes.btn}>Log In!</button> */}
            {/* </div> */}
            <Footer/>
        </div>
    </section>

);

}
export default Sign_Up;