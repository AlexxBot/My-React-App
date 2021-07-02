import { useContext } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "../context/login-context"
import './menu.css'
const Menu = () => {

    const { userLogin } = useContext(LoginContext)
    return (
    <div className="menu">
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

        <p>Usuario : {userLogin.email}</p>
    </div>

)}

export default Menu