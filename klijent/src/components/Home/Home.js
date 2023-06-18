import "./Home.css";

const Home = () => {
  return (
    <div className="joinus">
      <div className="container">
        <div className="picture">
          <img src={require("../../pics/landing.jpg")} alt="Join Us" />
        </div>
      </div>
      <div className="text-image">
        <h1>Join Us</h1>
        <h5>in making memories that last forever</h5>
      </div>
    </div>
  );
};

export default Home;
