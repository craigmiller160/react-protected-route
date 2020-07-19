import React, { ElementType } from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProtectedRoute from '../src';
import { MemoryRouter } from 'react-router';

// TODO move all dependencies to dev and make them peer dependencies

configure({ adapter: new Adapter() });

interface MountProps {
    initialEntries?: Array<string>;
    path: string;
    component: ElementType;
}

const Comp = () => (
    <h1>Hello World</h1>
);

const doMount = (props: MountProps) => {
    const {
        initialEntries,
        path,
        component
    } = props;

    const Component = component;

    return mount(
        <MemoryRouter initialEntries={ initialEntries ?? ['/'] }>
            <ProtectedRoute
                component={ Component }
                path={ path }
            />
        </MemoryRouter>
    );
};

describe('ProtectedRoute', () => {
    it('runs', () => {
        console.log('Hello');
        doMount({
            component: Comp,
            path: '/hello'
        });
    })
});
