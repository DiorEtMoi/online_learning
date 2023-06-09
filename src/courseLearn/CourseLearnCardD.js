import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const CourseLearnCardD = ({ item, index, course, parentID }) => {
	const navigate = useNavigate();

	const [check, setCheck] = useState(false);
	const [checkNew, setCheckNew] = useState(false);

	const { courseid, lessonid } = useParams();

	useEffect(() => {
		if (parentID + 1 < course?.currentLearningPackage) {
			setCheck(true);
		} else if (parentID + 1 === course?.currentLearningPackage) {
			if (index < course?.currentLearningLesson) {
				setCheck(true);
			} else if (index === course?.currentLearningLesson) {
				setCheckNew(true);
			}
		}

		if (course?.currentLearningPackage > 0) {
			if (
				course?.currentLearningLesson ===
					course?.lessonPakages[course?.currentLearningPackage - 1]?.numLesson
						?.length &&
				course?.currentLearningPackage === parentID
			) {
				if (index === 0) {
					setCheckNew(true);
				}
			}
		}
	}, [item]);

	return (
		<div
			onClick={() => {
				if (check || checkNew) {
					navigate(`/learning/${courseid}/${item?.lessonID}`);
				} else {
					toast.error("Please learn a lesson above first.");
				}
			}}
			className={`CourseLearnCardDetail ${
				lessonid * 1 === item?.lessonID ? "active" : ""
			}`}
		>
			<div className="CourseLearnCardDetail_head">
				<div>
					{index + 1}. {item?.title}
				</div>
				<div className="CourseLearnCardDetail_icons">
					<i
						className={`fa-solid ${
							item?.type === "listening"
								? "fa-circle-play"
								: item?.type === "reading"
								? "fa-book"
								: "fa-circle-question"
						}`}
					></i>
				</div>
			</div>
			{check ? (
				<div
					style={
						item?.type === "quiz" && !item?.quizResultDTO?.quizStatus
							? { backgroundColor: "red" }
							: {
									backgroundColor: "#5db85c",
							  }
					}
					className="CourseLearnCardDetail_body"
				>
					{item?.type !== "quiz" && <i className="fa-solid fa-check"></i>}
					{item?.type === "quiz" && item?.quizResultDTO?.quizStatus && (
						<i className="fa-solid fa-check"></i>
					)}
				</div>
			) : checkNew ? (
				<div
					style={{ backgroundColor: "#9AD0F5" }}
					className="CourseLearnCardDetail_body"
				></div>
			) : (
				<div
					style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
					className="CourseLearnCardDetail_body"
				>
					<i className="fa-solid fa-lock"></i>
				</div>
			)}
		</div>
	);
};

export default CourseLearnCardD;
