import "./style.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
const UserBlogCard = () => {
  const [option, setOption] = useState(false);
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
            <i
              class="fa-solid fa-ellipsis"
              onClick={() => setOption(!option)}
            ></i>
          </div>
          {option && (
            <div className="option_card_blog">
              <h3>Edit</h3>
              <h3>Update</h3>
            </div>
          )}
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
};
export default UserBlogCard;
