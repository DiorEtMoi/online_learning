import React, { useState } from "react";
import "../userblog/style.scss";
import { Link } from "react-router-dom";
function MarkBlogCard() {
  const [react, setReact] = useState(false);
  return (
    <div className="user_card">
      <Link to="/blog/:slug">
        <div className="user_card_header">
          <img src="https://i.pinimg.com/564x/dd/45/05/dd4505032f143e60c3454d0a44e3ddbc.jpg" />
        </div>
      </Link>
      <div className="user_card_body">
        <div className="user_card_body_top">
          <h3>My Blog Card</h3>
          <div className="user_card_body_top_option">
            <span>Software</span>
            {react ? (
              <i
                class="fa-regular fa-heart"
                onClick={() => setReact(!react)}
              ></i>
            ) : (
              <i class="fa-solid fa-heart" onClick={() => setReact(!react)}></i>
            )}
          </div>
        </div>
        <div className="user_card_body_content">
          <p>
            {" "}
            I’m pretty sure I saw this like a year ago and saved it but I only
            just realized this is phil
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarkBlogCard;