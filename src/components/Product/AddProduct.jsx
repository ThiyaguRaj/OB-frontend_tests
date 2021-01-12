import React, { Component } from 'react';
import './product.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { TextField } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Button from '@material-ui/core/Button';  

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            data: {}
        }
    }
    componentDidMount(){
        document.getElementById('name').focus();
    }
    setName = (e) => {
        this.setState({ name: e.target.value });
    }
    setType = (e) => {
        this.setState({ type: e.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        let name = document.getElementById('name')
        let type = document.getElementById('type')
        if (name.value.length <= 30 && type.value.length <= 30) {
            var body = {
                productName: this.state.name,
                productType: this.state.type
            }
            let json = JSON.stringify(body);

            axios({
                method: 'post',
                url: 'http://localhost:8080/productbilling/products',
                data: json,
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
                    name.value = "";
                    type.value = "";
                    name.focus();
                    let er = document.getElementById('err');
                    er.style.display = "block";
                    er.innerText = "Product Added Successfullly";
                })

            }).catch(err => {
                if (err.response.data.error) {
                    name.value = "";
                    type.value = "";
                    name.focus();
                    let er = document.getElementById('err');
                    er.style.display = "block";
                    er.innerText = err.response.data.data;
                }

            })
        } else {
            if (name.value.length > 30) {
                name.value = "";
                name.focus();
                let er = document.getElementById('err');
                er.style.display = "block";
                er.innerText = "Please check Your Product Name. Input value is too long";
            } else {
                type.value = "";
                type.focus();
                let er = document.getElementById('err');
                er.style.display = "block";
                er.innerText = "Please check Your Product Type. Input value is too long";
            }
        }
    }
    render() {
        return (
            <>
                <Alert id="err" className="text-center p-4" severity="error"></Alert>
                <form id="frm" className="col-md-8 offset-md-2 card card-body mt-5 p-4" id="mff" onSubmit={this.submitHandler}>
                <h6 className="mb-4"> Add a new Product</h6>
                    <TextField id="name" label="Name" placeholder="Enter Product Name" variant="outlined" required type="text" onChange={this.setName} className=" mt-4 mb-4" />
                    <TextField id="type" label="Type" placeholder="Enter Product Type" variant="outlined" required type="text" onChange={this.setType} className=" mb-2 mt-2" />
                    <Button variant="contained" size="large" color="primary" type="submit" className="mt- mb-4 lbut">
                        Submit
                    </Button>
                </form>
            </>
        );
    }
}

export default withRouter(AddProduct);