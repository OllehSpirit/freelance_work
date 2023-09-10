import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import WorkList from '../Components/Works/WorkList';
import MainNavigation from '../Components/Navigation/MainNavigation';
import Navigation from '../Components/Navigation/Navigation';
import SpeedDialButton from '../Components/SpeedDialButton'
import MainFooter from '../Components/Footer/MainFooter';
import Footer from '../Components/Footer/Footer';

function My_Favorites(){
    
    const location = useLocation()
    const [loadedWorks , setLoadedWorks] = useState( [] );
    useEffect( () => {
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
            
            const works = [];
            const keyAll =Object.keys(data);
            if(url!=''){
                // console.log("yes")
                for ( const key in keyAll ){
                    if(data[keyAll[key]].fav.search(localStorage.getItem('email'))!=-1){
                        
                            if (data[keyAll[key]].job===url){
                                const work ={
                                    id : keyAll[key],
                                    ...data[keyAll[key]]
                                };
                                works.push(work);
                            }
                    }
                }
            } 
            else{
                for ( const key in keyAll ){
                    if(data[keyAll[key]].fav.search(localStorage.getItem('email'))!=-1){
                        const work ={
                            id : keyAll[key],
                            ...data[keyAll[key]]
                        };
                        works.push(work);
                    }
                }
            }
            setLoadedWorks(works);
        });
    },[window.location.href]);

    let content;
    var flag=1;
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).
    then(response =>
    {return response.json();}
    ).
    then(data => {
        const keyAll =Object.keys(data);
        for ( const key in keyAll ){
            if(data[keyAll[key]].fav.search(localStorage.getItem('email'))!=-1){
                flag=0;
                
            }  
        }
        if(flag) {
            document.getElementById("favorites").innerHTML= "You got no Favorites yet." 
        }
    });

    

    // if(favoritesCtx.totalFavorites===0) {
    //     content =   <p>
    //                    <b><br/><br/><br/><br/><br/><br/><br/><br/>
    //                     You got no Favorites yet. Start adding some?</b>
    //                  </p>
    // } else{
    //     content = <WorkList works={favoritesCtx.favorites} />
    // }
 
    return(
        <section>
            <MainNavigation />
            {/* <Navigation /> */} 
            
            <br/>
            <b><p id='favorites'></p></b>
            
            <WorkList works={loadedWorks} />
            <SpeedDialButton/>
            
            <MainFooter/>
            <Footer/>
        </section>
    );
}
export default My_Favorites;