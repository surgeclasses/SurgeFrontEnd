import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./AddCourse.css";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddCourse = () => {
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [loadedInstructors, setLoadedInstructors] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [selectedInstructor, setSelectedInstructor] = useState();
  const [isLive, setIsLive] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [editorState, setEditorState] = useState();

  const [inputList, setInputList] = useState([{ keyFeatures: "" }]);
  const [inputList2, setInputList2] = useState([{ whotoLearn: "" }]);
  const [inputList3, setInputList3] = useState([{ tools: "" }]);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      fee: {
        value: 0,
        isValid: false,
      },
      instructor: {
        value: {
          name: "",
          id: "",
        },
        isValid: false,
      },
      duration: {
        value: 0,
        isValid: false,
      },
      isLive: {
        value: false,
        isValid: true,
      },
      startDate: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const descriptionInputHandler = (e, editor) => {
    setEditorState(editor.getData());
  };

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
        setSelectedTechnology(responseData[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAllInstructors = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/instructor"
        );
        setLoadedInstructors(responseData);
        setSelectedInstructor({
          name: responseData.name,
          id: responseData[0]._id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllInstructors();
    fetchAllTechnologies();
  }, [selectedInstructor, selectedTechnology]);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          fee: formState.inputs.fee.value,
          technology: selectedTechnology,
          description: editorState,
          instructor: selectedInstructor,
          duration: formState.inputs.duration.value,
          isLive: isLive,
          startDate: formState.inputs.startDate.value,
          keyFeatures: inputList ,
          whotoLearn: inputList2,
          tools:inputList3,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/AddCourse");
    } catch (err) {
      console.log(err);
    }
  };

  const techSelectHandler = (event) => {
    setSelectedTechnology(event.target.value);
  };

  const instructorSelectHandler = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const liveChangeHandler = (event) => {
    setIsLive(event.target.checked);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list2 = [...inputList2];
    list2[index][name] = value;
    setInputList2(list2);
  };

  const handleInputChange3 = (e, index) => {
    const { name, value } = e.target;
    const list3 = [...inputList3];
    list3[index][name] = value;
    setInputList(list3);
  };
   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleRemoveClick2 = index => {
    const list2 = [...inputList2];
    list2.splice(index, 1);
    setInputList2(list2);
  };

  const handleRemoveClick3 = index => {
    const list3 = [...inputList3];
    list3.splice(index, 1);
    setInputList3(list3);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { keyFeatures: "" }]);
  };

  const handleAddClick2 = () => {
    setInputList2([...inputList2, { whotoLearn: "" }]);
  };

  const handleAddClick3 = () => {
    setInputList3([...inputList3, { tools: "" }]);
  };

  return (
    <div className="body">
      <h1 className="center">Add A New Course</h1>
      <Modal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            id="fee"
            element="input"
            label="Fee"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course fee."
            onInput={inputHandler}
          />
          <select
            className="selector"
            onChange={techSelectHandler}
            name="technology"
            id="technology"
          >
            {loadedTechnologies &&
              loadedTechnologies.map((technology) => {
                return (
                  <option value={technology._id}>{technology.title}</option>
                );
              })}
          </select>
          <h4 className="center">Description</h4>
          <div className="editor">
            <CKEditor
              editor={ClassicEditor}
              initialValue=""
              onChange={descriptionInputHandler}
            />
          </div>
          <select
            className="selector"
            onChange={instructorSelectHandler}
            name="instructor"
            id="instructor"
          >
            {loadedInstructors &&
              loadedInstructors.map((instructor) => {
                return (
                  <option
                    value={{ name: instructor.name, id: instructor._id }}
                  >
                    {instructor.name}
                  </option>
                );
              })}
          </select>
          <Input
            id="instructor"
            element="input"
            label="Instructor"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid instructor name."
            onInput={inputHandler}
          />
          <Input
            id="duration"
            element="input"
            label="Duration (Hours)"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course duration (in Hours)."
            onInput={inputHandler}
          />
          <input
            id="isLive"
            type="checkbox"
            name="isLive"
            onChange={liveChangeHandler}
          />
          <label for="isLive">Is Course Live</label>
          <Input
            id="startDate"
            element="input"
            label="Start Date"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid starting date."
            onInput={inputHandler}
          />
          <p>KeyFeatures</p>
          {inputList.map((x, i) => {
            return (
              <div className="box">
                <input
                  name="keyFeatures"
                  value={x.keyFeatures}
                  onChange={e => handleInputChange(e, i)}
                />
                <div className="btn-box">
                {inputList.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)}><FaMinus/></button>}
                {inputList.length - 1 === i && <button className="mr101" onClick={handleAddClick}><FaPlus/></button>}
                
                  
                </div>
                
              </div>
            );
          })}
          <p>Who to Learn</p>
          {inputList2.map((x, i) => {
            return (
              <div className="box">
                <input
                  name="whotoLearn"
                  value={x.whotoLearn}
                  onChange={e => handleInputChange2(e, i)}
                />
               
                <div className="btn-box">
                  {inputList2.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick2(i)}><FaMinus/></button>}
                  {inputList2.length - 1 === i && <button className="mr101" onClick={handleAddClick2}><FaPlus/></button>}
                </div>
                
              </div>
            );
          })}
          <p>Tools and Programming Language</p>
          {inputList3.map((x,i) => {
            return (
              <div className="box">
                <input
                  name="tools"
                  value={x.tools}
                  onChange={e => handleInputChange3(e, i)}
                />
               
                <div className="btn-box">
                  {inputList3.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick3(i)}><FaMinus/></button>}
                  {inputList3.length - 1 === i && <button className="mr101" onClick={handleAddClick3}><FaPlus/></button>}
                </div>
             </div>
            );
          })}
          
          <Button type="submit" disabled={!formState.isValid}>
            ADD COURSE
          </Button>
        </form> 
      </div>
    </div>
  );
};

export default AddCourse;
