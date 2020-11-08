/*
 * react-protected-route
 * Copyright (C) 2020 Craig Miller
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { ElementType } from 'react';
import { mount, configure, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import ProtectedRoute, { Rule } from '../src';

// TODO move all dependencies to dev and make them peer dependencies

configure({ adapter: new Adapter() });

interface RuleProps {
    allow: boolean;
}

interface MountProps {
    initialEntries?: Array<string>;
    path: string;
    component: ElementType;
    ruleProps?: RuleProps;
    rules?: Array<Rule<RuleProps>>;
}

interface CompProps {
    text: string;
}

const rule: Rule<RuleProps> = {
    allow: (ruleProps?: RuleProps) => ruleProps?.allow ?? false,
    redirect: '/'
};

const Comp = (props: CompProps) => {
    const {
        text
    } = props;
    return (
        <h1>{ text }</h1>
    );
};

const doMount = (props: MountProps) => {
    const {
        initialEntries,
        path,
        component,
        ruleProps,
        rules
    } = props;

    const Component = component;

    return mount(
        <MemoryRouter initialEntries={ initialEntries ?? [ '/' ] }>
            <ProtectedRoute
                component={ Component }
                path={ path }
                componentProps={ {
                    text: 'Hello World'
                } }
                ruleProps={ ruleProps }
                rules={ rules }
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

const testRedirect = (component: ReactWrapper) => {
    const redirect = component.find('Redirect');
    expect(redirect).toHaveLength(1);
    expect(redirect.props().to).toEqual('/');
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
            initialEntries: [ '/hello' ]
        };
        const component = doMount(props);
        expect(component.find('ProtectedRoute')).toHaveLength(1);
        testRoute(component, props);
        testComp(component);
    });

    it('renders component matching route with successful rule', () => {
        const props: MountProps = {
            component: Comp,
            path: '/hello',
            ruleProps: {
                allow: true
            },
            rules: [ rule ],
            initialEntries: [ '/hello' ]
        };
        const component = doMount(props);
        expect(component.find('ProtectedRoute')).toHaveLength(1);
        testRoute(component, props);
        testComp(component);
    });

    it('renders component matching route with failed rule', () => {
        const props: MountProps = {
            component: Comp,
            path: '/hello',
            ruleProps: {
                allow: false
            },
            rules: [ rule ],
            initialEntries: [ '/hello' ]
        };
        const component = doMount(props);
        expect(component.find('ProtectedRoute')).toHaveLength(1);
        expect(component.find('Route')).toHaveLength(0);
        expect(component.find('Comp')).toHaveLength(0);
        testRedirect(component);
    });
});
