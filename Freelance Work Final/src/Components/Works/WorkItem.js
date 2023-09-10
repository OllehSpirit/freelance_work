import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory,useLocation } from 'react-router-dom';


import { useRef } from 'react';

import { sendForm } from 'emailjs-com';

import Rating from '@mui/material/Rating';
import classes from './Work.Module.css';
import { getStorage , ref , uploadBytes , getDownloadURL  } from "firebase/storage";

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Box, RangeInput } from 'grommet';


function WorkItem(props){
    

    const history =useHistory();
    const location = useLocation();
    
    const [yesval , putval] = useState('')
    const [hidden , setHidden] = useState(true)
    const [votes , setVotes] = useState(0)
    const [rate , setRate] = useState(0)
    const [star , setStar] = useState(0)
    const [price , setPrice] = useState(0)
    const [det , setDet] = useState('')

    const [name , setName] = useState('')

    const [dialog , setDialog] = useState('')

    

    const [gov , setGov] = useState('');var govCnt='';

    var storage = getStorage();
    const [Url , setUrl] = useState( );

    useEffect( () => {
    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
    ).
    then(response =>
    {return response.json();}
    ).
    then(data => {
        const keyAll =Object.keys(data);
        for ( const key in keyAll ){
            if(data[keyAll[key]].title===props.title){

                setPrice(data[keyAll[key]].price);
                setDet(data[keyAll[key]].priceDetails);
                while(data[keyAll[key]].govChecked!=''){
                    govCnt += data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'));
                    govCnt += ' / ';
                    setGov(govCnt);
                    data[keyAll[key]].govChecked = data[keyAll[key]].govChecked.substring(data[keyAll[key]].govChecked.indexOf('+')+1);
                }
                const storageRef = ref(storage , props.title);
            getDownloadURL(storageRef)
                    .then( (url) => {
                        // document.getElementById('progress').style.visibility = 'visible'
                    // `url` is the download URL for 'images/stars.jpg'
                
                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    // console.log(url)
                
                    // Or inserted into an <img> element
                    setUrl(url)
                    // document.getElementById('progress').style.visibility = 'hidden'
                    }).catch((error)=>{
                        if(error.code==='storage/object-not-found')
                            {
                                // console.log("can't found it")
                            }
                    })

                var c=0;
                for ( const ss in  localStorage.getItem('email')){
                    c++;
                }
                if(data[keyAll[key]].ratingDetails.includes(localStorage.getItem('email'))===true){
                    setStar(parseInt(data[keyAll[key]].ratingDetails.substring(data[keyAll[key]].ratingDetails.indexOf(localStorage.getItem('email'))+c,data[keyAll[key]].ratingDetails.indexOf(localStorage.getItem('email'))+c+1)));
                }
                else{
                    setStar(0);
                }

                setVotes(data[keyAll[key]].cntRating);
                setRate(data[keyAll[key]].rating)
                // console.log(votes)
                
                if(data[keyAll[key]].fav.search(localStorage.getItem('email'))===-1){
                    putval('Add To Favorites')
                    
                }
                else{
                    putval('Remove From Favorites')
                }

                if(data[keyAll[key]].author===localStorage.getItem('email')){
                   setHidden(true)
                }
                else{
                    setHidden(false)
                }

                const email = data[keyAll[key]].author;
                if(email===localStorage.getItem('email')){setName('Me');}
                else{
                    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                    ).
                    then(response =>
                    {return response.json();}
                    ).
                    then(data => {
                        const keyAll =Object.keys(data);
                        for ( const key in keyAll ){
                            if(data[keyAll[key]].email===email){
                                var fname = data[keyAll[key]].fname;
                                var lname = data[keyAll[key]].lname;
                                setName(fname + ' ' + lname);
                            }
                        }
                    });
                }
                
            }
        }
    });
    },[]);

    var cnt;
    function toggleFavorites(){
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            var keys;var favs;
            for ( const key in keyAll ){
                if (data[keyAll[key]].title===props.title){
                    keys = keyAll[key];

                    if(data[keyAll[key]].fav.search(localStorage.getItem('email'))!=-1){
                        favs = data[keyAll[key]].fav.replace(`+${localStorage.getItem('email')}`, "");
                        putval('Add To Favorites');
                        
                        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                        ).
                        then(response =>
                        {return response.json();}
                        ).
                        then(data => {
                            
                            const keyAll =Object.keys(data);
                            var keysMem;var cnt;
                            for ( const key in keyAll ){
                                if (data[keyAll[key]].email===localStorage.getItem('email')){
                                    keysMem = keyAll[key];
                                    cnt = data[keyAll[key]].countFavorites;
                                    cnt--;
                                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysMem}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({ countFavorites : cnt }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    });

                                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Works/${keys}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({fav: favs}),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    }).then(()=>{document.location.reload(true)});

                                }
                            }
                        });

                    }
                    else{
                        data[keyAll[key]].fav+="+";
                        data[keyAll[key]].fav+=localStorage.getItem('email');
                        
                        favs = data[keyAll[key]].fav;
                        putval('Remove From Favorites')

                        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                        ).
                        then(response =>
                        {return response.json();}
                        ).
                        then(data => {
                            
                            const keyAll =Object.keys(data);
                            var keysMem;var cnt;
                            for ( const key in keyAll ){
                                if (data[keyAll[key]].email===localStorage.getItem('email')){
                                    keysMem = keyAll[key];
                                    cnt = data[keyAll[key]].countFavorites;
                                    cnt++;
                                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysMem}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({ countFavorites : cnt }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    });
                                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Works/${keys}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({fav: favs}),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    }).then(()=>{document.location.reload(true)});

                                }
                            }
                        });


                    }
                
                }
            }
            
                
        });
        

    }

    function btnAuthor(){
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
                    ).
                    then(response =>
                    {return response.json();}
                    ).
                    then(data => {
                        
                        const keyAll =Object.keys(data);
                        for ( const key in keyAll ){
                        if (data[keyAll[key]].title===props.title){
                            if (data[keyAll[key]].author===localStorage.getItem('email')){
                                history.replace('/My-Profile')
                            }
                            else{
                                history.push({
                                    pathname : '/Author-Profile',
                                    search : '?query=abc',
                                    state : { detail : data[keyAll[key]].author}
                                })
                            }
                        }
                    }
                    });
    }

    function btnDel(){
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            var keys;
            for ( const key in keyAll ){
                if (data[keyAll[key]].title===props.title){
                    keys = keyAll[key];
                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Works/${keys}.json`,
                    {
                    method : 'DELETE',
                    body : JSON.stringify({ keys }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                    }).then(()=>{document.location.reload(true)});
                    if(yesval==="Remove From Favorites")
                    {
                        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                        ).
                        then(response =>
                        {return response.json();}
                        ).
                        then(data => {
                            
                            const keyAll =Object.keys(data);
                            var keysMem;var cnt;
                            for ( const key in keyAll ){
                                if (data[keyAll[key]].email===localStorage.getItem('email')){
                                    keysMem = keyAll[key];
                                    cnt = data[keyAll[key]].countFavorites;
                                    cnt--;
                                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysMem}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({ countFavorites : cnt }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    function rating(e){
        // console.log(e.target.value)
        setStar(e.target.value)
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            var keys;var count=0;var details; var chunk;
            for ( const key in keyAll ){
                if (data[keyAll[key]].title===props.title){
                    keys = keyAll[key];
                    if(data[keyAll[key]].ratingDetails.includes(localStorage.getItem('email'))===false){
                        data[keyAll[key]].ratingDetails+=localStorage.getItem('email');
                        data[keyAll[key]].ratingDetails+=e.target.value;
                        // console.log(Math.round(e.target.value))
                        data[keyAll[key]].ratingDetails+='+';
                        // setStar(parseInt(data[keyAll[key]].ratingDetails.substring(data[keyAll[key]].ratingDetails.indexOf(window.name)+c,data[keyAll[key]].ratingDetails.indexOf(window.name)+c+1)));

                        data[keyAll[key]].cntRating ++;
                        setVotes(votes+1);

                        details = data[keyAll[key]].ratingDetails;
                        // details = 'anasattoum.12321@gmail.com3+anasattoum.12321@gmail.com4+anasattoum.12321@gmail.com2+anasattoum.12321@gmail.com1+'//example
                        while(details!=''){
                            if(details.includes('+')){
                                chunk = details.substring(0,details.indexOf('+'));
                                details = details.substring(details.indexOf('+')+1);
                                count += +chunk.charAt(chunk.length-1);   //+before chunk to change it from string to integer
                            }
                            
                        }
                        data[keyAll[key]].rating = Math.round((count/data[keyAll[key]].cntRating)*100)/100;
                        setRate(data[keyAll[key]].rating)
                    }
                    else{
                        var c=0;
                        for ( const ss in  localStorage.getItem('email')){
                            c++;
                        }
                        var first = data[keyAll[key]].ratingDetails.substring(0,data[keyAll[key]].ratingDetails.indexOf(window.name)+c);
                        var second = data[keyAll[key]].ratingDetails.substring(data[keyAll[key]].ratingDetails.indexOf(window.name)+c+1);
                        data[keyAll[key]].ratingDetails = first + e.target.value + second;
                        // setStar(parseInt(data[keyAll[key]].ratingDetails.substring(data[keyAll[key]].ratingDetails.indexOf(window.name)+c,data[keyAll[key]].ratingDetails.indexOf(window.name)+c+1)));
                        
                        details = data[keyAll[key]].ratingDetails;
                        // details = 'anasattoum.12321@gmail.com3+anasattoum.12321@gmail.com4+anasattoum.12321@gmail.com2+anasattoum.12321@gmail.com1+'//example
                        while(details!=''){
                            if(details.includes('+')){
                                chunk = details.substring(0,details.indexOf('+'));
                                details = details.substring(details.indexOf('+')+1);
                                count += +chunk.charAt(chunk.length-1);   //+before chunk to change it from string to integer
                            }
                            
                        }
                        data[keyAll[key]].rating = Math.round((count/data[keyAll[key]].cntRating)*100)/100;
                        setRate(data[keyAll[key]].rating)

                    }
                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Works/${keys}.json`,
                    {
                    method : 'PATCH',
                    body : JSON.stringify({ 
                        ratingDetails : data[keyAll[key]].ratingDetails,
                        cntRating: data[keyAll[key]].cntRating,
                        rating : data[keyAll[key]].rating
                     }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                    });
                }
            }
        });
        
    }
    // console.log(star);
    // console.log(props.num)


    //Dialog
        const [open, setOpen] = useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
          fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
                    ).
                    then(response =>
                    {return response.json();}
                    ).
                    then(data => {
                        
                        const keyAll =Object.keys(data);
                        for ( const key in keyAll ){
                        if (data[keyAll[key]].title===props.title){
                            setDialog(data[keyAll[key]].author)
                            }
                        }
                    });
                    // {console.log(dialog);
                    //     console.log(localStorage.getItem('name'));
                    //     console.log(localStorage.getItem('email'));
                    //     console.log(props.title);
                    //     console.log(name);
                    //     }
                    console.log(form)
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const form = useRef();
        const sendEmail = (e) => {
            e.preventDefault();
        
              sendForm('service_1o6nwvw', 'template_cj2q17p', form.current, 'ohOS6QlC-qLfiY2AG')
              .then((result) => {
                //   console.log(result.text);
                  setOpen(false);
              }, (error) => {
                //   console.log(error.text);
              });
              
          };

    return(
            
        <li className={classes.card} id={props.title}>
            {/* <Rating name="size-small" defaultValue={2} size="small" /> */}

            <div className={classes.content}>
                <div className={classes.image}>
                    <img src={Url} alt={props.title} className={classes.image} />
                </div>
                {/* <Box sx={{ display: 'flex' }} style={{"position":'relative',"top":'-150px',"left":'220px',"overflow":'hidden',"visibility":'hidden'}} id='progress'>
                    <CircularProgress />
                </Box> */}
                <h3 style={{paddingLeft: '20px',paddingRight: '20px'}}>{props.title}</h3>
                <h4 style={{paddingLeft: '20px',paddingRight: '20px'}}>{props.job==='other'? props.other : props.job }</h4>

                <div>
                    <Rating name="size-medium" value={star} className={classes.rating} onClick={rating} />
                    <span className={classes.ratingNum}>{rate}</span>
                    <span className={classes.ratingCnt}>({votes} votes)</span>
                </div>

                <img src='Images/LOGO.png' alt='logo' className={classes.logo} />
                <address style={{paddingLeft: '20px',paddingRight: '20px'}}>Available on: {gov}</address>
                {props.address ? <address style={{'fontSize':'10px' ,paddingLeft: '20px',paddingRight: '20px'}}>({props.address})</address> : null}
                <p style={{paddingLeft: '20px',paddingRight: '20px',marginBottom:'20px'}}>{props.description}</p>
            </div>

            <div style={{marginBottom:'20px'}}>
                <span><b>{price} S.P.</b></span>
                <span> {det}</span>
            </div>

            

            <div style={{marginBottom:'20px'}}>
                <button className={classes.button} onClick={btnAuthor}>More details about {name}</button>

                <button className={classes.button} onClick={toggleFavorites} id='addOrRemoveFavorites'>
                    {yesval}
                </button>

                {hidden || localStorage.getItem('email')==='AdminFreelanceWork@gmail.com' ? <button className={classes.delete} id='del' onClick={btnDel}>DELETE</button> 
                : 
                <div>
                    <Button variant="outlined" onClick={handleClickOpen} className={classes.Button} style={{color:'white',fontWeight:'400',borderColor:'rgb(113, 177, 156)',backgroundColor:'rgb(113, 177, 156)'}}>
                        Hire
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Send email to {name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please send a message to apply for this job
                            </DialogContentText>
                            <form ref={form}>
                                <TextField autoFocus margin="dense" name="message" label="Message" type="text" fullWidth variant="standard"/>
                                <input type="hidden" name="to" value={dialog}/>
                                <input type="hidden" name="name" value={localStorage.getItem('name')}/>
                                <input type="hidden" name="from" value={localStorage.getItem('email')}/>
                                <input type="hidden" name="title" value={props.title}/>
                                <input type="hidden" name="to_name" value={name}/>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={sendEmail}>Send</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                 }
            </div>
        
        </li>
    );
}
export default WorkItem;