import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

configure({ enforceActions: "always" });

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  navigator.geolocation.getCurrentPosition(position => {
    store.setViewState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      zoom: 12
    });
  });
  store.fetchPages();
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  unsubscribe();
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
