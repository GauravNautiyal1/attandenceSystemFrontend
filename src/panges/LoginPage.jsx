import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../CSS/LoginStyle.css";
import { useFirebase } from "../context/Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  // const [studentdata, setStudentData] = useState(
  //   localStorage.getItem("studentdata") || ""
  // );
  const [studentdata, setStudentData] = useState(
    JSON.parse(localStorage.getItem("studentdata")) || {}
  );
  const [bra, setBra] = useState(localStorage.getItem("bra") || "");
  const navigate = useNavigate();
  const firebase = useFirebase();
  useEffect(() => {
    if (firebase.isLoggedIn) {
      if (role === "student") {
        // navigate("/Students/dashboard");
        navigate("/Students/dashboard", { state: { studentdata } });
        console.log("Navigating with student data:", studentdata);

        console.log("999999999", studentdata);
      } else if (role === "teacher") {
        navigate("/Teachers/dashboard", { state: { bra } });
      } else {
        console.log("Unauthorized role detected.");
      }
    }
  }, [firebase.isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await firebase.LoginUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Login successful:", result);

      if (result.user) {
        // Fetch user data from Firestore
        const userDoc = await firebase.fetchUserData(result.user.uid);

        if (userDoc.success && userDoc.data.role) {
          const role = userDoc.data.role;
          console.log("gaurav", userDoc.data);
          localStorage.setItem("studentdata", JSON.stringify(userDoc.data));
          setStudentData(userDoc.data);
          localStorage.setItem("role", role);

          if (role === "student") {
            // navigate("/Students/dashboard", { state: { studentdata } });
            // console.log("Navigating with student data:", studentdata);

            // console.log("999999999", studentdata);
            navigate("/Students/dashboard", { state: { studentdata: userDoc.data } });

            

          } else if (role === "teacher") {
            const bra = userDoc.data.department;
            localStorage.setItem("bra", bra);
            navigate("/Teachers/dashboard", { state: { bra } });
          } else {
            setError("Unauthorized role detected.");
          }
        } else {
          setError("User role not found.");
        }
      }
    } catch (error) {
      setError("invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mainContainer" style={{ height: "100vh" }}>
        <div className="Container">
          <div className="Content">
            <form onSubmit={handleSubmit} className="loginpageL">
              <h1>Login</h1>
              {error && <div className="error">{error}</div>}
              <div className="emailpass">
                <i className="fa-solid fa-user"></i>
                <input
                  className="inputL"
                  type="text"
                  placeholder="Enter Your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="emailpass">
                <i className="fa-solid fa-lock"></i>
                <input
                  className="inputL"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="loginbtn" type="submit" id="button">
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
              <div className="forgetlogin">
                <div className="forget">
                  <Link className="anchor" to="/forget/password">
                    Forgotten account?
                  </Link>
                </div>
                <div className="login">
                  <Link className="anchor" to="/signup">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
