import React from 'react';

function TakeAttendance() {
  return (
    <div style={{ backgroundColor: 'rgb(59 68 86)', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Live Face Detection</h1>
        <img
          src="http://127.0.0.1:8000/recognition/detect_face"
          alt="Connect to the Server"
          style={{ width: '100%', maxWidth: '600px', border: '2px solid black' }}
        />
      </div>
    </div>
  );
}

export default TakeAttendance;
