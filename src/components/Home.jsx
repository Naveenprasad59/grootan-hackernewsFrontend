import React,{useEffect,useState} from 'react'
import Nav from './Nav';
import Section from './Section';
import "../home.css";
import axios from "axios";

export default function Home() {
    let topId;
    // let topIdNews;
    const [topIdNews,setTopNews] = useState([]);
    const [bestIdNews,setBestNews] = useState([]);
    const [newIdNews,setnewNews] = useState([]);
    useEffect(()=>{
       if(topIdNews.length < 10){
       axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
       .then((result)=>{
        topId = result.data.slice(0,10);
        topId.map((id)=>{
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((result2)=>{
            setTopNews((prevState)=>{
                return [...prevState,result2.data];
            })
          });
       })
       })
    }
    if(newIdNews.length < 10){
        axios.get("https://hacker-news.firebaseio.com/v0/newstories.json")
       .then((result)=>{
        topId = result.data.slice(0,5);
        topId.map((id)=>{
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((result2)=>{
            setnewNews((prevState)=>{
                return [...prevState,result2.data];
            })
          });
       })
       })
    }
    if(bestIdNews.length < 10){
        axios.get("https://hacker-news.firebaseio.com/v0/beststories.json")
       .then((result)=>{
        topId = result.data.slice(0,5);
        topId.map((id)=>{
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((result2)=>{
            setBestNews((prevState)=>{
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
            <div className="firstStory">
            {/* <Card style={{padding:"50px"}}> */}
            <Section key={1} title={"Top Stories"} allnews={topIdNews} />
            {/* </Card> */}
            <div  className="nextStory">
            {/* <Card style={{margin:"20px"}}> */}
            <Section key={2} title={"Best Stories"} allnews={bestIdNews} />
            {/* </Card> */}
            {/* <Card> */}
            <Section key={3} title={"Current Stories"} allnews={newIdNews} />
            {/* </Card> */}
            </div>
            </div>
        </div>
    )
}
