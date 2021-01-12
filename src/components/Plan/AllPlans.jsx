import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import '../Product/product.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function AllPlan(props) {
    const [data, setData] = useState([]);
    useEffect(init, [])
    function init() {
        axios({
            method: 'get',
            url: 'http://localhost:8080/productbilling/plans'
        }).then(resp => {
            if (Array.isArray(resp.data.data)) {
                setData(resp.data.data)
            } else {
                setData([]);
            }
        }).catch(err => {
            try {
                let msg = document.getElementById('eror');
                msg.innerHTML = err.response.data.data;
                setData([]);
            } catch (error) {
                let msg = document.getElementById('eror');
                msg.innerHTML="No response from the server and also please check whether the server is Working properly";
            }
        })
    }

    return (
        <>
            <Alert severity="info" id="eror" >
                This table below displays  — <strong>All the available Plans !</strong>
            </Alert>
            <div className="col-md-10 m-auto">
                <table responsive className="col-md-8 mb-5 tablist m-auto">
                    <thead>
                        <tr className="text-center">
                            <th className="p-3">Plan ID</th>
                            <th>Cost</th>
                            <th>Duration</th>
                            <th>Type</th>
                            <th>Product ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(val => (
                                <tr key={val.planId} className="text-center">
                                    <td className="p-2">{val.planId}</td>
                                    <td>{val.planAmount}</td>
                                    <td>{val.planFrequency}</td>
                                    <td>{val.type}</td>
                                    <td>{val.product.productId}</td>
                                    <td> <IconButton aria-label="delete"
                                        onClick={() => {
                                            axios({
                                                method: "delete",
                                                url: `http://localhost:8080/productbilling/plans/${val.planId}`,
                                            }).then((resp) => {
                                                init();
                                            }).catch(err => {
                                                setData([]);
                                                let msg = document.getElementById('eror');
                                                msg.innerHTML = err.response.data.data;
                                            })
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}