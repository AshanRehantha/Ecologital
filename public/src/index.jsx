import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore, history } from './_redux/_store';
import { persistStore } from 'redux-persist';
import  App  from './App';
import './styles/style.scss';



const root = ReactDOM.createRoot(document.getElementById("app"));

const store = configureStore();
const persistor = persistStore(store);

root.render(
    <React.StrictMode>
      <Router>
        <App history={history} store={store} persistor={persistor}/>
      </Router>
    </React.StrictMode>
  );

if (module.hot) {
    module.hot.accept('./App', () => {
        renderApp(App);
    });
}