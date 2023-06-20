import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Configuration from '../configuration';
import './Login.css';

class Login extends React.Component {
    timeoutCallback;

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            error: "",
            email: "",
            clave: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.email && this.state.clave) {
            fetch(Configuration.buildServerUrl("/usuarios/acceder"), {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((result) => result.json())
            .then((info) => { 
                if (info.status === "error") {
                    this.setState({
                        error: info.message
                    });
                }
                else {
                    localStorage.setItem('token', info.data.token);
                    localStorage.setItem('name', info.data.user.nombre);
                    this.setState({
                        success: true
                    });
                }
            });
        }
        else {
            this.setState({
                error: "Por favor complete el formulario"
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutCallback);
    }

    render() {
        if (this.state.success) {
            return <Navigate to='/' />
        }
        else {
            if (this.state.error) {
                this.timeoutCallback = setTimeout(() => this.setState({error: ""}), 2000);
            }
            return (
                <React.Fragment>
                    <Header page="login" />
                    <p>Para poder comprar en este sitio deber&aacute; acceder a su cuenta desde el siguiente formulario. Si no tiene una puede <Link to="/register">crearla</Link>.</p>
                    <div className='formulario'>
                        <form method='POST' onChange={this.onChange} onSubmit={this.onSubmit}>
                            <label htmlFor='email'>E-mail</label><input type='text' id='email' name='email' /><br />
                            <label htmlFor='clave'>Password</label><input type='password' id='clave' name='clave' /><br />
                            <label htmlFor="reset">&nbsp;</label>
                            <input type='reset' value='Limpiar' />
                            <input type='submit' value='Login' />
                        </form>
                    </div>
                    {this.state.error? <div className="error-message">{this.state.error}</div> : ""}
                    <Footer />
                </React.Fragment>
            );
        }
    }
}

export default Login;

/** vim:et:ts=4
  */