import React, { useEffect, useRef, useState } from "react";
import beepSound from "../Images/beep.wav";

const FaceDetection = ({ currentSemester, department }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ws, setWs] = useState(null);
  const beepAudio = new Audio(beepSound);
  const [isDetecting, setIsDetecting] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(
      `ws://localhost:8000/detect-face/${department}/${currentSemester}`
    );
    console.log(department, "  ", currentSemester);
    setWs(websocket);

    websocket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      drawBoundingBoxes(response.faces);
      response.faces.forEach((face) => {
        if (face.name !== "Unknown") {
          beepAudio.play();
        }
      });
    };

    return () => websocket.close();
  }, []);

  const toggleDetection = async () => {
    if (isDetecting) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsDetecting(false);
      stopCamera();
  
      // Close WebSocket connection when stopping detection
      if (ws) {
        ws.onmessage = null;  // Remove message listener
        ws.close();
        setWs(null);
      }
    } else {
      await startCamera();
      
      // Reinitialize WebSocket connection
      const websocket = new WebSocket(
        `ws://localhost:8000/detect-face/${department}/${currentSemester}`
      );
      setWs(websocket);
  
      websocket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.faces && Array.isArray(response.faces)) {
          drawBoundingBoxes(response.faces);
          response.faces.forEach((face) => {
            if (face.name !== "Unknown") {
              beepAudio.play();
            }
          });
        }
      };
  
      websocket.onclose = () => {
        console.log("WebSocket closed");
      };
  
      websocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      const id = setInterval(captureFrame, 1000);
      setIntervalId(id);
      setIsDetecting(true);
    }
  };
  

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null; // Remove video source
    }
  };

  const captureFrame = () => {
    if (!videoRef.current || !ws || ws.readyState !== WebSocket.OPEN) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg").split(",")[1];
    ws.send(imageData);
  };

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "86vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2 className="text-dark" style={{ fontWeight: "bolder" }}>
        Face Detection System
      </h2>
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
          style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
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
