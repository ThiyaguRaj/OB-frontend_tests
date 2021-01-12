import React from 'react';
import { Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './wel.css'

export default function Welcome(params) {
    return (
        <>
            <div className="con card card-body mt-0 bg-light">
                <div className="text-dark thd text-center mb-1">
                    <h1 className="head text-muted">
                        Lead to Revenue
                        Redefined
                </h1><hr />
                    <Alert severity="warning" className="text-center">An intelligent end-to-end
                    subscription management and
                    billing solution in ONE platform</Alert>
                </div>
            </div>
            <div className="con card card-body mt-2 bg-light">
                <div className="text-dark thd text-center mb-1">
                    <Alert className="text-center  bg-dark text-success">What we do ?</Alert>
                    <p className="text-left">
                        <small> In recent years, we have seen a significant shift where customers are increasingly wanting product experiences that are more optimized, instantaneous, flexible and streamlined.</small></p>
                </div>
            </div>
        </>
    )
}