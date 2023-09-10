import { useState,useEffect } from 'react';

import MainNavigation from '../Components/Navigation/MainNavigation'
import WorkList from '../Components/Works/WorkList';
import classes from './MyProfile.Module.css'

function OwnWorks(){
    
    // loading my works
    const [loadedWorks , setLoadedWorks] = useState( [] );
    useEffect( () => {
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).then(response =>
            {return response.json();}
        ).then(data => {
            
            const works = [];
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                
                if(data[keyAll[key]].author===localStorage.getItem('email')){
                const work ={
                    id : keyAll[key],
                    ...data[keyAll[key]]
                };
                works.push(work);
                }
            } 
            setLoadedWorks(works);
        });
    },[]);

    var flag=1;
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).then(response =>
    {return response.json();}
    ).then(data => {
        const keyAll =Object.keys(data);
        for ( const key in keyAll ){
            if(data[keyAll[key]].author===localStorage.getItem('email')){
                flag=0;
            }  
        }
        if(flag) {
            document.getElementById("works").innerHTML= "You got no Works yet." 
        }
    });



    return(
        <div>
            <MainNavigation />
            <span className={classes.header} style={{'position':'absolute','top':'120px'}}>My Works</span>
            <b><p className={classes.works} id='works'></p></b>

            <WorkList works={loadedWorks}/>
        </div>

    );
}
export default OwnWorks;