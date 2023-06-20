import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route } from 'react-router';
import { BrowserRouter, Routes } from 'react-router-dom';
import Logout from './Pages/Logout';
import Login from './Pages/Login';
import FullProduct from './Pages/FullProduct';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import Flush from './Pages/Flush';
import Default from './Pages/Default';

ReactDOM.render(<BrowserRouter>
    <Routes>
        <Route exact path='/' element={App} />
        <Route path='/login' element={Login} />
        <Route path='/register' element={Register} />
        <Route path='/logout' element={Logout} />
        <Route path='/category/:category' element={App} />
        <Route path='/category' element={App} />
        <Route path='/product/:code' element={FullProduct} />
        <Route path='/cart' element={Cart} />
        <Route path='/flush' element={Flush} />
        <Route element={Default} />
    </Routes>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
