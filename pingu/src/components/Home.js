import React, { Component } from 'react';
import { Column, Row } from 'simple-flexbox';
import '../App.css';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router'
const home = () => {
let wi =    window.innerWidth;
return <div style={{
    minHeight:'100vh', width:'100%'}}>
    <style>{`
        .gugu:hover{
            background-color: #00e676 !important;
            color: #fff !important;
        }`}
    </style>
    {window.innerWidth>1000 &&
    <img alt="chat" style={{marginLeft:'20%', marginRight:'18%'}} src="https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif"/>}
        {window.innerWidth<1000 &&
    <img alt="chat" style={{width:window.innerWidth, height:window.innerHeight}} src="https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif"/>}
    <h1 style={{fontSize:'750%', marginTop:'-30%', marginLeft:'40%'}} className="logo"><span style={{color:'#43b8ff'}}>pin</span><span style={{color:'#ff6043'}}>gU</span></h1>
    <Link to="/onboard"  style={{ textDecoration: 'none', marginTop:'8%' }}>
    <Button className="gugu" style={{ color:"#43b8ff",borderRadius:'25px', marginLeft:'42%', marginRight:'6px' }}>
     <h1 className="logo gugu" style={{ margin:'0px', marginTop:'5px' }}>OnBoard</h1>
    </Button>
    </Link>
    <Link to="/login"  style={{ textDecoration: 'none', marginTop:'8%' }}>
    <Button className="gugu" style={{color:'#ff6043', borderRadius:'25px', marginLeft:'6px'}}>
    <h1 className="logo gugu" style={{ margin:'0px', marginTop:'5px' }}>Login</h1>
    </Button>
    </Link>
    </div>
}

export default home;