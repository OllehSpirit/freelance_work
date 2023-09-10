import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import MainNavigation from '../Components/Navigation/MainNavigation'
import WorkList from '../Components/Works/WorkList';
import classes from './MyProfile.Module.css'

function AuthorWorks(){
    const location = useLocation();
    const [loadedWorks , setLoadedWorks] = useState( [] );
    var email;
    useEffect(()=>{
        email = location.state.detail;
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
            {return response.json();}
        ).
        then(data => {
            
            const works = [];
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                
                if(data[keyAll[key]].author===email){
                const work ={
                    id : keyAll[key],
                    ...data[keyAll[key]]
                };
                works.push(work);
                }
            } 
            setLoadedWorks(works);
        });

        var flag=1;
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].author===email){
                    flag=0;
                }  
            }
            if(flag) {
                document.getElementById("works").innerHTML= "You got no Works yet." 
            }
        });
    },[location])
    
    
        

    



    return(
        <div>
            <MainNavigation />
            <span className={classes.header}>All Works by the author</span>
            <b><p className={classes.works} id='works'></p></b>

            <WorkList works={loadedWorks}/>
        </div>

    );
}
export default AuthorWorks;