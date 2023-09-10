import React from "react";
// import { useEffect,useState } from 'react';

import { useState, useEffect, useRef } from 'react';
import { Box, Meter } from 'grommet';
import { Chart, Text } from 'grommet';

import MainNavigation from '../Components/Navigation/MainNavigation'
import classes from './AboutUS.Module.css';
import MainFooter from '../Components/Footer/MainFooter'
import Footer from '../Components/Footer/Footer'
import SpeedDialButton from "../Components/SpeedDialButton";
// import Sidebar from '../Components/Sidebar/Sidebar'

function AboutUS(){
    
    const[user,setUser] = useState(0);var cnt1=0;
    const[work,setWork] = useState(0);var cnt2=0;
    const[order,setOrder] = useState(0);var cnt3=0;
    const [value, setValue] = useState(50);var man=0;

    const [dam, setDam] = useState(0);var damCnt=0;
    const [alep, setAlep] = useState(0);var alepCnt=0;
    const [dara, setDara] = useState(0);var daraCnt=0;
    const [deir, setDeir] = useState(0);var deirCnt=0;
    const [hama, setHama] = useState(0);var hamaCnt=0;
    const [has, setHas] = useState(0);var hasCnt=0;
    const [homs, setHoms] = useState(0);var homsCnt=0;
    const [idlib, setIdlib] = useState(0);var idlibCnt=0;
    const [lat, setLat] = useState(0);var latCnt=0;
    const [sway, setSway] = useState(0);var swayCnt=0;
    const [tar, setTar] = useState(0);var tarCnt=0;
    const [raq, setRaq] = useState(0);var raqCnt=0;


    useEffect(()=>{
    
        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Members.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                cnt1++;
                setUser(cnt1);
                if(data[keyAll[key]].gender==='male'){
                    man++;
                }
            }
        }).then(()=>{setValue((man/cnt1)*100)});

        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Orders.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                cnt3++;
                setOrder(cnt3);
            }
        });

        fetch('https://freelance-work-fde92-default-rtdb.firebaseio.com/Works.json'
        ).
        then(response =>
        {return response.json();}
        ).
        then(data => {
            const keyAll =Object.keys(data);
            for ( const key in keyAll ){
                cnt2++;
                setWork(cnt2);
                while(data[keyAll[key]].govChecked!=''){
                    // console.log(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+')))
                    if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Damascus"){
                        damCnt++
                        setDam(damCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Aleppo"){
                        alepCnt++;
                        setAlep(alepCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Daraa"){
                        daraCnt++;
                        setDara(daraCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Deir ez-Zor"){
                        deirCnt++;
                        setDeir(deirCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Hama"){
                        hamaCnt++;
                        setHama(hamaCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Hasaka"){
                        hasCnt++;
                        setHas(hasCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Homs"){
                        homsCnt++;
                        setHoms(homsCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Idlib"){
                        idlibCnt++;
                        setIdlib(idlibCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Latakia"){
                        latCnt++;
                        setLat(latCnt)
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="As-Suwayda"){
                        swayCnt++;
                        setSway(swayCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Tartus"){
                        tarCnt++;
                        setTar(tarCnt);
                    }
                    else if(data[keyAll[key]].govChecked.substring(0,data[keyAll[key]].govChecked.indexOf('+'))==="Raqqa"){
                        raqCnt++;
                        setRaq(raqCnt);
                    }
                    data[keyAll[key]].govChecked = data[keyAll[key]].govChecked.substring(data[keyAll[key]].govChecked.indexOf('+')+1);
                    // console.log(dam)
                }
            }
        })
    },[]);

//   const timer = useRef();
//   clearTimeout(timer.current);
//   timer.current = setTimeout(() => {
//     setValue(value < 100 ? value + 8 : 20);
//   }, 2000);

//   useEffect(
//     () => () => {
//       clearTimeout(timer.current);
//     },
//     [],
//   );


//bar
const LabelledChart = ({ color, label, value }) => (
    <Box flex={true} basis="xsmall" align="center" gap="small">
      <Chart
        bounds={[
          [0, 2],
          [0, 8], //height of the bar
        ]}
        type="bar"
        values={[{ value: [1, value] }]}
        color={color}
        round
        size={{ height: 'medium', width: 'xsmall' }}
      />
      <Box align="center">
        <Text color={color}>{label}</Text>
        <Text weight="bold" color={color}>{value} Works</Text>
      </Box>
    </Box>
  );
    
    return(
        <div>
            <MainNavigation />
            
            <img src="Images/Background.png" alt="about Project" className={classes.mainBackGround}/>
            <pre className={classes.title}>
                Your business has become our priority <br/>We are the best way to get a work
            </pre>
            <p className={classes.title2}>Free business management website</p>

            {/* <div className={classes.a}>
                <span className={classes.b}>
                    Your business has become our priority <br/>We are the best way to get a work
                </span>
                <span className={classes.c}>Free business management website</span>
            </div> */}

            <div className={classes.goal}>
                <p className={classes.title3}>Our main goal</p>
                <p className={classes.txt}>Is to manage a freelance website that provides
                 a comfortable environment that allows people to add their expertise and work to facilitate access to them by customers.
                 We also provide the customer with the ability to search and view many professional services and choose from them.
                 </p>
            </div>

            <div className={classes.stat}>
                <img src="Images/pic1.png" className={classes.pic1}/>
                <span className={classes.userNum}>{user}</span>
                <span className={classes.userTxt}>users registered<br/> on the site</span>

                <img src="Images/pic2.png" className={classes.pic2}/>
                <span className={classes.workNum}>{work}</span>
                <span className={classes.workTxt}>jobs available <br/> to clients</span>

                <img src="Images/pic3.png" className={classes.pic3}/>
                <span className={classes.orderNum}>{order}</span>
                <span className={classes.orderTxt}>orders available <br/> to clients</span>
            </div>

            <div>
            <Box align="center" pad="large" flex={true} style={{"position":"relative",'bottom':'-9vw','left':'0vw','width':'500vw','height':'35vw'}}>
                <Meter
                    size="380%"
                    type="circle"
                    background="light-2"
                    // values={[{ value, color: value > 50 ? 'accent-2' : 'accent-1' }]}
                    values={[{ value, color:'#a4e8e0' }]}
                />
            </Box>
            <span className={classes.wo}>Wo</span>
            <span className={classes.man}>Man</span>
            <span className={classes.gender}>Statistics between male and female<br/> users of the site:</span>

            <span className={classes.sqMan}></span>
            <span className={classes.male}>Male {Math.round(value)}%</span>

            <span className={classes.sqWoman}></span>
            <span className={classes.female}>Female {100-Math.round(value)}%</span>

            <img src="Images/male&female.jpg" className={classes.MF}/>
            </div>

            {/* bar */}
            <p className={classes.stat2}>Statistics of the number of jobs available in each governorate in the Syrian Arab Republic</p>
            <Box pad="large" direction="row" gap="small" className={classes.bar} style={{'opacity':'0.65'}}>
                <LabelledChart label="Damascus" value={dam} color="#FF00EB" />
                <LabelledChart label="Aleppo" value={alep} color="#A100FF" />
                <LabelledChart label="Daraa" value={dara} color="#2800FF" />
                <LabelledChart label="Deir ez-Zor" value={deir} color='#00AFFF'/>
                <LabelledChart label="Hama" value={hama} color="#00FF81" />
                <LabelledChart label="Hasaka" value={has} color="#5EFF00" />
                <LabelledChart label="Homs" value={homs} color="#2800FF"/>
                <LabelledChart label="Idlib" value={idlib} color="graph-1" />
                <LabelledChart label="Latakia" value={lat} color="#DDFF00" />
                <LabelledChart label="As-Suwayda" value={sway} color="#FF8B00"/>
                <LabelledChart label="Tartus" value={tar} color="#7B847E" />
                <LabelledChart label="Raqqa" value={raq} color="#B6000C" />
            </Box>

            {/* <Sidebar/> */}
            <SpeedDialButton/>
            <MainFooter/>
            <Footer/>


{/* <p style={{"position":"absolute",'top':'10000px'}}>ss</p> */}
        </div>
    );
}
export default AboutUS;