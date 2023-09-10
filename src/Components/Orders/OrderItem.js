import { useHistory,useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import { useRef } from 'react';

import { sendForm } from 'emailjs-com';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import classes from'./AllOrders.Module.css';

function OrderItem(props){

    const history =useHistory();
    const [hidden , setHidden] = useState(true)

    const [hiddenTailor , setHiddenTailor] = useState(true)
    const [hiddenPainter , setHiddenPainter] = useState(true)
    const [hiddenTd , setHiddenTd] = useState(true)
    const [hiddenCarpenter , setHiddenCarpenter] = useState(true)

    const [cntTailor , setcntTailor] = useState(0)
    const [cntPainter , setcntPainter] = useState(0)
    const [cntTd , setcntTd] = useState(0)
    const [cntCarpenter , setcntCarpenter] = useState(0)

    const [dialog , setDialog] = useState('')

    const [name , setName] = useState('')

    useEffect( () => {
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].title===props.title){

                    setcntTailor(data[keyAll[key]].countTailor);
                    setcntPainter(data[keyAll[key]].countPainter);
                    setcntTd(data[keyAll[key]].countTd);
                    setcntCarpenter(data[keyAll[key]].countCarpenter);

                    if(data[keyAll[key]].author===localStorage.getItem('email')){
                       setHidden(true)
                    }
                    else{
                        setHidden(false)
                    }

                    if(data[keyAll[key]].countTailor>=1){setHiddenTailor(true)}
                    else{setHiddenTailor(false)}

                    if(data[keyAll[key]].countPainter>=1){setHiddenPainter(true)}
                    else{setHiddenPainter(false)}

                    if(data[keyAll[key]].countTd>=1){setHiddenTd(true)}
                    else{setHiddenTd(false)}

                    if(data[keyAll[key]].countCarpenter>=1){setHiddenCarpenter(true)}
                    else{setHiddenCarpenter(false)}

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
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json'
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
                    fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders/${keys}.json`,
                    {
                    method : 'DELETE',
                    body : JSON.stringify({ keys }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                    }).then(()=>{document.location.reload(true)});
                }
            }
        });
    }

    //  console.log(props.orders);

    //Dialog
    const [open, setOpen] = useState(false);
      
    const handleClickOpen = () => {
      setOpen(true);
      fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json'
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
                // console.log(form)
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
        <li className={classes.card}>

        <div className={classes.content}>
        <div className={classes.image}>
            <img src='Images/LOGO.png' alt={props.title} className={classes.image} />
        </div>

            <h3>{props.title}</h3>
            {/* <hr style={{'opacity':'0.3',color:'#77002e'}} /><br/> */}
            <address>Available on: {props.gov}</address>
            {props.address ? <address style={{'fontSize':'10px'}}>({props.address})</address> : null}
            <p>{props.description}</p>
        </div>
        {/* <hr style={{'opacity':'0.1'}} /> */}
        <div>
            I need:
            {hiddenTailor ? <p style={{'fontWeight':'900'}}>{cntTailor} Tailor</p> : null }
            {hiddenPainter ? <p style={{'fontWeight':'900'}}>{cntPainter} Painter</p> : null }
            {hiddenTd ? <p style={{'fontWeight':'900'}}>{cntTd} Taxi Driver</p> : null }
            {hiddenCarpenter ? <p style={{'fontWeight':'900'}}>{cntCarpenter} Carpenter</p> : null }
        </div>

        <div style={{marginBottom:'20px'}}>
            <button className={classes.button} onClick={btnAuthor}>More details about {name}</button>

            {hidden || localStorage.getItem('email')==='AdminFreelanceWork@gmail.com' ? <button className={classes.delete} id='del' onClick={btnDel}>Delete</button> 
            : 
            <div>
                <Button variant="outlined" onClick={handleClickOpen} className={classes.Button} style={{color:'white',fontWeight:'400',borderColor:'rgb(113, 177, 156)',backgroundColor:'rgb(113, 177, 156)'}}>
                    Apply
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
    )
}
export default OrderItem;