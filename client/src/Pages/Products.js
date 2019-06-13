import React, { Component } from 'react';
import Product from './Product';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: props.products
        }
    }

    render() {
        if (this.state.products) {
            var items = this.state.products.map((product, index) => (
                <Product key={product.codigo} filterByCategory={this.props.filterByCategory} product={product} />
            ));

            return (
                <div className="products">{ items }</div>
            );
        }
        else {
            return (
                <div className="products">Sin productos en la lista.</div>
            );
        }
    }
}

export default Products;