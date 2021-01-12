import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme'
import { render, fireEvent, cleanup, getByTestId } from '@testing-library/react'
import AddDetail from '../components/PlanDetail/AddDetail';
// import axiosMock from '../_mocks_/axios';
import AddCharge from '../components/PlanDetail/AddCharge';
import mockAxios from 'jest-mock-axios';
import Select from '@material-ui/core/Select';

describe("Test add detail component", () => {
    afterEach(cleanup);
    const DeatilComp = shallow(<AddDetail />);

    test("Test Unit field value and its event", () => {
        expect(DeatilComp.find(Select).length).toEqual(2)
    })

    test("Test Type field value and its event", () => {
        DeatilComp.find(Select).at(0).simulate('change', { target: { value: "Data" } });
        expect(DeatilComp.state().type).toBe('Data');
    })

    test("Test Unit field value and its event", () => {
        DeatilComp.find(Select).at(0).simulate('change', { target: { value: 'GB' } });
        expect(DeatilComp.state().type).toBe('GB');
    })

    // test("Simulate submit event of form", () => {
    //     DeatilComp.find('form').simulate('submit', {
    //         preventDefault: () => {
    //         }
    //     });
    //     axiosMock.post.mockResolvedValue({ data: { error: true } });
    //     expect(axiosMock.post).toHaveBeenCalledTimes(1);
    // })

    afterEach(() => {
        mockAxios.reset();
    })

    it("Simulate submit event of form", () => {
        let catchFn = jest.fn(),
            thenFn = jest.fn();

        // DeatilComp.find('form').simulate('submit', {
        //     preventDefault: () => {
        //     }
        // })
        DeatilComp.instance().submitHandler({
            preventDefault: () => {
            }
        }).then(thenFn)
            .catch(catchFn);

        expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:8080/productbilling/plans/detail', { data: { msg: "Some data" } });
        let responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);
        expect(thenFn).toHaveBeenCalledWith('SERVER SAYS HELLO!');

        // catch should not have been called
        expect(catchFn).not.toHaveBeenCalled();
        // expect(mockAxios.post).toHaveBeenCalledTimes(1);
    })

    test("test from class", () => {
        const root = create(<AddDetail />).root;
        const ele = root.findByType("form");
        expect(ele.props.className.includes("col-md-8")).toBe(true);
    })

    test("test Initial state", () => {
        expect(DeatilComp.instance().state.plan).toBe(null);
    })

    test("Testr Header", () => {
        const { getByText } = render(<AddDetail />);
        expect(getByText(/Add/i).textContent).toEqual("Add Plan Detail");
    })

    test("Test Form basics", () => {
        const ele = render(<AddDetail />);
        const mtForm = DeatilComp.find("form");
        expect(mtForm.length).toBe(1)
    })

})

// describe("Test Add Charge",()=>{
//     afterEach(cleanup);
//     const DeatilComp = shallow(<AddDetail />);

//     test("")
// })