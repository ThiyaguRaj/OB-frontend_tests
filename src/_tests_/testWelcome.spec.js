import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Alert } from '@material-ui/lab';
import { create } from 'react-test-renderer';
import Welcome from '../components/Navbar/Welcome';

describe("Test nav Component", () => {
    const root = shallow(<Welcome />);
    test("test Header", () => {
        expect(toJson(root)).toMatchSnapshot();
    })

    test("test header content", () => {
        const comp = create(<Welcome />).root;
        const ele = comp.findByType("h1");
        expect(ele.props.children).toEqual("Lead to Revenue Redefined")
    })

    test("Test divs", () => {
        const count = root.find("div");
        expect(count.length).toBe(4);
    })

    test("Test h1", () => {
        const count = root.find("h1");
        expect(count.length).toBe(1);
    })

    test("Test p", () => {
        const count = root.find("p")
        expect(count.length).toEqual(1)
    })

    test("Test small", () => {
        const count = root.find("small")
        expect(count.length).toEqual(1)
    })
})