import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';  
import Alert from '@material-ui/lab/Alert';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }
  componentDidMount() {
    document.getElementById('type').focus();
    this.setState({ product: JSON.parse(localStorage.getItem("uppro")) });
  }
  submitHandler = (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const type = document.getElementById("type");

    if (name.value.length <= 30 && type.value.length <= 30) {
      var body = {
        productId: this.state.product.productId,
        productName: name.value,
        productType: type.value,
      };
      let json = JSON.stringify(body);

      axios({
        method: "put",
        url: "http://localhost:8080/productbilling/products",
        data: json,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        axios({
          method: "get",
          url: "http://localhost:8080/productbilling/products",
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          localStorage.setItem("products", JSON.stringify(resp.data.data));
          this.props.history.push({
            pathname: "/products",
            userData: resp.data.data,
          });
        });
      });
    } else {
      if (name.value.length > 30) {
        name.value = "";
        name.placeholder = "Name is too long";
      } else {
        type.value = "";
        document.getElementById('err').style.display="block";
       document.getElementById('err').innerText="Please check the Type Input. Value is too long."
      }
    }
  };
  render() {
    return (
      <>
       <Alert id="err" className="text-center p-4" severity="error"></Alert>
        <form
          className="up card card-body col-md-4 offset-md-4 mt-5"
          onSubmit={this.submitHandler}
        >
          <h5 className="text-center text- mt-5 mb-5"> Update Product</h5><hr/>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={this.state.product.productName}
            required
            type="text"
            name="productName"
            className=" mt-2 mb-2"
          />
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="productType"
            className=" mt-2 mb-2"
          />
          <Button variant="contained" size="large" color="primary" type="submit" className="mt-4 mb-4">
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default withRouter(UpdateProduct);
