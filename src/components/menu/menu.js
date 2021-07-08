import { useContext } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "../../context/login-context"
import './menu.css'

import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Menu = () => {

    const { userLogin } = useContext(LoginContext)
    return (
    /* {<div className="menu">
        <nav >
            <ul>
                <li>
                    <Link to="/">Login</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
            </ul>
        </nav>
        <div>
            <p>Usuario : {userLogin.email}</p>
        </div>
        
    </div>} */

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">AlexxBot App</Navbar.Brand>
  
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Text style= {{ color : 'white', 'fontWeight': 'bold'}}>  {userLogin.email}</Navbar.Text>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Login</Nav.Link>
      <Nav.Link as={Link} to="/products">Products</Nav.Link>
      <Nav.Link as={Link} to="/transmitir">Streaming</Nav.Link>
      <Nav.Link as={Link} to="/visualizar">Ver</Nav.Link>
      <Nav.Link as={Link} to="/comprar">Comprar</Nav.Link>
      {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  
</Navbar>

)}

export default Menu