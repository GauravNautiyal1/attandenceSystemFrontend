import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import styles from "../CSS/TeacherSignup.module.css";  // Correct import
import { useFirebase } from "../context/Firebase";

function TeacherSignIn() {
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("teacher");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const firebase = useFirebase();

  const resetForm = () => {
    setDepartment("");
    setDepartmentId("");
    setEmail("");
    setCreatePassword("");
    setConfirmPassword("");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (createPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await firebase.singupUserWithEmailAndPassword(email, createPassword, role, department);
      if (result.user) {
        const teacherData = {
          uid: result.user.uid,
          department,
          departmentId,
          email,
        };

        await firebase.putTeacherData(department, departmentId, teacherData);
        console.log("Teacher registered & data stored successfully");
        handleShow();
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.ContainerSignin}>
        <div className={styles.Content}>
          <form onSubmit={handleSubmit} className={styles.signupPage}>
            <h1>Teacher Sign-Up</h1>
            <div className={styles.data}>
              <div className={styles.departmentId}>
                <div className={styles.department}>
                  <label>Department</label>
                  <input
                    className={styles.input}
                    list="Department"
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Select Department"
                  />
                  <datalist id="Department">
                    {["Information Technology", "Computer Science Engineering", "Mechanical", "Civil Engineering", "Auto Mechanical", "Electronics"].map((dept) => (
                      <option key={dept} value={dept} />
                    ))}
                  </datalist>
                </div>
                <div className={styles.departmentIdField}>
                  <label>Department ID</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    placeholder="Enter Department ID"
                  />
                </div>
              </div>

              <div className={styles.tEmail}>
                <label>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
              </div>

              <div className={styles.createConfirm}>
                <div className={styles.createPass}>
                  <label>Create Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className={styles.confirmPass}>
                  <label>Confirm Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className={styles.Signup_btn_box}>
                <button type="submit" className={styles.Sign_Up}>Sign up</button>
              </div>
            </div>

          </form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Teacher registration request has been sent.</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeacherSignIn;
