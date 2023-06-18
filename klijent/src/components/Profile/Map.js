import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useState } from "react";
import SinglePostPopUp from "./SinglePostPopUp";
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};
const style = {
  width: "100%",
  height: "100%",
};
export function MapContainer(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const onMarkerClick = (post) => {
    console.log("clck", post);
    setSelectedPost(post);
    setIsOpen(true);
  };
  return (
    <div style={{ height: "80vh", width: "80%" }}>
      <SinglePostPopUp
        selectedPost={selectedPost}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      ></SinglePostPopUp>
      <Map
        initialCenter={{ lat: 43.5147118, lng: 16.4435148 }}
        style={style}
        containerStyle={containerStyle}
        google={props.google}
        zoom={6}
      >
        {props.posts.map((post) => {
          return (
            <Marker
              title={post.title}
              name={post.location}
              id={post.id}
              onClick={() => onMarkerClick(post)}
              icon={{
                url: `http://localhost:5000/uploads/${post.Postphotos[0]?.name}`,
                anchor: new props.google.maps.Point(16, 16),
                scaledSize: new props.google.maps.Size(48, 48),
              }}
              position={{ lat: post.lat, lng: post.lng }}
            ></Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCfLPDsaSls_bAKh2z-rXfxTrcYJ5pQBjM",
})(MapContainer);
