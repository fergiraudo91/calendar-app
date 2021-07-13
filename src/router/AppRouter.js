import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { checking, uid } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  useEffect(() => {

      dispatch(startChecking());
    
  }, [dispatch]);

  if (checking) {
    return (
      <div className="d-flex justify-content-center align-items-center v-h">
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid} />
          <PrivateRoute exact path="/" component={CalendarScreen} isAuthenticated={!!uid} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};
