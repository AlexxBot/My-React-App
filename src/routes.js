import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import Login from './components/login'
import Products from './components/products'
import Emitir from './components/emitir';
import Visualizar from './components/visualizar'
import Comprar from './components/comprar'

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
                        <li>
                            <Link to="/emitir">Emitir</Link> 
                        </li>
                        <li>
                            <Link to="/visualizar">Visualizar</Link> 
                        </li>
                        <li>
                            <Link to="/comprar/">Comprar</Link> 
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
                    <Route path="/emitir">
                        <Emitir />
                    </Route>
                    <Route path="/visualizar">
                        <Visualizar />
                    </Route>
                    <Route path="/comprar/:id" component={Comprar} />
                    
                    
                </Switch>
            </div>
        </Router>
    )
}
export default Routes