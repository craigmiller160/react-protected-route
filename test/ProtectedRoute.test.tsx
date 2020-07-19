import React, { ElementType } from 'react';
import { mount, configure, ReactWrapper } from 'enzyme';
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

const testRoute = (component: ReactWrapper, props: MountProps) => {
    const route: ReactWrapper = component.find('Route');
    expect(route).toHaveLength(1);
    expect(route.props()).toEqual(expect.objectContaining({
        path: props.path,
        exact: false,
        render: expect.any(Function)
    }));
};

const testComp = (component: ReactWrapper) => {
    const comp = component.find('Comp');
    expect(comp).toHaveLength(1);
    expect(comp.props()).toEqual({
        history: expect.any(Object),
        location: expect.any(Object),
        match: expect.any(Object),
        text: 'Hello World'
    });
};

describe('ProtectedRoute', () => {
    it('renders component when route doesn\'t match', () => {
        const props: MountProps = {
            component: Comp,
            path: '/hello'
        };
        const component = doMount(props);
        expect(component.find('ProtectedRoute')).toHaveLength(1);
        testRoute(component, props);
        expect(component.find('Comp')).toHaveLength(0);
    });

    it('renders component with no rules when route does match', () => {
        const props: MountProps = {
            component: Comp,
            path: '/hello',
            initialEntries: ['/hello']
        };
        const component = doMount(props);
        expect(component.find('ProtectedRoute')).toHaveLength(1);
        testRoute(component, props);
        testComp(component);
    });

    it('renders component matching route with successful rule', () => {
        throw new Error();
    });

    it('renders component matching route with failed rule', () => {
        throw new Error();
    });
});
