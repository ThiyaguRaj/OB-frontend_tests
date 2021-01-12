import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import axios from "axios";
import "../Product/product.css";
import Button from '@material-ui/core/Button';

class UpdateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    }
  }
  componentDidMount() {
    this.setState({ detail: JSON.parse(localStorage.getItem("detail")) })
  }
  submitHandler = (e) => {
    e.preventDefault();
    const doctype = document.getElementById("type");
    const docdocument = document.getElementById("unit");
    if (doctype.value.length <= 30 && docdocument.value.length <= 10) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.plan = this.state.detail.plan
      let json = JSON.stringify(object);
      axios({
        method: "put",
        url: "http://localhost:8080/productbilling/plans/detail",
        data: json,
        headers: { "Content-Type": "application/json" }
      }).then(resp => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.detail.plan.product.productId}`,
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          axios({
            method: "get",
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" },
          }).then((resp) => {
            axios({
              method: "get",
              url: `http://localhost:8080/productbilling/plans/plan/${this.state.detail.plan.planId}`,
              headers: { "Content-Type": "application/json" },
            }).then((resp) => {
              localStorage.setItem("plandet", JSON.stringify(resp.data.data));
              this.props.history.push({
                pathname: "/details",
              });
            })
            localStorage.setItem("products", JSON.stringify(resp.data.data));
          });
          localStorage.setItem("product", JSON.stringify(resp.data.data));
        });
      })
    } else {
      if (doctype.value.length > 30) {
        doctype.value = "";
        doctype.placeholder = "Unrecognized Type";
      } else {
        docdocument.value = "";
        docdocument.placeholder = "Unrecognized Unit";
      }
    }
  };
  render() {
    return (
      <>
        <form
          onSubmit={this.submitHandler}
          className="col-md-8 offset-md-2 card card-body mt-5 p-4" id="mff"
        >
          <h6 className="mb-4"> Update Plan Details</h6>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="serviceType"
            value={this.state.detail.serviceType}
            className=" mt-2 mb-2"
          />

          <div className="row">
            <div className="col-md-6">
              <TextField
                id="detail"
                label="Detail"
                variant="outlined"
                required
                type="number"
                name="detail"
                className=" mt-2 mb-2 side"
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="unit"
                label="Unit"
                variant="outlined"
                type="text"
                required
                value={this.state.detail.unit}
                name="unit"
                className=" mt-2 mb-2 side"
              />
            </div>
          </div>

          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit" className="lbut">
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default UpdateDetail;