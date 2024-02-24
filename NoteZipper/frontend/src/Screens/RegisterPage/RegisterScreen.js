import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../Components/MainScreen';
import axios from 'axios';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPicUrl] = useState('');
  const [message, setMessage] = useState(null);
  const [picmessage, setPicMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const cloudName = 'dhnfyb9bw'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'notezipper'; // Replace with your Cloudinary upload preset
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  
  
  //const uploadName = 'your_upload_name';



  // const [selectedFile, setSelectedFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState('');
  // const [uploading, setUploading] = useState(false);
  // const [uploadError, setUploadError] = useState('');


  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     setUploadError('Please select a file.');
  //     return;
  //   }

  //   setUploadError('');
  //   setUploading(true);

  //   try {
     

  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     formData.append('upload_preset', uploadPreset);

  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  //       formData
  //     );

  //     setImageUrl(response.data.url);
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     setUploadError('Error uploading image. Please try again.');
  //   } finally {
  //     setUploading(false);
  //   }
  // };













  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password does not match');
    } else {
      setMessage(null);
      try {
        setLoading(true);

        const config = {
          headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed
          },
        };

        const { data } = await axios.post('/api/users', {
          name,
          email,
          password,
          pic,
        }, config);

        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setRegisterSuccess(true);
     navigate('/login');


      } catch (error) {
        setError(error.response ? error.response.data.message : 'Server error');
      }
    }
  };





  // const postDetails = (pics) => {
  //   const cloud_name = "dhnfyb9bw";

  //   if (!pics) {
  //     return setPicMessage('Please Select an Image');
  //   }
  //   setPicMessage(null);

  //   if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
  //     const data = new FormData();
  //     data.append('file', pics);
  //     data.append('upload_preset', 'notezipper');
  //     data.append('upload_name', cloud_name);

  //     // Replace the following URL with the actual URL for image upload
  //     fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
  //       method: 'post',
  //       body: data,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setPicUrl(data.url.toString());
  //       }).catch((err)=>{
  //         console.log(err);
  //       });
  //   } else {
  //     return setPicMessage('Please Select an Image');
  //   }
  // };







  const postDetails = (selectedFile) => {
  
  
    if (!selectedFile) {
      setPicMessage('Please select an image');
      return;
    }

    setPicMessage(null)

  
    if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', uploadPreset);
      
  
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'post',
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Image upload failed');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setPicUrl(data.url.toString());
          setPicMessage('Image uploaded successfully');
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setPicMessage('Image upload failed. Please try again.');
        });
    } else {
      setPicMessage('Please select a valid image (JPEG or PNG)');
    }
  };

  return (
    <MainScreen title={`Register`}>
      <div className="registerLoginContainer">
        {registerSuccess && (
          <div className="alert alert-success" role="alert">
            Registration successful! You can now <Link to="/login">login</Link>.
          </div>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          {picmessage && <div className="alert alert-warning mt-2">{picmessage}</div>}

          <Form.Group className="mb-3" >
            {/* <Form.Label>Profile Picture</Form.Label>
            <Form.File
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              onChange={(e) => postDetails(e.target.files[0])}
              custom
            /> */}

          <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              onChange={(e)=> postDetails(e.target.files[0])}
            
            />

{/* <div>
      <h1>Picture Upload </h1>
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
    </div> */}
    
      </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>

          {message && <div className="alert alert-warning mt-2">{message}</div>}

          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;