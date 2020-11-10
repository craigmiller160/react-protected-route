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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
var ProtectedRoute = function (props) {
    var rules = props.rules, ruleProps = props.ruleProps, component = props.component, path = props.path, exact = props.exact, routeKey = props.routeKey, componentProps = props.componentProps;
    var failedRule = rules === null || rules === void 0 ? void 0 : rules.find(function (rule) { return !rule.allow(ruleProps); });
    if (failedRule) {
        return React.createElement(Redirect, { to: failedRule.redirect });
    }
    var Component = component;
    return (React.createElement(Route, { path: path, exact: exact, key: routeKey, render: function (routeProps) { return (React.createElement(Component, __assign({}, routeProps, componentProps))); } }));
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
};
ProtectedRoute.defaultProps = {
    rules: [],
    componentProps: {},
    ruleProps: {},
    exact: false,
    routeKey: ''
};
export default ProtectedRoute;
