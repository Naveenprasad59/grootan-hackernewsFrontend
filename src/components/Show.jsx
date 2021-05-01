import React,{useState,useEffect} from 'react'
import Nav from "./Nav";
import JobSection from "./JobSection";
import axios from "axios";

export default function Show() {
    let showId;
    const [show,updateShow] = useState([]);
    useEffect(()=>{
       if(show.length < 10){
       axios.get("https://hacker-news.firebaseio.com/v0/showstories.json")
       .then((result)=>{
        showId = result.data.slice(0,10);
        showId.map((id)=>{
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((result2)=>{
            updateShow((prevState)=>{
                return [...prevState,result2.data];
            })
          });
       })
       })
    }
    },[])
    return (
        <div>
            <Nav />
            <JobSection title="SHOW" alljobs={show} type="show" />
        </div>
    )
}

