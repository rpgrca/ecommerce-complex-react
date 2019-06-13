import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Configuration from '../configuration';
import './Register.css';


class Register extends React.Component {
    timeoutCallback;

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            error: "",

            nombre: "",
            apellido: "",
            dni: "",
            email: "",
            telefono: "",
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
        if (this.state.nombre && this.state.apellido && this.state.email && this.state.clave &&
           (this.state.clave === this.state.confirmarClave)) {
            fetch(Configuration.buildServerUrl("/usuarios/registrar"), {
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
                error: "Por favor complete los datos obligatorios"
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutCallback);
    }

    render() {
        if (this.state.success) {
            return <Redirect to='/' />
        }
        else {
            if (this.state.error) {
                this.timeoutCallback = setTimeout(() => this.setState({error: ""}), 2000);
            }

            return (
                <React.Fragment>
                    <Header page="register" />
                    <p>Para poder comprar en este sitio deber&aacute; registrarse completando el siguiente formulario. Si ya tiene una cuenta, puede <Link to="/login">acceder</Link> a la misma.</p>
                    <div className="formulario">
                        <form method="post" name="form" onChange={this.onChange} onSubmit={this.onSubmit}>
                            <label id="nombreLabel" htmlFor="nombre">Nombre (*)</label><input type="text" id="nombre" name="nombre" />
                            <label id="apellidoLabel" htmlFor="apellido">Apellido (*)</label><input type="text" id="apellido" name="apellido" />
                            <label id="dniLabel" htmlFor="dni">DNI</label><input type="text" id="dni" name="dni" />
                            <label id="emailLabel" htmlFor="email">E-mail (*)</label><input type="text" id="email" name="email" />
                            <label id="telefonoLabel" htmlFor="telefono">Tel&eacute;fono</label><input type="tel" id="telefono" name="telefono" />
                            <label id="claveLabel" htmlFor="clave">Clave (*)</label><input type="password" id="clave" name="clave" />
                            <label id="confirmarClaveLabel" htmlFor="confirmarClave">Confirmar clave (*)</label><input type="password" id="confirmarClave" name="confirmarClave" />

                            <label htmlFor="reset">&nbsp;</label>
                            <input type="reset" id="reset" value="Limpiar" />
                            <input type="submit" id="submit" value="Registrar" />
                        </form>
                    </div>
                    {this.state.error? <div className="error-message">{this.state.error}</div> : ""}
                    <Footer />
                </React.Fragment>
            );
        }
    }
}

export default Register;

/** vim:et:ts=4
  */