import React from 'react';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { Link } from "react-router-dom";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CommentIcon from '@material-ui/icons/Comment';
import "../news.css";
export default function Section({title,allnews}) {
    return (
        <div className="section" >
            <h1 className="sectionTitle">{title.toUpperCase()}</h1>
            <div className="sectionBody">
              {
                  allnews.map((news)=>{
                      return <News 
                      key={news.id}
                      id={news.id} 
                      author={news.by}
                      title={news.title}
                      url={news.url}
                      score={news.score}
                      time={news.time}
                      descendants={news.descendants}
                      kids = {news.kids}
                       />
                  })
              }
            </div>
        </div>
    )
}

function getTime(unix){
     var a = new Date(unix * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;

    }

function News({id,author,title,url,score,time,descendants,kids}) {
    return (
	 <div className="news">
          <Link style={{textDecoration: 'none'}} to={`/news/${id}`}>
          <div className="newstitle">
          <FiberManualRecordIcon fontSize="small"  style={{color:"grey",width:"10px",marginRight:"5px"}}/>
          <h3 style={{color:"#944803"}}>{title}</h3>
          </div>
          </Link>

          <div className="newsbottom">
          <div className="like">
           <ThumbUpAltOutlinedIcon fontSize="small" style={{marginTop:"3px"}} /><p> {score}</p>
           </div>
           <div className="like">
           <CommentIcon fontSize="small" style={{marginTop:"3px"}} /><p> {descendants}</p>
           </div>
           <p>by: {author}</p>
           <p>posted on :{getTime(time)}</p>
           
          </div>
    </div>
    );
}