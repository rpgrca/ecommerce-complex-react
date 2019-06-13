import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import Logout from './Pages/Logout';
import Login from './Pages/Login';
import FullProduct from './Pages/FullProduct';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import Flush from './Pages/Flush';
import Default from './Pages/Default';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/logout' component={Logout} />
        <Route path='/category/:category' component={App} />
        <Route path='/category' component={App} />
        <Route path='/product/:code' component={FullProduct} />
        <Route path='/cart' component={Cart} />
        <Route path='/flush' component={Flush} />
        <Route component={Default} />
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
