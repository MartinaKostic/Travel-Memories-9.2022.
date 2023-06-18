import { useState, useEffect, useRef } from "react";
import PhotoAlbum from "react-photo-album";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./Profile.css";

export default function Photos() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [galleryphotos, setGalleryphotos] = useState([]);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const userId = useParams().id;

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log({ selected });
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  const sendImage = (e) => {
    let config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };

    let formdata = new FormData();
    formdata.append("picture", file);
    axios
      .post("http://localhost:5000/uploadFile", formdata, config)
      .then((res) => {
        res.text();
      });
  };

  const { id } = useParams();
  useEffect(() => {
    const sizes = [
      { width: 400, height: 400 },
      { width: 300, height: 400 },
      { width: 1280, height: 720 },
      { width: 1080, height: 720 },
      { width: 1024, height: 768 },
    ];
    axios.get("http://localhost:5000/postphotos/" + id).then((res) => {
      const nizSlikaSaBackenda = res.data;
      const galleryPhotos = [];
      nizSlikaSaBackenda.map((objekt) => {
        const broj = Math.floor(Math.random() * (5 - 0) + 0);

        galleryPhotos.push({
          src: "http://localhost:5000/uploads/" + objekt.name,
          width: sizes[broj].width,
          height: sizes[broj].height,
          isprivate: objekt.isprivate,
          userId: objekt.userid,
        });
      });
      const filteredGalleryPhotos = galleryPhotos.filter(
        (photo) =>
          !photo.isprivate || photo.userId == localStorage.getItem("userid")
      );
      setGalleryphotos(filteredGalleryPhotos);
    });
  }, [id]);

  return (
    <form>
      {userId == localStorage.getItem("userid") && (
        <div className="profilePic">
          <label className="labelPicture">
            Click to change profile picture
          </label>
          <input
            className="inputPicture"
            type="file"
            name="picture"
            onChange={changeHandler}
          />
          {error && <div className="error">{error}</div>}

          {file && (
            <button className="btnChangeProfilePicture" onClick={sendImage}>
              Change profile picture
            </button>
          )}
        </div>
      )}
      <div className="gallery">
        <PhotoAlbum layout="columns" photos={galleryphotos} />
      </div>
    </form>
  );
}
