import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MainScreen from '../../Components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNavigated, setIsNavigated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    console.log("Inside useEffect", userInfo);
    if (userInfo && !isNavigated) {
      setIsNavigated(true);
      console.log("Navigating to /mynotes");
      navigate("/mynotes");
    }
  }, [userInfo, isNavigated, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsNavigated(false); // Reset the navigation flag

    dispatch(login(email, password));
  };

  return (
    <MainScreen title={`Login`}>
      <div className="loginContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </Button>

          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}
        </Form>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;