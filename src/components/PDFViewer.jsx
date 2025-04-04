import { useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewer = ({ pdfFile }) => {
  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    const disableShortcuts = (event) => {
      if (
        event.ctrlKey &&
        (event.key === "s" || event.key === "p" || event.key === "u" || event.key === "Shift")
      ) {
        event.preventDefault();
        alert("Download and printing are disabled on this document.");
      }
      if (event.key === "F12") {
        event.preventDefault();
        alert("Developer tools are disabled.");
      }
    };
    document.addEventListener("keydown", disableShortcuts);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
    };
  }, []);

  return (
    <div style={{ height: "600px", userSelect: "none" }}>
      <h1>hello moto</h1>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer fileUrl={pdfFile} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
