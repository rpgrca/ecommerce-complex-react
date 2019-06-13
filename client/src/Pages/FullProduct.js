import React from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import Header from './Header';
import Footer from './Footer';
import Configuration from '../configuration';

class FullProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            product: this.props.product
        };
    }

    render() {
        let { error, isLoaded, product } = this.state;
        let imageUrl = Configuration.buildServerUrl("/images/back-arrow.png");

        if (error) {
            return (
                <React.Fragment>
                    <Header page="product" />
                    <h2><Link to="/">
                        <img alt="Flecha atras" width="32" height="32" src={imageUrl} /></Link>Volver atr&aacute;s</h2>

                    Error: {error.message}
                    <Footer />
                </React.Fragment>
            );
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <React.Fragment>
                    <Header page="product" />
                    <h2><Link to="/">
                        <img alt="Flecha atras" width="32" height="32" src={imageUrl} /></Link>Volver atr&aacute;s</h2>

                    <Product product={product} />
                    <Footer />
                </React.Fragment>
            );
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.code) {
            fetch(Configuration.buildServerUrl("/productos/item/" + this.props.match.params.code))
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error) {
                        this.setState({
                            isLoaded: true,
                            error: result
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                            product: result
                        });
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }
    }
}

export default FullProduct;