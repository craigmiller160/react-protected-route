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
                <Component
                    { ...routeProps }
                    { ...componentProps }
                />
            ) }
        />
    );
};
ProtectedRoute.propTypes = {
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
