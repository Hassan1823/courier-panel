import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (!userData || userData === "") {
      const user = JSON.parse(localStorage.getItem("courier"));
      if (user && user !== "") {
        navigate("/");
        setUserData(user);
      }
    }
  }, [userData, navigate]);

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (credentials.username && credentials.password !== undefined) {
        if (
          credentials.username === "tcs" &&
          credentials.password === "tcs123"
        ) {
          localStorage.setItem("courier", "tcs");
        } else if (
          credentials.username === "dhl" &&
          credentials.password === "dhl123"
        ) {
          localStorage.setItem("courier", "dhl");
        } else if (
          credentials.username === "leopards" &&
          credentials.password === "leopards123"
        ) {
          localStorage.setItem("courier", "leopards");
        } else {
          return toast.error("Wrong Credentials");
        }
        toast.success("Successfully Logged In");
        navigate("/shipping");
      } else {
        toast.error("Some Thing Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
