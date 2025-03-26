import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "../CSS/LoginStyle.css";
import { useFirebase } from "../context/Firebase";

function SignIn() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [Roll_No, setRoll_No] = useState("");
  const [semester, setSemester] = useState("");
  const [Branch, setBranch] = useState("");
  const [image, setImage] = useState(null);
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState("");
  const role="student";
  const [create_password, setCreate_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const firebase = useFirebase();

  const resetForm = () => {
    setFirst_name("");
    setLast_name("");
    setRoll_No("");
    setSemester("");
    setBranch("");
    setEmail("");
    setAge("");
    setCreate_password("");
    setConfirm_password("");
  };
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/Login");
    }
  }, [firebase, navigate]);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (create_password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await firebase.singupStudentWithEmailAndPassword(
        Email,
        create_password,
        role,
        Branch,
        semester,
        Roll_No,
      );

      if (result.user) {
        await firebase.putStudentData(Branch, semester, Roll_No, {
          uid: result.user.uid, 
          first_name,
          last_name,
          Roll_No,
          semester,
          Branch,
          Email,
          Age,
          role,
          IsAuthorised: false,
        });

        handleShow();
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="ContainerSignin">
          <div className="Content">
            <form onSubmit={handleSubmit} className="signup_page">
              <h1>Sign-Up</h1>
              <div className="Data">
                {/* Name Fields */}
                <div className="First_Last_Name">
                  <div className="First_Name">
                    <label>First Name</label>
                    <input
                      className="input"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      placeholder="Enter Your First Name"
                    />
                  </div>
                  <div className="Last_Name">
                    <label>Last Name</label>
                    <input
                      className="input"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                </div>

                {/* Academic Info */}
                <div className="Roll_Sem_Branch">
                  <div className="Roll">
                    <label>Roll No.</label>
                    <input
                      className="input"
                      type="text"
                      value={Roll_No}
                      onChange={(e) => setRoll_No(e.target.value)}
                      placeholder="Enter Your Roll No."
                    />
                  </div>
                  <div className="Sem">
                    <label>Semester</label>
                    <input
                      className="input"
                      list="Sem"
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      placeholder="Semester"
                    />
                    <datalist id="Sem">
                      {["I", "II", "III", "IV", "V", "VI"].map((sem) => (
                        <option key={sem} value={sem} />
                      ))}
                    </datalist>
                  </div>
                  <div className="Branch">
                    <label>Branch</label>
                    <input
                      className="input"
                      list="Branch"
                      type="text"
                      value={Branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="Branch"
                    />
                    <datalist id="Branch">
                      {[
                        "Information Technology",
                        "Computer Science Engineering",
                        "Civil Engineering",
                        "Electronics",
                        "Mechanical",
                        "Auto Mechanical",
                      ].map((branch) => (
                        <option key={branch} value={branch} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="Email_Age">
                  <div className="Email">
                    <label>E-mail</label>
                    <input
                      className="input"
                      type="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your E-mail"
                    />
                  </div>
                  <div className="Age">
                    <label>Age</label>
                    <input
                      className="input nameInput"
                      type="number"
                      value={Age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter Your Age"
                    />
                  </div>
                  <div className="Age">
                    <label>Image</label>
                    <input
                      className="input nameInput"
                      type="file"
                      // value={Age}
                      // required
                      style={{ outline: "none"}}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Enter Your Age"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="Create_Confirm">
                  <div className="Create_Pass">
                    <label>Create Password</label>
                    <input
                      className="input"
                      type="password"
                      value={create_password}
                      onChange={(e) => setCreate_password(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="Create_Pass">
                    <label>Confirm Password</label>
                    <input
                      className="input nameInput"
                      type="password"
                      value={confirm_password}
                      onChange={(e) => setConfirm_password(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <div className="Signup_btn_box">
                  <button type="submit" id="button" className="Sign_Up">
                    Sign up
                  </button>
                </div>
              </div>
              <div className="Forget_Signup">
                <div className="Forget">
                  <Link className="anchor" to="/forget">
                    Forgotten account?
                  </Link>
                </div>
                <div className="Signup">
                  <Link className="anchor" to="/">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Success Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-4">
              <img
                // src={Success}
                alt="SignUp Successful"
                className="rounded-circle mb-3"
                width="208"
                height="208"
              />
              <h1>Login request has been sent</h1>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default SignIn;
