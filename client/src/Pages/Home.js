import React from 'react';
import Products from './Products';
import Configuration from '../configuration';

class Home extends React.Component {
    products;

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            currentFilter: localStorage.getItem("filteredCategory"),
            error: null,
            isLoaded: false,
            products: []
        };

        this.eliminarFiltro = this.eliminarFiltro.bind(this);
    }

    eliminarFiltro(e) {
        localStorage.removeItem("products");
        localStorage.removeItem("filteredCategory");
        this.setState({
            currentFilter: ""
        })

        this.componentDidMount();
    }

    render() {
        let { error, isLoaded, products, url, currentFilter } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            if (products.length > 0) {
                return (
                    <React.Fragment>
                        {currentFilter? <button onClick={this.eliminarFiltro}>Eliminar filtro {currentFilter}</button>: ""}
                        <Products key={url} filterByCategory={this.filterByCategory} products={products} />
                    </React.Fragment>
                );
            }
            else {
                return (
                    <div>No hay productos disponibles en este momento.</div>
                );
            }
        }
    }

    /**
     * Si hay un listado memorizado mostrarlo porque tal vez esta filtrado.
     * Si no hacer el query al REST API filtrando por categoria si existiese
     * una.
     */
    componentDidMount() {
        const json = localStorage.getItem("products");
        const products = JSON.parse(json);

        if (products && products.length > 0) {
            this.setState({
                isLoaded: true,
                currentFilter: localStorage.getItem("filteredCategory"),
                products
            })
        }
        else {
            let url = "/productos";

            if (this.props.category) {
                url += "/categoria/" + this.props.category;
                localStorage.setItem("filteredCategory", this.props.category);
            }

            fetch(Configuration.buildServerUrl(url))
            .then(res => res.json() )
            .then(
                (products) => {
                    this.setState({
                        url,
                        currentFilter: this.props.category,
                        isLoaded: true,
                        products
                    });
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

    /**
     * Recordar el ultimo listado por si hace click en un producto y despues
     * vuelve a la pantalla principal.
     */
    componentDidUpdate() {
        const products = JSON.stringify(this.state.products);
        if (products.length > 0) {
            localStorage.setItem("products", products);
        }
    }

    /**
     * React no refresca el componente actual si esta visible y se cambia el
     * contenido a traves de <Link>, asi que transforme los links en botones,
     * atrapo el evento en este nivel y cambio el key de <Productos> cuando
     * se cambia el filtro, React crea un nuevo componente cuando el key
     * cambia.
     */
    filterByCategory = async (e) => {
        let category = e.target.outerText;
        let url = "/productos/categoria/" + category;

        if (category) {
            localStorage.setItem("filteredCategory", category);

            fetch(Configuration.buildServerUrl(url))
            .then(res => res.json())
            .then(
                (products) => {
                    this.setState({
                        url,
                        isLoaded: true,
                        currentFilter: category,
                        products
                    });
                },
                (error) => {
                    this.setState({
                        url,
                        isLoaded: true,
                        error
                    });
                }
            );
        }
    }
}

export default Home;