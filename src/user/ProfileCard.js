import "./style.scss";

const ProfileCard = () => {
  return (
    <div className="course_card">
      <div className="course_card_img">
        <img src="https://files.fullstack.edu.vn/f8-prod/courses/6.png" />
      </div>
      <div className="course_card_info">
        <h3>F11 vua của web learning</h3>
        <p>
          Học ở đâu để trở thành web developer lương 10k $ vậy ạ, hãy đến với
          F11 nơi lưu trữ mọi kiến thức giúp bạn trở thành lập trình viên giỏi
          nhất
        </p>
      </div>
    </div>
  );
};
export default ProfileCard;
