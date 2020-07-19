import React, { ComponentType, ElementType } from 'react';
import PropTypes from 'prop-types';
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
        routeKey,
        componentProps
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
                    { ...componentProps }
                />
            ) }
        />
    );
};
ProtectedRoute.propTypes = {
    // rules: PropTypes.arrayOf(PropTypes.objectOf({
    //     allow: PropTypes.func,
    //     redirect: PropTypes.string
    // }))
    rules: PropTypes.array,
    path: PropTypes.string.isRequired,
    componentProps: PropTypes.object,
    ruleProps: PropTypes.object,
    component: PropTypes.elementType.isRequired,
    exact: PropTypes.bool,
    routeKey: PropTypes.string
};
ProtectedRoute.defaultProps = {
    rules: [],
    componentProps: {},
    ruleProps: {},
    exact: false,
    routeKey: ''
};

export default ProtectedRoute;
