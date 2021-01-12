import React, { Component } from 'react';
import './product.css';
import List from './ProductList';
import Add from './AddProduct';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addClick: false,
            proClick: true,
        }
    }
    handlepro = () => {
        this.setState({ addClick: false })
        this.setState({ proClick: true })
    }
    handleadd = () => {
        this.setState({ proClick: false })
        this.setState({ addClick: true })
    }
    render() {
        return (
            <>
                <div>
                    <div className="text-center btns pt-4 pb-5 bg-dark ">
                        <div className="text-light">
                            <h1 className="head">
                                Lead to Revenue
                                Redefined</h1><hr/>
                                <p>
                                An intelligent end-to-end
                                subscription management and
                                billing solution in ONE platform</p>
                        </div>
                        <div className="mt-5 mb-5 bg-dark">
                            <button className="funcb mr-3 btn btn-outline-primary " onClick={this.handlepro}>
                                Products
                        </button>
                            <button className="funcb mr-3 btn btn-primary" onClick={this.handleadd}>
                                + Product
                        </button>
                        </div>

                    </div>

                </div>
                <div className="list">
                    {this.state.proClick && <List />}
                    {this.state.addClick && <Add />}
                </div>
            </>
        );
    }
}

export default Product;