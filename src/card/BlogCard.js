import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import "./main.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../redux/slice/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import { format } from "date-fns";
const BlogCard = ({ item, index, update, setUpdate, loveBlog }) => {
  const [love, setLove] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const handleLove = async () => {
    try {
      dispatch(isLoading());
      console.log({
        blogID: item?.blogID,
        accountID: auth?.user?.id,
        id: currentID,
      });
      const res = await axios.post(
        `/api/blog/save`,
        {
          blogID: item?.blogID,
          accountID: auth?.user?.id,
          id: currentID,
        },
        {
          headers: { token: auth?.user?.token },
        }
      );
      dispatch(isSuccess());
      console.log(res?.data);
      setLove(!love);
      if (currentID) {
        setCurrentID(null);
      } else {
        setCurrentID(res?.data?.id);
      }
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  const handleBlogDetail = () => {
    navigate(`/blog/${item?.blogID}`);
  };
  useEffect(() => {
    const check = loveBlog?.find((ite) => ite?.blogID === item?.blogID);
    if (check) {
      setLove(true);
      setCurrentID(check?.id);
    } else {
      setLove(false);
    }
    console.log(loveBlog);
  }, [loveBlog]);
  const handleWatchProfile = () => {
    navigate(`/profile/${item?.accountID}`);
  };
  return (
    <div className="blog_card" key={index}>
      <div className="blog_card_body">
        <div className="blog_card_body_top">
          <div>
            <img src={item?.image} />
            <h2 onClick={handleWatchProfile} style={{ cursor: "pointer" }}>
              {item?.name}
            </h2>
          </div>
          <div>
            <span>{item?.courseType?.courseTypeName}</span>
            <div
              style={{
                fontSize: "1rem",
                padding: "6px",
                backgroundColor: "#f2f2f2",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              {item?.courseType}
            </div>
            <div onClick={handleLove}>
              {love ? (
                <i class="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </div>
          </div>
        </div>
        <div className="blog_card_body_content">
          <div
            className="blog_card_body_content_header"
            onClick={handleBlogDetail}
            style={{ cursor: "pointer" }}
          >
            <h3 className="blog_card_name_content_name">{item?.blogName}</h3>
          </div>
          <div className="blog_card_body_content_mid">
            <p className="blog_meta_card_contanert">{item?.blogMeta}</p>
          </div>
          <div
            className="date"
            style={{
              marginTop: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "800",
              }}
            >
              Create At : {format(new Date(item?.createDate), "dd-MM-yyyy")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
