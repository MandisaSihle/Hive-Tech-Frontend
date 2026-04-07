// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import createStore from './reduxs/store/store';
// import App from './App';
// import { Provider } from 'react-redux';
// // import { ConnectedRouter } from 'connected-react-router';
// import { BrowserRouter  } from 'react-router-dom';
// import * as History from 'history';

// const history = History.createBrowserHistory();
// const store = createStore(history);
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//     <Provider store={store}>
//      <BrowserRouter>
//       <App />
//      </BrowserRouter>
//     </Provider>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

// import store from './reduxs/store/store';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client"; // ✅ IMPORTANT CHANGE
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./reduxs/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);