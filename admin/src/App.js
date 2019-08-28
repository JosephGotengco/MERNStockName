import React, { Component } from "react";

import { Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import SideNavbar from "./components/SideNavbar";

import "bootstrap/dist/css/bootstrap.min.css";

// Scenes
import Dashboard from "./scenes/Dashboard";

export const history = createBrowserHistory();

const { store, persistor } = configureStore();

class App extends Component {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <div className='d-flex'>
            <SideNavbar />
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
              </Switch>
            </Router>
            </div>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
