import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Signup.module.css";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import React from "react";
import axios from "axios";

function Signup({ logged, LoggedIn }) {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorF, setErrorf] = useState("");
  const [errorU, setErroru] = useState("");
  const [errorE, setErrore] = useState("");
  const [errorP, setErrorp] = useState("");

  const user = {
    name: name,
    username: username,
    email: email,
    password: password,
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorf("");
    setErroru("");
    setErrore("");
    setErrorp("");
    if (name === "") {
      setErrorf("Full name is required");
      return;
    }
    if (username === "") {
      setErroru("Username is required");
      return;
    }
    if (email === "") {
      setErrore("E-mail is required");
      return;
    }
    if (password === "") {
      setErrorp("Password is required");
      return;
    }

    axios
      .post("http://localhost:5000/signup", user)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("userid", res.data.user.id);
        localStorage.setItem("username", res.data.user.username);
        history.push(`/user/${res.data.user.id}`);
        LoggedIn();
      })
      .catch(function (err) {});
  };

  return (
    <div className={styles.signup}>
      <form className={styles.forma}>
        <div className={styles.fullname}>
          <BsFillPersonLinesFill className={styles.icon} />
          <input
            onChange={handleName}
            className={styles.inputf}
            value={name}
            type="text"
            placeholder="Full Name"
          />
        </div>
        <div className={styles.messages}>
          {errorF ? <div>{errorF}</div> : null}
        </div>
        <div className={styles.section}>
          <div className={styles.username}>
            <BsFillPersonFill className={styles.icon} />
            <input
              onChange={handleUsername}
              className={styles.input}
              value={username}
              type="text"
              placeholder="Username"
            />
            <div className={styles.messages}>
              {errorU ? <div>{errorU}</div> : null}
            </div>
          </div>
          <div className={styles.email}>
            <MdEmail className={styles.icon} />
            <input
              onChange={handleEmail}
              className={styles.input}
              value={email}
              type="email"
              placeholder="E-mail"
            />
            <div className={styles.messages}>
              {errorE ? <div>{errorE}</div> : null}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.password}>
            <RiLockPasswordFill className={styles.icon} />

            <input
              onChange={handlePassword}
              className={styles.input}
              value={password}
              type="password"
              placeholder="Password"
            />
            <div className={styles.messages}>
              {errorP ? <div>{errorP}</div> : null}
            </div>
          </div>

          <button onClick={handleSubmit} className={styles.btn} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
