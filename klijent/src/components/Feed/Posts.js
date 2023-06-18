import { useState } from "react";
import "./Posts.css";
import ReactDom from "react-dom";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";

const overlay_style = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};
const modal_style = {
  position: "fixed",
  width: "500px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "FFF",
  padding: "50px",
  zIndex: 1000,
};
const Posts = ({ open, children, onClose }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const sendData = (e) => {
    e.preventDefault();
    //jer mi interceptor ne radi
    let config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    //formdata sluzi zbog uploadanja slika
    let formdata = new FormData();
    formdata.append("location", location);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("lat", lat);
    formdata.append("lng", lng);
    formdata.append("isprivate", isPrivate);

    for (const key of Object.keys(file)) {
      formdata.append("pictures", file[key]);
    }

    axios
      .post("http://localhost:5000/post", formdata, config)
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (err) {});
  };
  const onClose2 = () => {
    setIsPrivate(false);
    onClose();
  };
  const changeHandler = (e) => {
    let selected = e.target.files;
    setFile(selected);
  };
  const ChangePrivacy = () => {
    setIsPrivate(!isPrivate);
  };
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={overlay_style} />
      <div style={modal_style} className="posts">
        {children}
        <form encType="multipart/form-data">
          <label>Post title:</label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Location:</label>
          <Autocomplete
            apiKey={process.env.API_KEY}
            onPlaceSelected={(place) => {
              setLocation(place.formatted_address);
              setLat(place.geometry.location.lat());
              setLng(place.geometry.location.lng());
            }}
          />
          <label>Memory description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Add Photos</label>
          <input
            type="file"
            multiple
            onChange={changeHandler}
            name="pictures"
            id="file"
          />
          <div className="privateCheck">
            <label>Make the post private</label>
            <input
              className="checkbox"
              type="checkbox"
              checked={isPrivate}
              onChange={ChangePrivacy}
            />
          </div>
          <div>
            <button type="submit" onClick={sendData}>
              Post
            </button>
            <button onClick={onClose2}>Close</button>
          </div>
        </form>
      </div>
    </>,

    document.getElementById("portal")
  );
};

export default Posts;
