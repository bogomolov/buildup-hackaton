import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {authRoutes, publicRoutes} from 'src/utils/routes';
import {Login_Route} from './utils/constants';

const AppRouter = () => {
    return (
        <Switch>
            {authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component = {Component} exact />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component = {Component} exact />
            )}
            <Redirect to = {Login_Route} />
        </Switch>
    );
};

export default AppRouter;
