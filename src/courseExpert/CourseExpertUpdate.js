import React, { useRef, useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import "../admin/style.scss";
import Select from "react-select";
import axios from "axios";
import "./style.scss";
import Listening from "../admin/courseManager/type/Listening";
import Reading from "../admin/courseManager/type/Reading";
import Quiz from "../admin/courseManager/type/Quiz";
import CoursePanelEdit from "../coursePanel/CoursePanelEdit";
const CourseExpertUpdate = () => {
    const titleRef = useRef();
    const contentRef = useRef();
    const benefitRef = useRef();
    const [benefit, setBenefit] = useState([]);
    const [image, setImage] = useState("");
    const [inputForm, setInputForm] = useState(false);
    const [previousLink, setPreviousLink] = useState(false);
    const [lesson, setLesson] = useState([]);
    const imageRef = useRef();
    const lessonRef = useRef();
    const [addLesson, setAddLesson] = useState(false);

    const [course, setCourse] = useState({
        title: "Test",
    });

    const [urlArray, setUrlArray] = useState([]);

    const [numberOfLesson, setNumberOfLesson] = useState({
        num: 0,
        time: 0,
    });
    const urlArrayRef = useRef([]);

    const [type, setType] = useState("listening");

    const handleCreateBenefit = () => {
        if (!benefitRef.current.value) {
            return toast.error("Please, enter information.");
        }
        setBenefit([...benefit, benefitRef.current?.value]);
        benefitRef.current.value = "";
    };

    const handleCreateLesson = () => {
        setLesson([
            ...lesson,
            {
                lessonTitle: lessonRef.current.value,
                numLesson: [],
            },
        ]);
        lessonRef.current.value = "";
    };

    const handleEditList = (e) => {};
    const handleDeleteList = (e) => {
        benefit.splice(e, 1);
        setBenefit([...benefit]);
    };
    const optionsKind = [
        { value: "ha-noi", label: "Software" },
        { value: "strawberry", label: "Financial" },
        { value: "vanilla", label: "Marketing" },
    ];

    const onDrop = useCallback((acceptedFiles) => {
        const url = URL.createObjectURL(acceptedFiles[0]);
        if (image) {
            URL.revokeObjectURL(image);
        }
        imageRef.current = acceptedFiles[0];
        setImage(url);
    }, []);

    useEffect(() => {
        let coun = 0;
        let tim = 0;
        lesson?.forEach((item) => {
            coun += item?.numLesson?.length;
            item?.numLesson?.forEach((item) => {
                if (item?.type === "listening") {
                    tim += item?.time;
                }
            });
        });
        setNumberOfLesson({
            num: coun,
            time: tim,
        });
    }, [lesson]);

    useEffect(() => {
        console.log(lesson);
    }, [lesson]);

    const handleCreateNewCourse = async () => {
        try {
            const data = await axios.post("/api/course/create", {
                ...lesson,
            });
            console.log(data?.data);
        } catch (err) {}
    };

    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="managerCourse">
            <div className="row">
                <div className="col c-12 m-8 l-8">
                    <div className="course_detail_name">
                        <h3 ref={titleRef}>{course?.title}</h3>
                    </div>
                    <div className="course_detail_content">
                        <p ref={contentRef}>Description of course (can edit)</p>
                    </div>
                    <div className="course_detail_learn">
                        <h3>The benefits of this course:</h3>
                    </div>
                    <ul className="course_detail_learn_items">
                        {benefit?.length === 0 ? (
                            <li className="benefitList">
                                Example of benefit of this course
                            </li>
                        ) : (
                            benefit?.map((item, index) => (
                                <li
                                    className="benefitList"
                                    key={item + "benefit"}
                                >
                                    {item}
                                    <div className="benefit_button">
                                        <button
                                            onClick={() =>
                                                handleEditList(index)
                                            }
                                            className="edit_button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteList(index)
                                            }
                                            className="delete_button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="course_detail_learn">
                        <h3>Content of this course</h3>
                    </div>
                    <div className="course_detail_timeLine">
                        <ul>
                            <li>
                                <b>{lesson?.length}</b> Pakages
                            </li>
                            <li>.</li>
                            <li>
                                <b>{numberOfLesson?.num}</b> Lessons
                            </li>
                            <li>.</li>
                            <li>
                                Times{" "}
                                <b>{`${
                                    Math.floor(numberOfLesson?.time / 3600) < 10
                                        ? "0"
                                        : ""
                                }${Math.floor(numberOfLesson?.time / 3600)} :
                    
                    ${
                        Math.floor(numberOfLesson?.time / 3600) > 0
                            ? `${
                                  Math.floor(numberOfLesson?.time / 60) -
                                      Math.floor(numberOfLesson?.time / 3600) *
                                          60 <
                                  10
                                      ? "0"
                                      : ""
                              }${
                                  Math.floor(numberOfLesson?.time / 60) -
                                  Math.floor(numberOfLesson?.time / 3600) * 60
                              }`
                            : `${
                                  Math.floor(numberOfLesson?.time / 60) < 10
                                      ? "0"
                                      : ""
                              }${Math.floor(numberOfLesson?.time / 60)}`
                    } : ${
                                    Math.floor(numberOfLesson?.time) -
                                        Math.floor(numberOfLesson?.time / 60) *
                                            60 <
                                    10
                                        ? "0"
                                        : ""
                                }${
                                    Math.floor(numberOfLesson?.time) -
                                    Math.floor(numberOfLesson?.time / 60) * 60
                                }`}</b>
                            </li>
                        </ul>
                    </div>
                    <div className="CoursePanel">
                        {lesson?.map((item, index) => (
                            <CoursePanelEdit
                                setUrlArray={setUrlArray}
                                urlArray={urlArray}
                                urlArrayRef={urlArrayRef.current}
                                setLesson={setLesson}
                                setAddLesson={setAddLesson}
                                lesson={lesson}
                                key={index + "coursePanel"}
                                item={item}
                                index={index}
                            />
                        ))}
                        {inputForm && (
                            <div className="CoursePanel_wrap">
                                <div className="CoursePanel_create_input">
                                    <input
                                        ref={lessonRef}
                                        type="text"
                                        placeholder="Enter title"
                                    />
                                    <button onClick={handleCreateLesson}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="CoursePanel_wrap">
                            <div className="CoursePanel_create_container">
                                <div
                                    onClick={() => {
                                        setInputForm(!inputForm);
                                    }}
                                    title="Add more"
                                    className="plus"
                                >
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col c-12 m-4 l-4">
                    <div className="course_create_detail_img">
                        <div className="movie_drop_zone">
                            <div className="image_create_container_wrap">
                                <img src="https://anhcuoiviet.vn/wp-content/uploads/2022/11/background-dep-0.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="course_detail_price">$ 120</div>
                    <div className="course_detail_button">
                        <button
                            onClick={handleCreateNewCourse}
                            title="Save this course"
                            className="save_button"
                        >
                            Save
                        </button>
                    </div>
                    <div className="type_select">
                        <Select
                            className="search_wrap_select"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={optionsKind}
                            placeholder="Kind"
                        />
                    </div>
                    <ul className="course_detail_list">
                        <li>
                            <i>
                                Course Expert:
                                <span className="choose_expert">
                                    Minh Quang
                                </span>
                            </i>
                        </li>
                        <li>
                            <i>Tự tin khi học tập</i>
                        </li>
                    </ul>
                </div>
            </div>

            {addLesson && (
                <div className="lessonCreate">
                    <div className="lessonCreate_wrap">
                        <div className="expertCourse_close">
                            <div
                                onClick={() => {
                                    setAddLesson("");
                                    setType("listening");
                                }}
                                className="expertCourse_close_icons"
                            >
                                &times;
                            </div>
                        </div>
                        <div className="lessonCreate_title">Create Lesson</div>
                        <div className="lessonCreate_type">
                            <div className="lessonCreate_type_form">
                                {type === "listening" ? (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("listening");
                                            }
                                        }}
                                        id="listening"
                                        type="radio"
                                        name="lesson"
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("listening");
                                            }
                                        }}
                                        id="listening"
                                        type="radio"
                                        name="lesson"
                                    />
                                )}
                                <label htmlFor="listening">Listening</label>
                            </div>
                            <div className="lessonCreate_type_form">
                                {type === "reading" ? (
                                    <input
                                        id="reading"
                                        type="radio"
                                        name="lesson"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("reading");
                                            }
                                        }}
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        id="reading"
                                        type="radio"
                                        name="lesson"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("reading");
                                            }
                                        }}
                                    />
                                )}
                                <label htmlFor="reading">Reading</label>
                            </div>
                            <div className="lessonCreate_type_form">
                                {type === "quiz" ? (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("quiz");
                                            }
                                        }}
                                        id="quiz"
                                        type="radio"
                                        name="lesson"
                                        defaultChecked
                                    />
                                ) : (
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setType("quiz");
                                            }
                                        }}
                                        id="quiz"
                                        type="radio"
                                        name="lesson"
                                    />
                                )}
                                <label htmlFor="quiz">Quiz</label>
                            </div>
                        </div>
                        <div className="lessonCreate_form">
                            {type === "listening" && (
                                <Listening
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                />
                            )}
                            {type === "reading" && (
                                <Reading
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                    urlArray={urlArray}
                                    setUrlArray={setUrlArray}
                                    urlArrayRef={urlArrayRef.current}
                                />
                            )}
                            {type === "quiz" && (
                                <Quiz
                                    setLesson={setLesson}
                                    lesson={lesson}
                                    addLesson={addLesson}
                                    setAddLesson={setAddLesson}
                                    setType={setType}
                                />
                            )}
                        </div>
                    </div>
                    {type === "reading" && (
                        <div
                            onClick={() => {
                                setPreviousLink(true);
                            }}
                            className="previousLink"
                        >
                            Previous Upload File Link
                        </div>
                    )}
                    {type === "reading" && previousLink && (
                        <div className="lessonCreate previousLink_form">
                            <div className="previousLink_wrap">
                                <div className="expertCourse_close">
                                    <div
                                        onClick={() => {
                                            setPreviousLink(false);
                                        }}
                                        className="expertCourse_close_icons"
                                    >
                                        &times;
                                    </div>
                                </div>
                                <div className="previousLink_list">
                                    <ul>
                                        {urlArrayRef.current?.map(
                                            (item, index) => (
                                                <li key={index + "listArray"}>
                                                    <a href="#">{item}</a>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseExpertUpdate;