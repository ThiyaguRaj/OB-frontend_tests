import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import axios from "axios";
import "../Product/product.css";

class UpdateOverdue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      due: {}
    }
  }
  componentDidMount() {
    this.setState({ due: JSON.parse(localStorage.getItem("due")) })
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
      object.plan = this.state.due.plan
      let json = JSON.stringify(object);
      axios({
        method: "put",
        url: "http://localhost:8080/productbilling/plans/overdue",
        data: json,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.due.plan.product.productId}`,
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          axios({
            method: "get",
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" },
          }).then((resp) => {
            axios({
              method: "get",
              url: `http://localhost:8080/productbilling/plans/plan/${this.state.due.plan.planId}`,
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
          <h6 className="mb-4"> Update Overdue Details</h6>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            type="text"
            name="overageType"
            value={this.state.due.overageType}
            className=" mt-2 mb-2"
          />

          <div className="row">
            <div className="col-md-6">
              <TextField
                id="service"
                label="Service"
                variant="outlined"
                required
                type="number"
                name="overageService"
                className=" mt-2 mb-2 side"
              />
            </div>
            <div className="col-md-6">

              <TextField
                id="unit"
                label="Unit"
                variant="outlined"
                required
                type="text"
                name="unit"
                value={this.state.due.unit}
                className=" mt-2 mb-2 side"
              />
            </div>
          </div>
          <TextField
            id="cost"
            label="Amount"
            variant="outlined"
            required
            step="0.1"
            type="number"
            name="serviceCost"
            className=" mt-2 mb-2"
          />

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

export default UpdateOverdue;