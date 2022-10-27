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

import React, { ComponentType, ElementType } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export interface Rule<RuleProps extends object> {
    allow: (ruleProps?: RuleProps) => boolean;
    redirect: string;
}

interface Props<CompProps extends object, RuleProps extends object> {
    rules?: Array<Rule<RuleProps>>;
    path: string;
    componentProps?: CompProps;
    ruleProps?: RuleProps;
    component: ElementType | ComponentType;
    exact?: boolean;
    routeKey?: string;
}

const ProtectedRoute = <CompProps extends object, RuleProps extends object>(props: Props<CompProps, RuleProps>) => {
    const {
        rules,
        ruleProps,
        component,
        path,
        exact,
        routeKey,
        componentProps
    } = props;

    const failedRule = rules?.find((rule: Rule<RuleProps>) => !rule.allow(ruleProps));
    if (failedRule) {
        return <Redirect to={ failedRule.redirect } />;
    }

    const Component = component;

    return (
        <Route
            path={ path }
            exact={ exact }
            key={ routeKey }
            render={ (routeProps) => (
                <>
                    { /* @ts-ignore */ }
                    <Component
                        { ...routeProps }
                        { ...componentProps }
                    />
                </>
            ) }
        />
    );
};

ProtectedRoute.propTypes = {
    rules: PropTypes.arrayOf(PropTypes.shape({
        allow: PropTypes.func.isRequired,
        redirect: PropTypes.string.isRequired
    })),
    path: PropTypes.string.isRequired,
    componentProps: PropTypes.object,
    ruleProps: PropTypes.object,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    routeKey: PropTypes.string
} as {};
ProtectedRoute.defaultProps = {
    rules: [],
    componentProps: {},
    ruleProps: {},
    exact: false,
    routeKey: ''
};

export default ProtectedRoute;
