import React, { Component } from 'react';
import Charge from './AddCharge';
import Detail from './AddDetail';
import Due from './AddOverdue';

class AddAllPlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <div className="deatil">
                    <Detail/>
                </div>
                <div className="charge">
                    <Charge/>
                </div>
                <div className="due">
                    <Due/>
                </div>
            </>
         );
    }
}
 
export default AddAllPlanDetails;