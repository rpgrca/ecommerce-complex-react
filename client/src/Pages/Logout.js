import React from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Logout extends React.Component {
    render() {
        localStorage.clear();

        return (
            <React.Fragment>
                <span>Adios!</span>
                <Redirect to='/' />
            </React.Fragment>
        );
    }
}

export default Logout;

/** vim:et:ts=4
  */