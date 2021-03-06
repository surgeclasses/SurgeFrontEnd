import React from "react";

import "./CourseList.css";
import CourseItem from "./CourseItem";

const CourseList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Courses Found</h2>
      </div>
    );
  }
  return (
    <ul className="course-list">
      {props.items.map((course) => {

        return (
          <CourseItem
            key={course._id}
            id={course._id}
            title={course.title}
            fee={course.fee}
            isLive={course.isLive}
            description={course.description}
            instructor={course.instructor}
            duration={course.duration}
            startDate={course.startDate}
            discountPercent={course.discountPercent}
            avgRating={course.avgRating}
          />
        );
      })}
    </ul>
  );
};

export default CourseList;
