import React,{useContext} from 'react'
import "../nav.css";
import { Link } from "react-router-dom";
import {UserContext} from "../context/statecontext";

export default function Nav() {
    const [user,setUser] = useContext(UserContext);
    const userName = user===""?"SignIn":user;
    return (
        <div className="navbar">
        <Link to="/">
         <img className="banner-image" src="https://miro.medium.com/max/1200/1*Odj6BW8rfq-gExKp_rJrdA.png" alt="image" />
         </Link>
         <h1 className="head" style={{color: "white"}}>TECH NEWS</h1>
         <div className="rightchildren">
         <Link style={{textDecoration:'none'}} to="/jobs">
           <NavElements key={1} title={"Jobs"} />
         </Link>
         <Link style={{textDecoration:'none'}} to="/show">
           <NavElements key={2} title={"Show"} />
         </Link>
         <Link style={{textDecoration:'none'}} to="/login">
           <NavElements key={2} title={userName} />
         </Link>
         </div>
        </div>
    )
}

function NavElements({title}){
    return (
         <h3 style={{color: "white"}} className="navrightelement"><strong>{title}</strong></h3>
    );
}
