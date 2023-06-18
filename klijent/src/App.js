import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Feed from "./components/Feed/Feed";
import Navbar from "./components/Navbar/Navbar.js";
import Signup from "./components/Signup/Signup.js";
import myProfile from "./components/Profile/Profile.js";
import Signin from "./components/Signin/Signin.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChangeTrue = () => {
    setIsLoggedIn(true);
  };
  const handleChangeFalse = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar logged={isLoggedIn} LoggedIn={handleChangeFalse} />
        <div className="Content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/feed" component={Feed} />
            <Route
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  logged={isLoggedIn}
                  LoggedIn={handleChangeTrue}
                />
              )}
            />
            <Route
              path="/signin"
              render={(props) => (
                <Signin
                  {...props}
                  logged={isLoggedIn}
                  LoggedIn={handleChangeTrue}
                />
              )}
            />
            <Route path="/user/:id" component={myProfile} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
