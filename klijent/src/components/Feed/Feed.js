import { useState, useEffect } from "react";
import Posts from "./Posts";
import axios from "axios";
import "./Feed.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMapPin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const button_style = {
  zIndex: 1,
};

function Feed() {
  const [isOpen, setIsOpen] = useState(false);
  const [postsInfo, setPostsinfo] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/feed").then((res) => {
      const allUsersAndPosts = res.data;
      const Posts = [];
      allUsersAndPosts.map((user) => {
        user.Posts.map((post) => {
          post["username"] = user.username;
          post["userId"] = user.id;
          post["profilePicture"] = user.Photo.name;
          Posts.push(post);
        });
      });
      console.log(Posts);
      const filteredPosts = Posts.filter(
        (post) =>
          !post.isprivate || post.userId == localStorage.getItem("userid")
      );
      filteredPosts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      console.log(Posts);
      setPostsinfo(filteredPosts);
    });
  }, []);

  return (
    <div>
      <div style={button_style} className="btnWrapper">
        <button className="modalBtn" onClick={() => setIsOpen(true)}>
          +
        </button>
      </div>
      <Posts open={isOpen} onClose={() => setIsOpen(false)}>
        New post
      </Posts>
      <div className="feedPosts">
        {postsInfo &&
          postsInfo.map((postinfo) => (
            <div key={postinfo.id} className="postWrapper">
              <div className="profileImageDiv">
                <NavLink to={`user/${postinfo.userId}`}>
                  <img
                    className="profileImage"
                    src={`http://localhost:5000/uploads/${postinfo.profilePicture}`}
                    alt="profile image of user"
                  />
                </NavLink>
              </div>
              <div className="postUsername">{postinfo.username}</div>
              <div className="postTitle">{postinfo.title}</div>
              <div>
                <FaMapPin className="locationIcon" />
                {postinfo.location}
              </div>
              <div className="postPhotos">
                <Carousel showArrows={true} showStatus={false}>
                  {postinfo.Postphotos.map((postphotos) => (
                    <div key={postphotos.id} className="singlePostPhoto">
                      <img
                        className="singlePostPhotoImage"
                        src={`http://localhost:5000/uploads/${postphotos.name}`}
                        alt="post photos"
                      ></img>
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="postDescription">{postinfo.description}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default Feed;
