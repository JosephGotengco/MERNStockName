import React, { Component } from "react";

import { Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from 'react-router'
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

import "bootstrap/dist/css/bootstrap.min.css";

// Scenes
import Home2 from "./scenes/Home2";
import Error404 from "./scenes/Error404";
import Trading from "./scenes/Trading2";
import Dashboard from "./scenes/Dashboard";
import Admin from "./scenes/Admin";

export const history = createBrowserHistory();

const { store, persistor } = configureStore();

class App extends Component {
  state = {
    currentLink: ''
  };

  componentDidUpdate() {
    var currentLink = window.location.href.split("/");
    currentLink = currentLink[currentLink.length - 1];
    this.setState({ currentLink });
    console.log(currentLink);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Home2} />
                <Route exact path="/trading" component={Trading} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="*" component={Error404} />
              </Switch>
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
