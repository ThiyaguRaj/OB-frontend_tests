import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import axios from "axios";
import "../Product/product.css";
import Button from '@material-ui/core/Button';

class UpdateCharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charge: {}
    }
  }
  componentDidMount() {
    this.setState({ charge: JSON.parse(localStorage.getItem("charge")) });
  }
  submitHandler = (e) => {
    e.preventDefault();
    const doctype = document.getElementById("type");
    const docdocument = document.getElementById("document");
    if (doctype.value.length <= 30 && docdocument.value.length <= 30) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.plan = this.state.charge.plan
      let json = JSON.stringify(object);
      axios({
        method: "put",
        url: "http://localhost:8080/productbilling/plans/charge",
        data: json,
        headers: { "Content-Type": "application/json" }
      }).then(resp => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.charge.plan.product.productId}`,
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          axios({
            method: "get",
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" },
          }).then((resp) => {
            axios({
              method: "get",
              url: `http://localhost:8080/productbilling/plans/plan/${this.state.charge.plan.planId}`,
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
        docdocument.placeholder = "Unrecognized Document";
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
          <h6 className="mb-4"> Update Charge Details</h6>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="type"
                label="Type"
                variant="outlined"
                required
                type="text"
                name="chargeType"
                value={this.state.charge.chargeType}
                className=" mt-2 mb-2 side"
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="charge"
                label="Amount"
                variant="outlined"
                required
                type="number"
                name="charge"
                className=" mt-2 mb-2 side"
              />
            </div>
          </div>

          <TextField
            id="document"
            label="Document"
            variant="outlined"
            type="text"
            name="document"
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

export default UpdateCharge;