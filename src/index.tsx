import React, { ComponentType, ElementType } from 'react';
import { Redirect, Route } from 'react-router-dom';

export interface Rule<R extends object> {
    allow: (ruleProps?: R) => boolean;
    redirect: string;
}

interface Props<T extends object, R extends object> {
    rules?: Array<Rule<R>>;
    path: string;
    componentProps?: T;
    ruleProps?: R;
    component: ElementType | ComponentType;
    exact?: boolean;
    routeKey?: string;
}

const ProtectedRoute = <T extends object, R extends object>(props: Props<T, R>) => {
    const {
        rules,
        ruleProps,
        component,
        path,
        exact,
        routeKey
    } = props;

    const failedRule = rules?.find((rule: Rule<R>) => !rule.allow(ruleProps));
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
                <Component
                    { ...routeProps }
                    { ...(props.componentProps ?? {}) }
                />
            ) }
        />
    );
};
// TODO add prop-types for non-ts libs

export default ProtectedRoute;
