import React,{useEffect,useState} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Comment from "./Comment"

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
  return ' '+time;

    }
export default function Singlecomment({match}) {
    const [postTitle,setpost] = useState("");
    const [comment,setComment] = useState({});
    const [subcomments,setSubComment] = useState([]);
    useEffect(()=>{
       axios.get(`https://hacker-news.firebaseio.com/v0/item/${match.params.id}.json?print=pretty`)
       .then((result)=>{
          setComment(result.data);
           console.log(result.data);
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${result.data.parent}.json?print=pretty`)
          .then((res)=>{
              console.log(res.data);
            setpost(res.data.title);
          })
          result.data.kids?result.data.kids.map((sub)=>{
              axios.get(`https://hacker-news.firebaseio.com/v0/item/${sub}.json?print=pretty`)
              .then((result2)=>{
                  setSubComment((prev)=>{
                      return [...prev,result2.data];
                  })
                  console.log(result2.data);
              })
          }):console.log("No comments");
       })
    },[])
    return (
        <div className="indicomments">
            <Link to={`/news/${comment.parent}`}><p>Stories Title {postTitle}</p></Link>
            <p>Comment :{comment.text}</p>
            <p>Commented by: <strong>{comment.by}</strong></p>
            {comment.kids?<p><strong>SubComments ({subcomments.length})</strong></p>:<p><strong>No sub Comments</strong></p>}
            <div className="commentsub">
            {comment.kids?subcomments.map((comments,i)=>{
               return <Comment key={i} id={comments.id} comment={comments.text} author={comments.by} time={getTime(comments.time)}/>
            }):null}
            </div>
        </div>
    )
}
