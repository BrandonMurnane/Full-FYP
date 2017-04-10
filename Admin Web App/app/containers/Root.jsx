import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';

import BoothList from './BoothList';
import NewBooth from './NewBooth';
import EditBooth from './EditBooth';

import EventList from './EventList';
import NewEvent from './NewEvent';
import EditEvent from './EditEvent';

import CategoryList from './CategoryList';
import NewCategory from './NewCategory';
import EditCategory from './EditCategory';

import UserGroupList from './UserGroupList';
import NewUserGroup from './NewUserGroup';
import EditUserGroup from './EditUserGroup';

import Visits from './Visits';

import HomePage from './HomePage.jsx';


export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={ store } >
        <Router history={history}>
          <Route component={ HomePage }>
          <Redirect from="/" to="booths" />
            <Route path='booths' component={ BoothList } />
            <Route path='booths/new' component={ NewBooth} />
            <Route path='booths/:key' component={ EditBooth } />

            <Route path='events' component={ EventList } />
            <Route path='events/new' component={ NewEvent} />
            <Route path='events/:key' component={ EditEvent } />

            <Route path='categories' component={ CategoryList } />
            <Route path='categories/new' component={ NewCategory} />
            <Route path='categories/:key' component={ EditCategory } />

            <Route path='userGroups' component={ UserGroupList } />
            <Route path='userGroups/new' component={ NewUserGroup} />
            <Route path='userGroups/:key' component={ EditUserGroup } />

             <Route path='visits' component={ Visits } />


            </Route>
        </Router>
      </Provider>
    );
  }
}
