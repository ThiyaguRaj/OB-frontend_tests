import React, { Component } from "react";
import "./product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("product")).plan === []) {
      document.getElementById("plans").style.display = "none";
      let er = document.getElementById('err');
      er.style.display = "block";
      er.innerText = "No plans found";
    }
    this.setState({ detail: JSON.parse(localStorage.getItem("product")) });
  }
  render() {
    return (
      <>
        <Alert id="err" className="text-center p-2 mb-4 col-md-6 offset-md-3" severity="error"></Alert>
        <Alert onClose={() => {document.getElementById('info').style.visibility = "hidden";}} id="info" className="col-md-11 m-auto" severity="warning">The table below holds the list of available Plans belongs to Product of ID {this.state.detail.productId}</Alert>
        <div className="mt-5" id="plans">
          {
            <>
              <div className="container">
                <TableContainer component={Paper} className="">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow className="tab">
                        <TableCell className="hng">PlanAmount</TableCell>
                        <TableCell className="hng">PlanFrequency</TableCell>
                        <TableCell className="hng">Type</TableCell>
                        <TableCell className="hng">Update</TableCell>
                        <TableCell className="hng">Remove</TableCell>
                        <TableCell className="hng">Detail</TableCell>
                        <TableCell className="hng">Add</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {JSON.parse(localStorage.getItem("product")).plan.map(
                        (plan) => (
                          <>
                            <TableRow className="" key={plan.planId}>
                              <TableCell component="th" scope="row">
                                RS. {plan.planAmount}
                              </TableCell>
                              <TableCell>
                                {plan.planFrequency} Day/s
                              </TableCell>
                              <TableCell>{plan.type}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "upplan",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/updateplan",
                                    });
                                  }}
                                >
                                  Update
                                </Button>
                              </TableCell>
                              <TableCell>
                                <IconButton aria-label="delete"
                                  onClick={() => {
                                    axios({
                                      method: "delete",
                                      url: `http://localhost:8080/productbilling/plans/${plan.planId}`,
                                    }).then((resp) => {
                                      axios({
                                        method: "get",
                                        url: `http://localhost:8080/productbilling/products/${this.state.detail.productId}`,
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      }).then((resp) => {
                                        axios({
                                          method: "get",
                                          url:
                                            "http://localhost:8080/productbilling/products",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }).then((resp) => {
                                          localStorage.setItem(
                                            "products",
                                            JSON.stringify(resp.data.data)
                                          );
                                        });
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(resp.data.data)
                                        );
                                        this.props.history.push({
                                          pathname: "/view",
                                        });
                                      });
                                    });
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  className=""
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push({
                                      pathname: "/details",
                                    });
                                  }}
                                >
                                  Details
                                          </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  className=""
                                  onClick={() => {
                                    plan.product = {
                                      productId: this.state.detail.productId,
                                    };
                                    localStorage.setItem(
                                      "plandet",
                                      JSON.stringify(plan)
                                    );
                                    this.props.history.push("/adddetails")
                                  }} >Add

                              </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          }
        </div>
      </>
    );
  }
}

export default withRouter(ViewProduct);