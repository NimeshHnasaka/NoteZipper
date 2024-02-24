import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";




function Header() {


  const navigate = useNavigate();



  return (
    
    <Navbar  bg="primary" expand="lg" variant="dark">
      <Container fluid>

        <Navbar.Brand>
        <Link to="/">NoteZipper</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="responsive-navbar-nav">
         
          <Nav className="m-auto">
            <Nav.Link href="/mynotes">My Notes</Nav.Link>

            <NavDropdown title="Nimesh Hansaka" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item 
              onClick={()=>{
                localStorage.removeItem("userInfo");
                navigate("/");
              }}
              >
                Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
