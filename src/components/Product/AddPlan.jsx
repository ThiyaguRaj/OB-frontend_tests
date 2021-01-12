import React, { Component } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

class AddPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      type: ''
    };
  }
  componentDidMount() {
    document.getElementById('type').focus();
    this.setState({ product: JSON.parse(localStorage.getItem("product")) });
  }
  handleChange = (event) => {
    this.setState({ type: event.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let object = {};
    let formData = new FormData(e.target);
    formData.forEach((value, key) => {
      object[key] = value;
    });
    object.product = this.state.product;
    let json = JSON.stringify(object);
    axios({
      method: "post",
      url: "http://localhost:8080/productbilling/plans",
      data: json,
      headers: { "Content-Type": "application/json" }
    }).then((resp) => {
      axios({
        method: "get",
        url: `http://localhost:8080/productbilling/products/${this.state.product.productId}`,
        headers: { "Content-Type": "application/json" },
      }).then((resp) => {
        axios({
          method: "get",
          url: "http://localhost:8080/productbilling/products",
          headers: { "Content-Type": "application/json" },
        }).then((resp) => {
          localStorage.setItem("products", JSON.stringify(resp.data.data));
        });
        localStorage.setItem("product", JSON.stringify(resp.data.data));
        document.getElementById('duration').value = "";
        document.getElementById('cost').value = "";
        let typ=document.getElementById('type');
        typ.focus();
        let er = document.getElementById('err');
        er.style.display = "block";
        er.innerText = "Plan Added Successfuly";
      })
    }).catch(err => {
      if (err.response.data.error) {
        document.getElementById('duration').value = "";
        document.getElementById('cost').value = "";
        let er = document.getElementById('err');
        er.style.display = "block";
        er.innerText = err.response.data.data;
      }
    })
  };
  render() {
    return (
      <>
        <Alert id="err" className="text-center p-4" severity="error"></Alert>
        <form
          onSubmit={this.submitHandler}
          className="col-md-8 offset-md-2 card card-body mt-5 p-4" id="mff"
        >
           <h6 className="mb-4"> Add Plan Details</h6>
          <FormControl className=" mt-2 mb-2" variant="outlined">
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select required
              id="type"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
              label="Type"
            >
              <MenuItem value="Bundle">Bundle</MenuItem>
              <MenuItem value="Data">Data</MenuItem>
              <MenuItem value="SMS">Sms</MenuItem>
              <MenuItem value="Voice">Voice</MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="UltraPremium">UltraPremium</MenuItem>
              <MenuItem value="Furnished">Furnished</MenuItem>
            </Select>
          </FormControl>
          <div className="row">
            <div className="col-md-6">
              <TextField
                id="duration"
                label="Duration"
                variant="outlined"
                required
                type="number"
                name="planFrequency"
                className=" mt-2 mb-2 side"
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
                className=" mt-2 mb-4 side"
              />
            </div>
          </div>
          <Button variant="contained" size="small" color="primary" type="submit" className="mt-4 mb-4 lbut">
            Submit
          </Button>
        </form>
      </>
    );
  }
}

export default AddPlan;
