import React,{useEffect,useState} from 'react'
import axios from "axios";
import Nav from "./Nav";
import "../indinews.css";
import Comment from "./Comment";

function getTime(unix){
     var a = new Date(unix * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' ;
//   + hour + ':' + min + ':' + sec ;
  return ' '+time;

    }

export default function News({match}) {
    const [news,updatenews] = useState({});
    const [comments,updateComments] = useState([]);
    useEffect(()=>{
       axios.get(`https://hacker-news.firebaseio.com/v0/item/${match.params.id}.json?print=pretty`)
       .then((result)=>{
           console.log(result.data);
           updatenews({...result.data});
           const commentIds = result.data.kids;
           commentIds.map((ids)=>{
               axios.get(`https://hacker-news.firebaseio.com/v0/item/${ids}.json?print=pretty`)
               .then((res2)=>{
                   console.log(res2.data);
                   updateComments((prev)=>{
                       return [...prev,res2.data];
                   })
               })
           })
       });
       
    },[])
    
    return (
        <div>
             <Nav />
            <div className="news">
            <h2 style={{textAlign: "center"}}>{news.title}</h2>
            <div className="newsdata">
                <p>Liked by : <strong>{news.score}</strong> people</p>
                <div className="subnewsdata">
                <p>by<strong> {news.by} </strong> on </p>
                <p>{getTime(news.time)}</p>
                </div>
            </div>
            <div className="comments">
            <p style={{textAlign: "center",margin:"15px"}}>To Read more : <a  href={news.url} target="_blank">{news.title}</a></p>
             <h3>Comments({comments.length})</h3>
             <div className="comments2">
            {comments.map((comment)=>{
                return comment.text?<Comment key={comment.id} id={comment.id} comment={comment.text.slice(0,100)} author={comment.by} time={getTime(comment.time)} />:null;
            })}
            </div>
            </div>
            </div>
    </div>
    )
}
