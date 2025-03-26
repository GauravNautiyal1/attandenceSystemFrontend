import React, { useRef, useState } from "react";
import axios from "axios";
import "../CSS/FaceRegistration.css";

const FaceRegistration = () => {
  const videoRef = useRef(null);
  const [name, setName] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [message, setMessage] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    if (!name.trim()) {
      setMessage("❌ Name cannot be empty!");
      return;
    }

    const canvas = document.createElement("canvas");
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => setCapturedImage(blob), "image/jpeg");
    }
  };

  const registerFace = async () => {
    if (!capturedImage) {
      setMessage("Please capture an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    console.log(name);
    formData.append("branch", "Information Technology");
    formData.append("semester", "VI");
    formData.append("file", capturedImage, `${name}.jpg`);

    try {
      // const response = await axios.post("https://facedetection-2-blek.onrender.com/register-face/", formData);
      const response = await axios.post("http://127.0.0.1:8000/register-face/", formData);
      console.log(response)
      setMessage(`${response.data.message}`);            
    } catch (error) {
      setMessage("Error registering face.");
      console.error("888",error);
    }
  };

  return (
    <div className="face-registration-container">
      <h2>Face Registration</h2>
      <video ref={videoRef} autoPlay width="400" height="300" style={{transform: "scaleX(-1)"}}></video>
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={captureImage}>Capture Image</button>
      </div>
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={registerFace}>Register Face</button>
      <p>{message}</p>
    </div>
  );
};

export default FaceRegistration;
