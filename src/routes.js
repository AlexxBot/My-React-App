import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import Login from './components/login/login'
import Products from './components/products/products'
import Menu from './components/menu/menu'

const Routes = () => {
    return (
        <Router>
            <div>
                {/* <nav className="Menu">
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </nav> */}
                <Menu/>
            
                <Switch>
                    <Route exact={true} path="/">
                        <Login />
                    </Route>
                    <Route path="/products">
                        <Products />
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    )
}
export default Routes