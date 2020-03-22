import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Deliveryman from '../pages/Deliveryman';
import Order from '../pages/Order';
import NewOrder from '../pages/Order/NewOrder';
import Problem from '../pages/Problem';
import Recipient from '../pages/Recipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" exact component={Order} isPrivate />
      <Route path="/order/new" component={NewOrder} isPrivate />

      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
    </Switch>
  );
}
