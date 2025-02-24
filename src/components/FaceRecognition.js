// import React, { useState } from "react";
// import axios from "axios";

// const FaceRecognition = () => {
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleUpload = async (endpoint) => {
//     if (!image) return alert("Please select an image!");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const response = await axios.post(`http://127.0.0.1:8000/attendance/${endpoint}/`, formData);
//       console.log("it done")
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.error || "An error occurred");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Face Recognition System</h2>
//       <input type="file" onChange={handleFileChange} className="form-control mt-2" />
//       <button className="btn btn-primary mt-2" onClick={() => handleUpload("register")}>Register</button>
//       <button className="btn btn-success mt-2" onClick={() => handleUpload("recognize")}>Recognize</button>
//       {message && <p className="alert alert-info mt-3">{message}</p>}
//     </div>
//   );
// };

// export default FaceRecognition;


// import React, { useEffect, useRef, useState } from "react";

// const FaceDetection = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     // Start WebSocket Connection
//     const websocket = new WebSocket("ws://localhost:8000/detect-face");
//     setWs(websocket);

//     websocket.onmessage = (event) => {
//       const response = JSON.parse(event.data);
//       drawBoundingBoxes(response.faces);
//       console.log(response.faces)
//     };

//     return () => websocket.close();
//   }, []);

//   const captureFrame = () => {
//     if (!videoRef.current) return;

//     const canvas = document.createElement("canvas");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     // Convert to Base64
//     const imageData = canvas.toDataURL("image/jpeg");
//     const base64Data = imageData.split(",")[1];

//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(base64Data);
//     }
//   };

//   const drawBoundingBoxes = (faces) => {
//     if (!canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     faces.forEach((face) => {
//       ctx.strokeStyle = face.name === "Unknown" ? "red" : "green";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(face.x, face.y, face.w, face.h);
//       ctx.fillStyle = "white";
//       ctx.fillText(face.name, face.x, face.y - 5);
//     });
//   };

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     });

//     const interval = setInterval(captureFrame, 1000);
//     return () => clearInterval(interval);
//   }, [ws]);

//   return (
//     <div style={{ position: "relative", width: "640px", height: "480px" }}>
//       <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
//       <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
//     </div>
//   );
// };

// export default FaceDetection;

import React, { useEffect, useRef, useState } from "react";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ws, setWs] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Establish WebSocket connection
  useEffect(() => {
    // const websocket = new WebSocket("ws://localhost:8000/detect-face");
    console.log("hello")
    const websocket = new WebSocket("wss://facedetection-qjxy.onrender.com/detect-face");
    console.log(websocket)
    setWs(websocket);

    websocket.onopen = () => console.log("WebSocket Connected ✅");

    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      drawBoundingBoxes(response.faces);
      console.log("1111111",response.faces);
    };

    websocket.onerror = (error) => console.error("WebSocket Error:", error);
    websocket.onclose = () => console.log("⚠️ WebSocket Disconnected");

    return () => websocket.close();
  }, []);

  // Start/Stop Detection
  const toggleDetection = () => {
    if (isDetecting) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsDetecting(false);
    } else {
      const id = setInterval(captureFrame, 1000); // Send frames every second
      setIntervalId(id);
      setIsDetecting(true);
    }
  };

  // Capture frame from video and send to backend
  const captureFrame = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg");
    const base64Data = imageData.split(",")[1];

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(base64Data);
    }
  };

  // Draw Bounding Boxes and Names
  const drawBoundingBoxes = (faces) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faces.forEach((face) => {
      ctx.strokeStyle = face.name === "Unknown" ? "red" : "green";
      ctx.lineWidth = 3;
      ctx.strokeRect(face.x, face.y, face.w, face.h);

      ctx.fillStyle = "green";
      ctx.font = "16px Arial";
      ctx.fillText(face.name, face.x, face.y - 10);
    });
  };

  // Start video stream from webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2>🎯 Face Detection System</h2>
      <div
        style={{
          position: "relative",
          width: "640px",
          height: "480px",
          border: "4px solid #4CAF50",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <button
        onClick={toggleDetection}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: isDetecting ? "#f44336" : "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isDetecting ? "🛑 Stop Detection" : "✅ Start Detection"}
      </button>
    </div>
  );
};

export default FaceDetection;
