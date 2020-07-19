import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProtectedRoute from '../src';
import { MemoryRouter } from 'react-router';

// TODO move all dependencies to dev and make them peer dependencies

configure({ adapter: new Adapter() });

const Comp = () => (
    <h1>Hello World</h1>
);

describe('First test', () => {
    it('runs', () => {
        const component = mount(
            <MemoryRouter initialEntries={ ['/'] }>
                <ProtectedRoute
                    component={ Comp }
                    path="/hello"
                />
            </MemoryRouter>
        );
        console.log(component.debug());
    });
});
