import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import '../Product/product.css'

class DisplayDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        this.setState({ data: JSON.parse(localStorage.getItem("plandet")) });
    }
    render() {
        return (
            <>
                <div className="">
                    <Alert severity="info">
                        This table below displays  — <strong>All the available details for plan with ID {this.state.data.planId} !</strong>
                    </Alert>
                    <div className="col-md-8 m-auto">
                        <table responsive className="col-md-8 mb-5 tablist m-auto">
                            <thead>
                                <tr className="text-center">
                                    <th>Type</th>
                                    <th>
                                        Detail
                                      </th>
                                    <th>Unit</th>
                                    <th>
                                        Update
                                      </th>
                                    <th>
                                        Remove
                                      </th>

                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(localStorage.getItem("plandet")).detail.map((det) => (
                                    <tr className="text-center">
                                        <td>
                                            {det.serviceType}
                                        </td>
                                        <td>
                                            {det.detail}
                                        </td>
                                        <td>
                                            {det.unit.toUpperCase()}
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary" onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                        product: {
                                                            productId: JSON.parse(localStorage.getItem("product")).productId
                                                        }
                                                    }

                                                    localStorage.setItem("detail", JSON.stringify(det));
                                                    this.props.history.push("/updatedetail")
                                                }}>
                                                Update
                                          </Button>
                                        </td>
                                        <td>
                                            <IconButton aria-label="delete"
                                                onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                    };
                                                    console.log(det);

                                                    axios({
                                                        method: "delete",
                                                        url:
                                                            "http://localhost:8080/productbilling/plans/detail",
                                                        data: JSON.stringify(det),
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                    }).then((resp) => {
                                                        axios({
                                                            method: "get",
                                                            url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("product")).productId}`,
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        }).then((resp) => {
                                                            axios({
                                                                method: "get",
                                                                url:
                                                                    "http://localhost:8080/productbilling/products",
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                },
                                                            }).then((resp) => {
                                                                localStorage.setItem(
                                                                    "products",
                                                                    JSON.stringify(
                                                                        resp.data.data
                                                                    )
                                                                );
                                                                axios({
                                                                    method: 'get',
                                                                    url:
                                                                        `http://localhost:8080/productbilling/plans/plan/${this.state.data.planId}`,
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/json",
                                                                    }
                                                                }).then(resp => {
                                                                    let val = resp.data.data;
                                                                    val.product = {
                                                                        productId: JSON.parse(localStorage.getItem("product")).productId
                                                                    }
                                                                    localStorage.setItem(
                                                                        "plan",
                                                                        JSON.stringify(val)
                                                                    );
                                                                    localStorage.setItem(
                                                                        "plandet",
                                                                        JSON.stringify(resp.data.data)

                                                                    );
                                                                    this.props.history.push({
                                                                        pathname: "/details",
                                                                    });
                                                                })
                                                            });
                                                            localStorage.setItem(
                                                                "product",
                                                                JSON.stringify(
                                                                    resp.data.data
                                                                )
                                                            );
                                                        });
                                                    })
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <Alert severity="info" className="mt-4">
                        This table below displays  — <strong>All the OneTime Charges for plan with ID {this.state.data.planId} !</strong>
                    </Alert>
                    <div className="col-md-8 m-auto">
                        <table responsive className="col-md-8 mb-5 tablist ml-auto mr-auto">
                            <thead>
                                <tr className="text-center">
                                    <th>Type</th>
                                    <th>
                                        Charge
                                      </th>
                                    <th>
                                        Document
                                      </th>
                                    <th>
                                        Update
                                      </th>
                                    <th>
                                        Remove
                                      </th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(localStorage.getItem("plandet")).charge.map((det) => (
                                    <tr className="text-center">
                                        <td>
                                            {det.chargeType}
                                        </td>
                                        <td>
                                            RS. {det.charge}
                                        </td>
                                        <td>
                                            {det.document}
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary" onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                        product: {
                                                            productId: JSON.parse(localStorage.getItem("product")).productId
                                                        }
                                                    }
                                                    localStorage.setItem("charge", JSON.stringify(det));
                                                    this.props.history.push("/updatecharge")
                                                }}>
                                                Update
                                          </Button>
                                        </td>
                                        <td>
                                            <IconButton aria-label="delete" onClick={() => {
                                                det.plan = {
                                                    planId: this.state.data.planId,
                                                };
                                                axios({
                                                    method: "delete",
                                                    url:
                                                        "http://localhost:8080/productbilling/plans/charge",
                                                    data: JSON.stringify(det),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }).then((resp) => {
                                                    axios({
                                                        method: "get",
                                                        url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("product")).productId}`,
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                    }).then((resp) => {
                                                        axios({
                                                            method: "get",
                                                            url:
                                                                "http://localhost:8080/productbilling/products",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        }).then((resp) => {
                                                            localStorage.setItem(
                                                                "products",
                                                                JSON.stringify(
                                                                    resp.data.data
                                                                )
                                                            );
                                                            axios({
                                                                method: 'get',
                                                                url:
                                                                    `http://localhost:8080/productbilling/plans/plan/${this.state.data.planId}`,
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                }
                                                            }).then(resp => {
                                                                let val = resp.data.data;
                                                                val.product = {
                                                                    productId: JSON.parse(localStorage.getItem("product")).productId
                                                                }
                                                                localStorage.setItem(
                                                                    "plan",
                                                                    JSON.stringify(val)
                                                                );
                                                                localStorage.setItem(
                                                                    "plandet",
                                                                    JSON.stringify(resp.data.data)

                                                                );
                                                                this.props.history.push({
                                                                    pathname: "/details",
                                                                });
                                                            })
                                                        });
                                                        localStorage.setItem(
                                                            "product",
                                                            JSON.stringify(
                                                                resp.data.data
                                                            )
                                                        );
                                                    });
                                                })
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Alert severity="info" className="mt-4">
                        This table below displays  — <strong>All the Overage Charges for plan with ID {this.state.data.planId} !</strong>
                    </Alert>
                    <div className="col-md-8 m-auto">
                        <table responsive className="col-md-8 mb-5 tablist ml-auto mr-auto">
                            <thead>
                                <tr className="text-center">
                                    <th>Type</th>
                                    <th>Service</th>
                                    <th>Unit</th>
                                    <th>Charge</th>
                                    <th>Update</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(localStorage.getItem("plandet")).due.map((det) => (
                                    <tr className="text-center">
                                        <td>{det.overageType}</td>
                                        <td>
                                            {det.overageService}
                                        </td>
                                        <td>{det.unit}</td>
                                        <td>RS. {det.serviceCost}</td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary" onClick={() => {
                                                    det.plan = {
                                                        planId: this.state.data.planId,
                                                        product: {
                                                            productId: JSON.parse(localStorage.getItem("product")).productId
                                                        }
                                                    }
                                                    localStorage.setItem("due", JSON.stringify(det));
                                                    this.props.history.push("/updateoverdue")
                                                }}>
                                                Update
                                          </Button>
                                        </td>
                                        <td>
                                            <IconButton aria-label="delete" onClick={() => {
                                                det.plan = {
                                                    planId: this.state.data.planId,
                                                };
                                                axios({
                                                    method: "delete",
                                                    url:
                                                        "http://localhost:8080/productbilling/plans/overdue",
                                                    data: JSON.stringify(det),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }).then((resp) => {
                                                    axios({
                                                        method: "get",
                                                        url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("product")).productId}`,
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                    }).then((resp) => {
                                                        axios({
                                                            method: "get",
                                                            url:
                                                                "http://localhost:8080/productbilling/products",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                        }).then((resp) => {
                                                            localStorage.setItem(
                                                                "products",
                                                                JSON.stringify(
                                                                    resp.data.data
                                                                )
                                                            );
                                                            axios({
                                                                method: 'get',
                                                                url:
                                                                    `http://localhost:8080/productbilling/plans/plan/${this.state.data.planId}`,
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                }
                                                            }).then(resp => {
                                                                let val = resp.data.data;
                                                                val.product = {
                                                                    productId: JSON.parse(localStorage.getItem("product")).productId
                                                                }
                                                                localStorage.setItem(
                                                                    "plan",
                                                                    JSON.stringify(val)
                                                                );
                                                                localStorage.setItem(
                                                                    "plandet",
                                                                    JSON.stringify(resp.data.data)

                                                                );
                                                                this.props.history.push({
                                                                    pathname: "/details",
                                                                });
                                                            })
                                                        });
                                                        localStorage.setItem(
                                                            "product",
                                                            JSON.stringify(
                                                                resp.data.data
                                                            )
                                                        );
                                                    });
                                                })
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default DisplayDetails;