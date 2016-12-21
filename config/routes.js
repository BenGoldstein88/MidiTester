
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from '../src/components/Main';
import Home from '../src/components/Home';


export default (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={Home} />
        </Route>
    </Router>
    );