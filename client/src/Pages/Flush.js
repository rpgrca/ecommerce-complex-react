import React from 'react';
import { Navigate } from 'react-router-dom';

class Flush extends React.Component {
    render() {
        return <Navigate to='/' />
    }

    componentDidMount() {
        localStorage.removeItem("products");
        localStorage.removeItem("filteredCategory");
    }
}

export default Flush;