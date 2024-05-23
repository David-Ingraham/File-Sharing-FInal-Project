import React, { useState, useEffect } from "react";
import { storage, auth } from "./firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  getMetadata,
  updateMetadata,
} from "firebase/storage";
import { signOut } from "firebase/auth";
import "./style/dark-style.css";

function Home({ user }) {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, "uploads/");
      const fileList = await listAll(storageRef);
      const filePromises = fileList.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        return { name: itemRef.name, url, metadata };
      });
      const fileListResolved = await Promise.all(filePromises);
      setFiles(fileListResolved);
    };

    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const fileRef = ref(storage, `uploads/${file.name}`);
      const metadata = {
        customMetadata: {
          uploadedBy: user.email,
          uploadedAt: new Date().toISOString(),
        },
      };
      await uploadBytes(fileRef, file);
      await updateMetadata(fileRef, metadata); // Add metadata separately
      const url = await getDownloadURL(fileRef);
      const updatedMetadata = await getMetadata(fileRef);
      setFiles((prevFiles) => [
        ...prevFiles,
        { name: file.name, url, metadata: updatedMetadata },
      ]);
      setFile(null);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="header-title">Welcome, {user.email}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="upload-section">
        <h2 className="upload-title">Upload a File</h2>
        <input className="file-input" type="file" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </section>
      <section className="files-list">
        <h2 className="upload-title">Uploaded Files</h2>
        <ul>
          {files.map((file) => (
            <li className="file-item" key={file.name}>
              <a
                className="file-link"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </a>
              {file.metadata.name ? (
                <div className="file-info">
                  <div>
                    <strong>File type:</strong> {file.metadata.contentType}
                  </div>
                  <div>
                    <strong>Size:</strong>{" "}
                    {(file.metadata.size / 1024).toFixed(2)} KB
                  </div>
                  <div>
                    <strong>Uploaded At:</strong>{" "}
                    {new Date(file.metadata.timeCreated).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="file-info">No metadata available</div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
