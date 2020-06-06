import React, { useState, useEffect } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import List from "../../../components/List";

const technologyList = [
  {
    id: "t1",
    title: "Data Science",
  },
  {
    id: "t2",
    title: "Machine Learning",
  },
  {
    id: "t3",
    title: "Artificial Intelligence",
  },
  {
    id: "t4",
    title: "Full Stack Development",
  },
  {
    id: "t5",
    title: "VLSI",
  },
  {
    id: "t6",
    title: "Deep Learning",
  },
  {
    id: "t7",
    title: "Block Chain",
  },
  {
    id: "t8",
    title: "Neural Networks",
  }
];

//Use this method to call api and fetch the list of technologies
const HotTechnologies = () => {
  const [loadedCourses, setLoadedCourses] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses"
        );
        setLoadedCourses(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  return (
    <div>
      <h3 className="section-title">Hot Technologies</h3>
      {technologyList && <List items={technologyList} />}
    </div>
  );
};

export default HotTechnologies;
