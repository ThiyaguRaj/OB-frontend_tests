import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import './product.css';


export default function Trash(props) {

    const [data, setData] = useState([]);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("trash")));
    }, [])
    return (
        <>
            <Alert onClose={() => { document.getElementById('info').style.visibility = "hidden"; }} id="info" className="" severity="info">The table below holds the list of Removed products — check it out!</Alert>
            <div className="col-md-8 m-auto">
                <table responsive className="col-md-8 mb-5 tablist m-auto">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(val => (
                                <tr className="text-center">
                                    <td>{val.productId}</td>
                                    <td>{val.productName}</td>
                                    <td>{val.productType}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}