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

interface CompProps {
    text: string;
}

const Comp = (props: CompProps) => {
    const {
        text
    } = props;
    return (
        <h1>{ text }</h1>
    );
}

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
                componentProps={ {
                    text: 'Hello World'
                } }
            />
        </MemoryRouter>
    );
};

describe('ProtectedRoute', () => {
    it('runs', () => {
        console.log('Hello');
        const component = doMount({
            component: Comp,
            path: '/hello'
        });
        console.log(component.debug()); // TODO delete this
    });

    it('renders component with no rules', () => {
        throw new Error();
    });

    it('renders component with successful rule', () => {
        throw new Error();
    });

    it('renders component with failed rule', () => {
        throw new Error();
    });
});
