import React, { Component } from 'react';
import axios from 'axios';

class RemoveProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }
    componentDidMount() {
        this.setState({ id: JSON.parse(localStorage.getItem("productdel")) });
    }
    removeHandle = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8080/productbilling/products/${this.state.id.productId}`,
            headers: { "Content-Type": "application/json" }
        }).then(resp => {
            axios({
                method: 'get',
                url: "http://localhost:8080/productbilling/products",
                headers: { "Content-Type": "application/json" }
            }).then(resp => {
                localStorage.setItem(
                    "products",
                    JSON.stringify(resp.data.data)
                );
                this.props.history.push({
                    pathname: "/home"
                });
            })
        })
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <div className=" bg-primary pt-5 pb-5 text-center">
                        <h1 className="text-center text-light">{this.state.id.productName} ({this.state.id.productType})</h1>
                    </div>
                    <button className="btn btn-danger mt-5" onClick={this.removeHandle}>Click Here to remove this Product</button>
                </div>
            </>
        );
    }
}

export default RemoveProduct;