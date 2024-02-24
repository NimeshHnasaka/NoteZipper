import React, { useState } from 'react';
import axios from 'axios';

const PictureUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file.');
      return;
    }

    setUploadError('');
    setUploading(true);

    try {
      const cloudName = 'dhnfyb9bw'; // Replace with your Cloudinary cloud name
      const uploadPreset = 'notezipper'; // Replace with your Cloudinary upload preset

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setImageUrl(response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Picture Upload Page</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        Upload Picture
      </button>

      {uploading && <p>Uploading...</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default PictureUploadPage;