import { useState } from "react";
import styles from "./Signin.module.css";
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

function Signin({ LoggedIn }) {
  const history = useHistory();
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const user = {
    username: uname,
    password: pass,
  };

  const handleUname = (e) => {
    setUname(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    setError("");
    setSucess("");

    if (uname === "" || pass === "") {
      setError("Fields are required");
      return;
    }

    axios
      .post("http://localhost:5000/signin", user)
      .then((res) => {
        console.log(res.data);
        console.log(history);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("userid", res.data.user.id);
        localStorage.setItem("username", res.data.user.username);
        setSucess("Sucessful!");
        history.push(`/user/${res.data.user.id}`);
        LoggedIn();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <div className={styles.signin}>
      <div className={styles.messages}>
        {error ? <div>{error}</div> : null}
        {sucess ? <div>{sucess}</div> : null}
      </div>
      <form>
        <div className={styles.NamePass}>
          <div className={styles.name}>
            <label className={styles.label}>
              <BsFillPersonFill className={styles.icon} />
            </label>
            <input
              onChange={handleUname}
              type="text"
              className={styles.input}
              value={uname}
              placeholder="Username"
            />
          </div>
          <div className={styles.pass}>
            <label className={styles.label}>
              <RiLockPasswordFill className={styles.icon} />
            </label>
            <input
              onChange={handlePass}
              type="password"
              className={styles.input}
              value={pass}
              placeholder="Password"
            />
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.btn} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
