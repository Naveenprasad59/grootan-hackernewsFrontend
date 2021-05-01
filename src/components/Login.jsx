import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom';
import Nav from "./Nav";
import "../login.css";
import axios from "axios";
import {UserContext} from "../context/statecontext";
export default function Login() {
    const history = useHistory();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [user,setUser] = useContext(UserContext);

    async function registerUser() {
    axios.post("http://localhost:8000/register",
    {username: username,password: password})
    .then(function(response){
      // console.log(response);
      if(response.data.success){
        setUser(username);
        console.log(user);
        history.push('/');
      }else{
       console.log("not registered");
      }
    }).catch(function(error){
      history.push('/login');
    })
   }
    async function HandleRegister(e){
    e.preventDefault();
    console.log("clicked");
    await registerUser();
  }

  async function loginUser() {
    axios.post("http://localhost:8000/login",
    {username: username,password: password})
    .then(function(response){
      // console.log(response);
      // if(response.data.success){
        setUser(username);
        console.log(user);
        history.push('/');
      // }
      // else{
      //  console.log("not logged");
      // }
    }).catch(function(error){
      history.push('/login');
    })
  }

  async function HandleLogin(e){
    e.preventDefault();
    console.log("clicked");
    await loginUser();
  }
    return (
     <div>
     <Nav />
     <div className="login">
      
      <div className="formcontainer">
      <h2>SignIn</h2>
        <form className="form">
          <p><strong>Username</strong></p>
          <input type="email" name="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
          <p><strong>Password</strong></p>
          <input type="password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
          <input type="hidden" name="action" value="login"></input>
          <button  onClick={(e)=>{HandleLogin(e)}}>Login</button>
          <pre>Agree to the terms and condition</pre>
          <button  onClick={(e)=>{HandleRegister(e)}}>Create Account</button>
        </form>
      </div>
     </div>
     </div>
    )
}
