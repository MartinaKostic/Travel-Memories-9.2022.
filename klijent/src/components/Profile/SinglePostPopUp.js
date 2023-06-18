import ReactDom from "react-dom";
import "./SinglePostPopUp.css";

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

const imgWrapper = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

const SinglePostPopUp = ({ open, children, onClose, selectedPost }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={overlay_style} />
      <div style={modal_style} className="posts">
        {children}
        <p>{selectedPost.title}</p>
        <p>{selectedPost.location}</p>
        <p>{selectedPost.description}</p>
        <div style={imgWrapper}>
          {selectedPost.Postphotos.map((photo) => (
            <div>
              <img
                className="popUpImage"
                alt="image"
                src={`http://localhost:5000/uploads/${photo.name}`}
              />
            </div>
          ))}
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default SinglePostPopUp;
