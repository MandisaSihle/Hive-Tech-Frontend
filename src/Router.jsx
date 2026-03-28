import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Cart from './containers/cart';
import Checkout from './containers/checkout';
import Homepage from './containers/homepage';
import Landing from './containers/landing';
import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import ThankYou from './containers/thankYou';
import { fetchUserFromLocalStorage } from './reduxs/users/operations';
import { getUser } from './reduxs/users/selectors';

const Router = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const user = getUser(selector);
    const token = user ? user.token : null;

    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());
        // eslint-disable-next-line
    }, []);

    return (
        <Switch>
            <Route exact path={'/'} component={token ? Homepage : Landing} />
            <Route exact path={'/sign-in'} component={SignIn} />
            <Route exact path={'/sign-up'} component={SignUp} />
            <Route exact path={'/cart'} component={Cart} />
            <Route exact path={'/checkout'} component={Checkout} />
            <Route exact path={'/thank-you'} component={ThankYou} />
        </Switch>
    );
};

export default Router;