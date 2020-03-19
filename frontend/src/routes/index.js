import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Deliveryman from '../pages/Deliveryman';
import Order from '../pages/Order';
import Problem from '../pages/Problem';
import Recipient from '../pages/Recipient';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveryman" component={Deliveryman} />
      <Route path="/order" component={Order} />
      <Route path="/problem" component={Problem} />
      <Route path="/recipient" component={Recipient} />
    </Switch>
  );
}
