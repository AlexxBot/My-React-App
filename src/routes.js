import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import Login from './components/login'
import Products from './components/products'

const Routes = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </nav>
            
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