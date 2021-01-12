import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { Alert } from '@material-ui/lab';
import "../Product/product.css";
import Button from '@material-ui/core/Button';

class AddOverdue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
    };
  }
  componentDidMount() {
    this.setState({ plan: JSON.parse(localStorage.getItem("plandet")) });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const doctype = document.getElementById("tttype");
    const docdocument = document.getElementById("uunit");
    if (doctype.value.length <= 30 && docdocument.value.length <= 10) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.plan = this.state.plan;
      let json = JSON.stringify(object);
      axios({
        method: "post",
        url: "http://localhost:8080/productbilling/plans/overdue",
        data: json,
        headers: { "Content-Type": "application/json" },
      }).then(resp => {
        axios({
          method: "get",
          url: `http://localhost:8080/productbilling/products/${this.state.plan.product.productId}`,
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          localStorage.setItem("product", JSON.stringify(resp.data.data));
          axios({
            method: "get",
            url: "http://localhost:8080/productbilling/products",
            headers: { "Content-Type": "application/json" },
          }).then((resp) => {
            localStorage.setItem("products", JSON.stringify(resp.data.data));
            axios({
              method: "get",
              url: `http://localhost:8080/productbilling/plans/plan/${this.state.plan.planId}`,
              headers: { "Content-Type": "application/json" },
            }).then((resp) => {
              let val = resp.data.data;
              val.product = this.state.plan.product;
              localStorage.setItem("plandet", JSON.stringify(val));
              let err = document.getElementById('erro');
              err.style.visibility = "visible"
              err.innerText = "Overage Details Added Successfully"
              document.getElementById('mfff').reset();
              doctype.focus();
            })
          });
        });
      }).catch(err => console.log(err.response)
      )
    } else {
      if (doctype.value.length > 30) {
        let err = document.getElementById('erro');
        err.style.visibility = "visible"
        err.innerText = "Unrecognized Type"
        doctype.value = "";
        doctype.focus();
      } else {
        let err = document.getElementById('erro');
        err.style.visibility = "visible"
        err.innerText = "Unrecognized Unit"
        docdocument.value = "";
        docdocument.focus();
      }
    }
  };

  render() {
    return (
      <>
        <Alert id="erro" className="text-center p-4 mt-5" severity="success"></Alert>
        <form
          onSubmit={this.submitHandler}
          className="col-md-8 offset-md-2 card card-body mt-5 p-4" id="mfff"
        >
          <h6 className="mb-4"> Add Overdue Details</h6>
          <TextField
            id="tttype"
            label="Type"
            variant="outlined"
            placeholder="Overage type"
            required
            type="text"
            name="overageType"
            className=" mt-2 mb-2"
          />

          <div className="row">
            <div className="col-md-6">
              <TextField
                id="service"
                label="Service"
                variant="outlined"
                placeholder="Overage service"
                required
                type="number"
                name="overageService"
                className=" mt-2 mb-2 side"
              />
            </div>
            <div className="col-md-6">

              <TextField
                id="uunit"
                label="Unit"
                variant="outlined"
                placeholder="Overage service unit"
                required
                type="text"
                name="unit"
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

export default AddOverdue;
