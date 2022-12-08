import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

import ContextStore from "./_context/Store";
import RouteLink from "./routes/RoutesLink";
class App extends Component {
  constructor(props) {
      super(props);
  }

  static get propTypes() {
      return {
          history: PropTypes.object.isRequired,
          store: PropTypes.object.isRequired,
      };
  }

  render() {
      return (
          <Provider store={this.props.store}>
              <PersistGate loading={null} persistor={this.props.persistor}>
                  <ConnectedRouter history={this.props.history}>
                    <ContextStore>
                      <RouteLink/>
                    </ContextStore>
                  </ConnectedRouter>
              </PersistGate>
          </Provider>
      );
  }
}

export default (App);