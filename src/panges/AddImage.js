import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

function AddData() {
  const firebase = useFirebase();

  const [title, setTitle] = useState("");
  const [text, setText] = useState(".....");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };
  const hendleSubmit = async (e) => {
    if (!title || !selectedFile) {
      alert("Please fill title and select an image.");
      return;
    }
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "WaalpaperWebApp");
    data.append("cloud_name", "dpciu7mp5");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpciu7mp5/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResponse = await res.json();
      const uploadedImageUrl = uploadResponse.url;

      // Now send data to Firebase with the image URL
      await firebase.createNewListing(title, text, uploadedImageUrl);
      alert("Wallpaper added successfully!");

      // Reset fields
      setTitle("");
      setText("");
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex  justify-content-center align-items-center bg-danger">
      <div className="box bg-white rounded shadow p-4 w-50 d-flex flex-column  align-items-center ">
        <h1>Add Wallpapers</h1>
        <br />
        <div className="border border-secondary border-dashed rounded p-4 text-center mb-4 w-75 ">
          <label
            htmlFor="fileInput"
            className="custom-file-label form-control mb-3 d-flex justify-content-center align-items-center"
            style={{
              height: 200,
              width: "100%",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
                className="img-preview"
              />
            ) : (
              "Click to Upload a File"
            )}
          </label>

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            className="d-none"
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Add wallpaper name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Enter some discription(It may be empty)"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="form-control mb-3"
          />
        </div>
        <button className="btn btn-success" onClick={hendleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AddData;