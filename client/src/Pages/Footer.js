import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <p>Algunos derechos reservados &reg; 2019. &Iacute;cono de FreePNGimg.com, im&aacute;genes obtenidas de sus respectivas marcas. Para refrescar el cache, presione <Link to="/flush">aquí</Link>.</p>
            </footer>
        );
    }
}

export default Footer;