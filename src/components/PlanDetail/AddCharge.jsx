import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { Alert } from '@material-ui/lab';
import "../Product/product.css";
import Button from '@material-ui/core/Button';

class AddCharge extends Component {
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
    let doctype = document.getElementById('dtype');    
    let docdocument = document.getElementById("document");
    if ( doctype.value.length <= 30 && docdocument.value.length <= 30) {
      let object = {};
      let formData = new FormData(e.target);
      formData.forEach((value, key) => {
        object[key] = value;
      });
      object.plan = this.state.plan;
      let json = JSON.stringify(object);
      axios({
        method: "post",
        url: "http://localhost:8080/productbilling/plans/charge",
        data: json,
        headers: { "Content-Type": "application/json" }
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
              let err = document.getElementById('errr');
              err.style.visibility="visible"
              err.innerText = "Details Added Successfully"
              document.getElementById('mff').reset();
              doctype.focus();
            })
          });
        });
      }).catch(err=>console.log(err.response)
      )
    } else {
      if (doctype.value.length > 30) {
        let err = document.getElementById('errr');
        err.style.visibility="visible"
        err.innerText = "Unrecognized Type"
      } else {
        let err = document.getElementById('errr');
        err.style.visibility="visible"
        err.innerText = "Unrecognized Document";
      }
    }
  };
  render() {
    return (
      <>
        <Alert id="errr" className="text-center p-4 mt-5" severity="error"></Alert>
        <form
          onSubmit={this.submitHandler}
          className="col-md-8 offset-md-2 card card-body mt-5 p-4" id="mff"
        >
          <h6 className="mb-4"> Add Charge Details</h6>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="dtype"
                label="Type"
                variant="outlined"
                required
                type="text"
                name="chargeType"
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

export default AddCharge;
