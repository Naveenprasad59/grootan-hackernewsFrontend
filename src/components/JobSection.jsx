import React from 'react';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { Link } from "react-router-dom";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import "../news.css";
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function JobSection({title,alljobs,type}) {
    return (
        <div className="section" >
            <h1 className="sectionTitle">{title.toUpperCase()}</h1>
            <div className="sectionBody">
              {
                  alljobs.map((job)=>{
                      return <Job
                      key={job.id}
                      id={job.id} 
                      employer={job.by}
                      title={job.title}
                      url={job.url}
                      score={job.score}
                      time={job.time}
                      type={type}
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

function Job({id,employer,title,url,score,time,type}) {
    const classes = useStyles();
    var btnText = "Apply";
    if(type === "show"){
        btnText = "View";
    }
    return (
	 <div style={{margin:"10px"}} className="news">
          {/* <Link style={{textDecoration: 'none'}} to={`/news/${id}`}> */}
          <div className="newstitle">
          <FiberManualRecordIcon fontSize="small"  style={{color:"grey",width:"10px",marginRight:"5px"}}/>
          <h3 style={{color:"#944803"}}>{title}</h3>
          </div>
          {/* </Link> */}
          <div className="newsbottom">
          <div className="like">
           <ThumbUpAltOutlinedIcon fontSize="small" style={{marginTop:"3px"}} /><p> {score}</p>
           </div>
           <div className="likes">
           </div>
           <p>by: {employer}</p>
           <p>posted on :{getTime(time)}</p>
          </div>
          <Button onClick={()=>{
            //   alert("open another page"); 
          }} href={url} target="_blank" style={{width:"10%",backgroundColor:"#fab67a",marginLeft:"20px"}}  variant="contained" >
          {btnText}
          </Button>
          
    </div>
    );
}