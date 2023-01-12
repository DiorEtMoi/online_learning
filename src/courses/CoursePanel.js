import React, { useState } from "react";
import PanelCard from "./PanelCard";
import "./style.scss";
const CoursePanel = () => {
    const [panel, setPanel] = useState(false);
    const [editPanel, setEditPanel] = useState(false);
    return (
        <div className="CoursePanel_wrap">
            <div
                onClick={() => {
                    setPanel(!panel);
                }}
                className="CoursePanel_container"
            >
                <div className="CoursePanel_head">
                    <i
                        style={{
                            marginRight: "1rem",
                            fontSize: "1.5rem",
                            color: "#F3744F",
                        }}
                        className={
                            !panel ? "fa-solid fa-plus" : "fa-solid fa-minus"
                        }
                    ></i>
                    1.Khái niệm kỹ thuật cần biết
                </div>
                <div className="CoursePanel_body">3 bài học</div>
            </div>
            {panel && (
                <div>
                    <PanelCard />
                    <PanelCard />
                    <PanelCard />
                </div>
            )}
            <div className="CoursePanel_edit">
                <div
                    onClick={() => {
                        setEditPanel(!editPanel);
                    }}
                >
                    <i className="fa-solid fa-ellipsis"></i>
                    {editPanel && (
                        <ul className="CoursePanel_editPanel">
                            <li>Sửa</li>
                            <li>Xóa</li>
                            <li>Thêm trước</li>
                            <li>Thêm sau</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePanel;