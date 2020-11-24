import React from 'react'
import { useHistory } from 'react-router-dom'
import CourseCard from './CourseCard'


const  CoursesNavBar=(props)=>{

    const history = useHistory();
    const courseId = props.cid;
    const title=props.title;
    const description=props.description;

    // const coursePath=()=>{
    //     history.push("/CourseDetails/" + courseId);
    // }

    return (
    
        <li>
         <CourseCard>
         <a href={`/CourseDetails/${courseId}`}>
          <h2>{title}</h2>
          <p>{description}</p>
          </a>
         </CourseCard>
        </li>    
    
    )
}

export default CoursesNavBar;
