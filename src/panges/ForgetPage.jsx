import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const firebase = useFirebase();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const result = await firebase.resetPassword(email);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="mainContainer">
      <div className="Container">
        <div className="Content">
          <form onSubmit={handleResetPassword} className="loginpageL">
            <h1>Reset Password</h1>
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
            <div className="emailpass">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="inputL"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="loginbtn" type="submit">
                Send Reset Email
              </button>
            </div>
            <div className="back-login">
              <Link className="anchor" to="/login">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
