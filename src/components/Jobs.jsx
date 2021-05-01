import React,{useState,useEffect} from 'react'
import Nav from "./Nav";
import JobSection from "./JobSection";
import axios from "axios";

export default function Jobs() {
    let jobId;
    const [jobs,updateJobs] = useState([]);
    useEffect(()=>{
       if(jobs.length < 10){
       axios.get("https://hacker-news.firebaseio.com/v0/jobstories.json")
       .then((result)=>{
        jobId = result.data.slice(0,10);
        jobId.map((id)=>{
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((result2)=>{
            updateJobs((prevState)=>{
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
            <JobSection title="JOBS" alljobs={jobs}  type="jobs" />
        </div>
    )
}

