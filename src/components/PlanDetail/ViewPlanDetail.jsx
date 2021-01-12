import React, { Component } from 'react';
import axios from 'axios';
import { Table } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
class ViewPlanDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plandet: {}
            // details:{},
            // charges:{},
            // dues:{}
        }
    }
    // componentDidMount() {        
        
    //     this.setState({ details: JSON.parse(localStorage.getItem("viewplan")).detail });
    //     this.setState({ charges: JSON.parse(localStorage.getItem("viewplan")).charge });
    //     this.setState({ dues: JSON.parse(localStorage.getItem("viewplan")).due});
    // }
    componentDidMount() {
        this.setState({plandet:JSON.parse(localStorage.getItem("plandet"))});
      }
    render() {
        return (
            <>
                <div>
                    <Table responsive className="mb-5 tablist ml-auto mr-auto">
                        <thead>
                            <tr className="tab text-light">
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
                            {JSON.parse(localStorage.getItem("viewplan")).detail.map((det) => (
                                <tr>
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
                                            color="primary" onClick={() => {
                                                det.plan = {
                                                    planId: this.state.plandet.planId,
                                                    product: {
                                                        productId: JSON.parse(localStorage.getItem("viewplan")).product.productId
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
                                                    planId: this.state.plandet.planId,
                                                };
                                                axios({
                                                    method: "delete",
                                                    url:
                                                        "http://localhost:8080/productbilling/plans/detail",
                                                    plandet: JSON.stringify(det),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }).then((resp) => {
                                                    axios({
                                                        method: "get",
                                                        url: `http://localhost:8080/productbilling/products/${JSON.parse(localStorage.getItem("viewplan")).product.productId}`,
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
                                                                    `http://localhost:8080/productbilling/plans/plan/${this.state.plandet.planId}`,
                                                                headers: {
                                                                    "Content-Type":
                                                                        "application/json",
                                                                }
                                                            }).then(resp=>{
                                                                let val=resp.data.data;
                                                                val.product={
                                                                    productId:JSON.parse(localStorage.getItem("viewplan")).product.productId
                                                                  }
                                                                  localStorage.setItem(
                                                                      "plan",
                                                                      JSON.stringify(val)
                                                                  );
                                                            })
                                                        });
                                                        localStorage.setItem(
                                                            "product",
                                                            JSON.stringify(
                                                                resp.data.data
                                                            )
                                                        );
                                                        this.props.history.push({
                                                            pathname: "/detail",
                                                        });
                                                    });
                                                });
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>

            </>
        );
    }
}

export default ViewPlanDetail;