import React from "react";
import { Button, Card } from "antd";
import * as firebase from "firebase/app";
import "firebase/auth";

const signIn = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("user_likes");
  provider.addScope("user_location");
  await firebase.auth().signInWithPopup(provider);
};

const Login: React.SFC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    }}
  >
    <Button
      onClick={signIn}
      type="primary"
      icon="facebook"
      size="large"
      shape="round"
    >
      Sign in with Facebook
    </Button>
  </div>
);

export default Login;
