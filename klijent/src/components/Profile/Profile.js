import React, { useState, useEffect } from "react";
import "./Profile.css";
import Map from "./Map";
import Photos from "./Photos";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

function MyProfile() {
  const params = useParams();
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const userid = params.id;
    axios.get("http://localhost:5000/user/" + userid).then((res) => {
      setUser(res.data.user);
      setPhoto(res.data.user.Photo);
      //filtriramo postove koji mi ne trebaju (tudi profil s isprivate postom)
      const filteredPosts = res.data.user.Posts.filter(
        (post) =>
          !post.isprivate || post.userid == localStorage.getItem("userid")
      );
      setPosts(filteredPosts);
    });
  }, [params]);

  const [active, setActive] = useState("photos");

  //vracam span a ne null jer ce triat vrimena da dohvati podatke iz baze
  const handlePhotos = (e) => {
    setActive("photos");
  };
  const handleMap = (e) => {
    setActive("map");
  };

  if (!user) return <h1>Loading</h1>;
  return (
    <div className="profil">
      <div className="profileHeader">
        <div className="osnovni_podaci">
          <img
            className="img"
            alt="profile_picture"
            src={
              photo
                ? `http://localhost:5000/uploads/${photo.name}`
                : "http://localhost:5000/uploads/default.jpg"
            }
          />
          <h1 className="b">{user.username}'s profile</h1>
        </div>

        <div className="buttons">
          <button className="btn Photos" onClick={handlePhotos}>
            Photos
          </button>
          <button className="btn Map" onClick={handleMap}>
            Map
          </button>
        </div>
      </div>

      <div>
        {active === "photos" && <Photos />}
        {active === "map" && <Map posts={posts} />}
      </div>
    </div>
  );
}

export default MyProfile;
