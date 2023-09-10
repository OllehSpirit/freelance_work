import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Search } from 'grommet-icons';

import { Box, TextInput } from 'grommet';

import classes from './SearchInput.Module.css'
import { useState } from 'react';
import WorkList from './Works/WorkList';

 function SearchInput(){
    const history =useHistory();

    const [content , setContent] = useState('');
    const inputText = useRef()

    async function lookFor(){
        // var workFilter = e.target.id;
        // history.push({
        //     // pathname: '/Main',
        //     // search: '?query=abc',
        //     state: {detail: workFilter}
        // });
        // setContent('')
        const entered = inputText.current.value;
        setContent(entered)
        // console.log(entered)
        history.push({
            pathname: '/Main',
            // search: '?query=abc',
            state: {detail: entered}
        });
        // // const works = [];
        // // document.getElementById('search').innerHTML=''
        // if (entered!=''){
        // await fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        // ).
        // then(response =>
        //     {return response.json();}
        // ).
        // then(data => {
            
            
        //     const keyAll =Object.keys(data);
        //     var cnt=0;
        //     for( const key in keyAll ){
        //         if(cnt>=2)break;
        //         if(data[keyAll[key]].title.includes(entered)!=false){
        //             cnt++;
                    // console.log(data[keyAll[key]].price)
                    // var link= '#'+data[keyAll[key]].title;
                    // console.log(link)
                    // var b=<div style={{overflow:'hidden',height:'auto'}}>
                    //         <h3 style={{textAlign:'left',marginLeft:'10px',marginTop:'-2px',color:'#cc2062'}}>{data[keyAll[key]].title}</h3>
                    //         <h4 style={{textAlign:'left',marginLeft:'15px',fontSize:'12px'}}>{data[keyAll[key]].job}</h4> 
                    //         <p style={{textAlign:'left',marginLeft:'15px'}}>{data[keyAll[key]].address}</p>
                    //         <p style={{textAlign:'left',marginLeft:'15px'}}>{data[keyAll[key]].description}</p>
                    //         <p style={{textAlign:'left',marginLeft:'15px'}}><b style={{color:'#55324a'}}>{data[keyAll[key]].price} S.P.</b></p>
                            {/* <button className={classes.button} >More details about the author</button> */}
                            {/* <a href={link}>Go to the work</a> */}
                            {/* <hr style={{opacity:'0.1'}}/> */}
                    //     </div>       
                    // ;
                    // console.log(a)
                    // setContent(content=>[...content,b]);
                    // console.log(data[keyAll[key]].title)  
                    // console.log(content)
        //         }
        //     }
        //     });
        // }
    }
// console.log('vuibuib')
    return(
        <div>
            <Box fill align="center" justify="start" pad="large" className={classes.box}>
                <Box width="medium" gap="medium" className={classes.search}>
                    <TextInput icon={<Search />} placeholder="Search for a specific job..." className={classes.txt} ref={inputText}/>
                    {/* <p id='search'></p> */}
                    {/* {content} */}
                </Box>
            </Box>
            <a href={`#${content}`} className={classes.btn} onClick={lookFor}>Search</a>
        </div>
    );
}
export default SearchInput;