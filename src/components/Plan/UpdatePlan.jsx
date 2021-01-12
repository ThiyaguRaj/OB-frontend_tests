import React, { Component } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';

class UpdatePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: {},
    };
  }
  componentDidMount() {
    document.getElementById('duration').focus();
    this.setState({ plan: JSON.parse(localStorage.getItem("upplan")) });
  }

  submitHandler = (e) => {
    e.preventDefault();
    let object = {};
    let formData = new FormData(e.target);
    formData.forEach((value, key) => {
      object[key] = value;
    });
    object.planId = this.state.plan.planId;
    object.product = this.state.plan.product;
    let json = JSON.stringify(object);
    axios({
      method: 'put',
      url: 'http://localhost:8080/productbilling/plans',
      data: json,
      headers: { "Content-Type": "application/json" }
    }).then(resp => {
      axios({
        method: 'get',
        url: `http://localhost:8080/productbilling/products/${this.state.plan.product.productId}`,
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
        })
        localStorage.setItem(
          "product",
          JSON.stringify(resp.data.data)
        );
        this.props.history.push({
          pathname: "/view"
        });
      })
    }).catch(err => {
      console.log(err.response);

      if (err.response.data.error) {
        document.getElementById('duration').value = "";
        document.getElementById('duration').focus();
        document.getElementById('cost').value = "";

        let er = document.getElementById('err');
        er.style.display = "block";
        er.innerText = err.response.data.data;
      }
    })
  }

  render() {
    return (
      <>
        <Alert id="err" className="text-center p-4" severity="error"></Alert>
        <form
          className="col-md-4 offset-md-4 card card-body mb-5 mt-5 p-4"
          onSubmit={this.submitHandler}
        >
          <h5 className=" text-center mt-4 mb-4">Update Plan</h5><hr />
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            required
            value={this.state.plan.type}
            type="text"
            name="type"
            className=" mt-2 mb-2"
          />
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="duration"
                label="Duration"
                variant="outlined"
                required
                type="number"
                name="planFrequency"
                className=" mt-2 mb-2"
              />
            </div>
            <div className="col-md-6">
              <TextField
                id="cost"
                label="Amount"
                variant="outlined"
                required
                type="number"
                name="planAmount"
                className=" mt-2 mb-4"
              />
            </div>
          </div>
          <Button variant="contained" size="large" color="primary" type="submit" className="mt-4 mb-4">
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default UpdatePlan;
