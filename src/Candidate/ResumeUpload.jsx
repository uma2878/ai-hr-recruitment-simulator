import React, { useState } from "react";

function ResumeUpload({ goBack }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);

    if (f.type === "application/pdf") {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview("");
    }
  };

  const remove = () => {
    setFile(null);
    setPreview("");
  };

  return (
    <div className="card">
      <h2>Resume Upload</h2>

      <input type="file" onChange={handleUpload} />

      {file && (
        <>
          <p>{file.name}</p>

          <button onClick={remove}>Delete</button>
          <button onClick={() => setFile(null)}>Replace</button>
        </>
      )}

      {preview && (
        <iframe src={preview} width="100%" height="400px" />
      )}

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default ResumeUpload;