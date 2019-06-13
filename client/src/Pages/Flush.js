import React from 'react';
import { Redirect } from 'react-router-dom';

class Flush extends React.Component {
    render() {
        return <Redirect to='/' />
    }

    componentDidMount() {
        localStorage.removeItem("products");
        localStorage.removeItem("filteredCategory");
    }
}

export default Flush;