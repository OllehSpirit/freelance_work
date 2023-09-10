import React from "react";
import classes from './Navigation.module.css';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { sendForm } from 'emailjs-com';

// import { Box, DataTable } from 'grommet';
import { Box, DataTable, Heading } from 'grommet';

// import { Box, RangeInput } from 'grommet';
import { async } from "@firebase/util";
import SelectInput from "@mui/material/Select/SelectInput";

function Navigation(){
    
    const history =useHistory();
    const[money,setMoney] = useState(0);var m=0;
    const recEmail = useRef();

    const[bill,setBill] = useState(0);var bill2;
    var from;var to;var amount;
    let finalTable='';
    const[fin,setFin] = useState('');

    const form = useRef();
    const[rec,setRec] = useState('');



    useEffect(()=>{
    
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then( data => {
            // rows.push(createData( 4, 2, 5));
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].email===localStorage.getItem('email')){
                    setMoney(data[keyAll[key]].money);
                    bill2 = data[keyAll[key]].bill;
                    setBill(bill2)
                    // console.log(data[keyAll[key]].bill)

                    while(data[keyAll[key]].bill!=''){

                        from = data[keyAll[key]].bill.substring(0,data[keyAll[key]].bill.indexOf('toThePerson'));
                        to = data[keyAll[key]].bill.substring(data[keyAll[key]].bill.indexOf('toThePerson')+11,data[keyAll[key]].bill.indexOf('amountOfMoney'));
                        amount = data[keyAll[key]].bill.substring(data[keyAll[key]].bill.indexOf('amountOfMoney')+13,data[keyAll[key]].bill.indexOf('+'));

                        // document.getElementById('from').innerHTML = from;
                        // document.getElementById('to').innerHTML = to;
                        // document.getElementById('amount').innerHTML = amount;
                        // rows.push(createData( from, to, amount))
                        // rows.push(createData( 4, 2, 5));
                        // console.log(from)
                        // console.log(to)
                        // console.log(amount)
                        finalTable = <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {from}
                                        </TableCell>
                                        <TableCell align="center">
                                            {to}
                                        </TableCell>
                                        <TableCell align="right">
                                            {amount}
                                        </TableCell>
                                    </TableRow>;
                        // console.log(finalTable)
                        data[keyAll[key]].bill = data[keyAll[key]].bill.substring(data[keyAll[key]].bill.indexOf('+')+1);
                        setFin(fin=>[...fin,finalTable]);
                    }
                    // setFin(finalTable)
                    
                    // document.getElementById('table').innerHTML = finalTable;
                    
                    
                }
            }
        }).then(()=>{
            // window.onload=function(){
            //     document.getElementById('table').innerHTML = finalTable;
            // }
        });
    },[]);


    
    function filterhandler(e){
        var workFilter = e.target.id;
        history.push({
            // pathname: '/Main',
            // search: '?query=abc',
            state: {detail: workFilter}
        });
        // if(window.location.href.search("Fav")===-1){
        //     history.replace("/Job-Tailor");
        // }
        // else{
        //     history.replace("/Job-Tailor-Fav");
        // }
    }

    function about(){
        history.replace('/About-US')
    }

    //Dialog
    const [open, setOpen] = React.useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });
    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose2 = () => {
        document.location.reload();
      };


    var foundEmail =true;
     async function handleClose(){
        // console.log(recEmail.current.value);
        // console.log(range);
        setRec(recEmail.current.value);
        foundEmail =true;
        document.getElementById('error').innerHTML = '';
        await fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/BlockList.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(async data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].email===recEmail.current.value){
                    foundEmail =true;
                }
            }
        await fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                if(data[keyAll[key]].email===recEmail.current.value){
                    foundEmail =false;
                }
            }

            if(money < range){
                document.getElementById('error').innerHTML = 'The transaction cannot be completed because you do not have enough money in your account';
            }
            else if(foundEmail){
                document.getElementById('error').innerHTML = 'This email is not available';
            }
            else{
                fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                ).then(response =>
                    {return response.json();}
                ).then(data => {
                    var keys;var money;var bill;var myMoney=0;var anasMoney=0;var mayyarMoney=0; var keysAnas;var keysMayyar;
                    const keyAll =Object.keys(data);
                    for ( const key in keyAll ){
                        
                        if(data[keyAll[key]].email===recEmail.current.value){
                            keys = keyAll[key];
                            money = data[keyAll[key]].money + range;
                            myMoney = range *0.04; //4%
                            money = money - myMoney;
                            anasMoney = myMoney / 2;
                            mayyarMoney = myMoney / 2;
                            
                            data[keyAll[key]].bill += localStorage.getItem('email') + 'toThePerson' + recEmail.current.value + 'amountOfMoney' + range + '+';
                            bill = data[keyAll[key]].bill;
                            // console.log(bill)
                            // console.log(money)
                            // console.log(range)
                            fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                            ).then(response =>
                                {return response.json();}
                            ).then(data => {
                                var keys2;var money2;var bill2;
                                const keyAll =Object.keys(data);
                                for ( const key in keyAll ){
                                      
                                    if(data[keyAll[key]].email===localStorage.getItem('email')){
                                        keys2 = keyAll[key];
                                        money2 = data[keyAll[key]].money - range;
                                        setMoney(money2);

                                        // data[keyAll[key]].bill += localStorage.getItem('email') + 'to' + recEmail.current.value + 'amount' + range + '+';
                                        // bill2 = data[keyAll[key]].bill;
                                        // console.log(bill2)
                                    }
                                }
                                fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keys2}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({
                                         money : money2,
                                         bill : bill
                                     }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    });

                                    

                            fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keys}.json`,
                                    {
                                    method : 'PATCH',
                                    body : JSON.stringify({
                                         money : money,
                                         bill : bill
                                         }),
                                    headers : {
                                        'Content-Type' : 'application/json'
                                    }
                                    }).then( () => { 
                                    
                                        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                                        ).then(response =>
                                            {return response.json();}
                                        ).then(data => {
                                            const keyAll =Object.keys(data);
                                            for ( const key in keyAll ){
                                                  
                                                if(data[keyAll[key]].email==='AnasAttoum.12321@gmail.com'){
                                                    keysAnas = keyAll[key];
                                                    money = data[keyAll[key]].money + anasMoney;
                                                }
                                            }
                                            fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysAnas}.json`,
                                                {
                                                method : 'PATCH',
                                                body : JSON.stringify({ money : money }),
                                                headers : {
                                                    'Content-Type' : 'application/json'
                                                }
                                                }).then(()=>{


                                                    fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
                                        ).then(response =>
                                            {return response.json();}
                                        ).then(data => {
                                            const keyAll =Object.keys(data);
                                            for ( const key in keyAll ){
                                                  
                                                if(data[keyAll[key]].email==='mayyarshanwar395@gmail.com'){
                                                    keysMayyar = keyAll[key];
                                                    money = data[keyAll[key]].money + mayyarMoney;
                                                }
                                            }
                                            fetch(`https://freelance-work-fde92-default-rtdb.firebaseio.com/Members/${keysMayyar}.json`,
                                                {
                                                method : 'PATCH',
                                                body : JSON.stringify({ money : money }),
                                                headers : {
                                                    'Content-Type' : 'application/json'
                                                }
                                                }).then(()=>{
                                                    //send email when sending money
                                                    
                                                        
                                                    sendForm('service_bwbpl28', 'template_ly3fr7c', form.current, 'Ralqsj8R7HzqjR-DE')
                                                    .then((result) => {
                                                    //   console.log(result.text);
                                                        setOpen(false);
                                                    }, (error) => {
                                                    //   console.log(error.text);
                                                    });
                                                    setOpen(false);
                                                });
                                            });
                                                });
            
                                        
                                    } );
                            });
                        });
                        }
                    }
                });
            }
        });
    
    });
        // setOpen(false);
      };
    //   console.log(foundEmail)

    // Range in send money
    const [range, setRange] = React.useState(0);

    const handleChange = (event) => {
      setRange(event.target.value);
    };

    //Table in sending money
    // function createData(from ,to, amount) {
    //     return {from ,to, amount };
    //   }
    //   const rows = [
        
    //   ];
   
    // while(bill!=''){

    //     from = bill.substring(0,bill.indexOf('to'));
    //     to = bill.substring(bill.indexOf('to')+2,bill.indexOf('amount'));
    //     amount = bill.substring(bill.indexOf('amount')+6,bill.indexOf('+'));

    //     // rows.push(createData( from, to, amount))
    //     rows.push(createData( 4, 2, 5));
    //     console.log(from)
    //     console.log(to)
    //     console.log(amount)


    //     setBill(bill.substring(bill.indexOf('+')+1));
    // }

    
              
      
    return(
        <header className={classes.header}>
            {/* <h1 className={classes.IntroNavigation} >Find Work With Me</h1> */}

             {/* <button className={classes.homebtn}><a href="#">Home</a></button> */}

             {/* <div className={classes.jobsdropdown}>
                 <button className={classes.jobsbtn}>Jobs</button>
                <div className={classes.jobsContent}>
                     <a href="#Tailor" onClick={filterhandler} id='tailor'>Tailor</a>
                     <a href="#Painter" onClick={filterhandler}>Painter</a>
                     <a href="#TaxiDriver"onClick={filterhandler}>Taxi driver</a>
                     <a href="#Carpenter"onClick={filterhandler}>Carpenter</a>
                 </div>
             </div> */}

              {/* <div className={classes.orderdropdown}>
        //         <button className={classes.orderbtn}>Orders</button>
        //         <div className={classes.orderContent}>
        //             <a href="#">1 Worker</a>
        //             <a href="#">2-5 Workers</a>
        //             <a href="#">More</a>
        //         </div>
        //     </div> */}

        {/* //     <div className={classes.dropdown}>
        //         <button className={classes.dropbtn}>Contact US</button>
        //         <div className={classes.dropdownContent}>
        //             <a href="#">Facebook</a>
        //             <a href="#">Instagram</a>
        //         </div>
        //     </div> */}

            
        {/* //     <button className={classes.aboutUs} onClick={about}>About US</button> */}

            <span className={classes.money} onClick={handleClickOpen}>your balance<br/>{money} S.P.</span>
            {/* {console.log(money)} */}

            <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor:'#c571a9'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose2}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Send money to someone
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Send
            </Button>
          </Toolbar>
        </AppBar>
        <List>
            <span style={{color:'#c571a9',fontSize:'12px'}}>Note: The money is sent after deducting 4 percent of it and sending it to the site’s account (that is, deducting 40 Syrian pounds for every 1000 Syrian pounds).</span>
          <ListItem button>
          <ListItemText
              primary="Please select the amount you want to send" style={{marginRight:'40%'}}
            />
                 <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{position:'relative',width:'15%'}}>
                    <InputLabel id="demo-simple-select-standard-label">amount of money</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={range}
                    onChange={handleChange}
                    label="amount of money"
                    >
                    <MenuItem value={1000}>1 000 S.P.</MenuItem>
                    <MenuItem value={5000}>5 000 S.P.</MenuItem>
                    <MenuItem value={10000}>10 000 S.P.</MenuItem>
                    <MenuItem value={20000}>20 000 S.P.</MenuItem>
                    <MenuItem value={30000}>30 000 S.P.</MenuItem>
                    <MenuItem value={40000}>40 000 S.P.</MenuItem>
                    <MenuItem value={50000}>50 000 S.P.</MenuItem>
                    <MenuItem value={60000}>60 000 S.P.</MenuItem>
                    <MenuItem value={70000}>70 000 S.P.</MenuItem>
                    <MenuItem value={80000}>80 000 S.P.</MenuItem>
                    <MenuItem value={90000}>90 000 S.P.</MenuItem>
                    <MenuItem value={100000}>100 000 S.P.</MenuItem>
                    </Select>
                </FormControl>
          </ListItem>
          <Divider />
          <ListItem button>
          <ListItemText primary="Please enter the email address of the person you want to send money to"  />
                <TextField id="standard-basic" label="Recipient's email" variant="standard" inputRef={recEmail} style={{position:'relative',width:'40%'}}/>
          </ListItem>
          
            
          <p style={{color:'red', fontWeight:'900'}} id='error'></p>
        </List>
        <Divider />

        {/* Table */}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell style={{color:'#c571a9'}}>From</TableCell>
                <TableCell style={{color:'#c571a9'}} align="center">To</TableCell>
                <TableCell style={{color:'#c571a9'}} align="right">the amount</TableCell>
            </TableRow>
            </TableHead>
            <TableBody id='table'>
            {/* {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" id='from'>
                    {row.from}
                </TableCell>
                <TableCell align="right" id='to'>{row.to}</TableCell>
                <TableCell align="right" id='amount'>{row.amount}</TableCell>
                </TableRow>
            ))} */}
            {fin}
            </TableBody>
        </Table>
        </TableContainer>

      </Dialog>

    <form ref={form}>
        <input type="hidden" name="to" value={rec}/>
        <input type="hidden" name="amount" value={range}/>
        <input type="hidden" name="from" value={localStorage.getItem('email')}/>
        <input type="hidden" name="name" value={localStorage.getItem('name')}/>
    </form>
      
    </div>
            

        </header>
    );
}
export default Navigation;