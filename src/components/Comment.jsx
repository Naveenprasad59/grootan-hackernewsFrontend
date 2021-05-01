import React from 'react'
import { Link } from "react-router-dom";
export default function Comment({id,comment,author,time}) {
    return (
        <div className="comment">
            <p style={{fontSize:"20px"}}>{comment}<Link to={`/comments/${id}`}>...Read More</Link></p>
            <div className="commentbody">
             <p>{author}</p>
             <p>commented on {time}</p>
            </div>
        </div>
    )
}
