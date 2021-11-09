import React, { Component, useState } from 'react';
import styles from '../styles/GoogleLoginButton.module.css';
import consts from '../components/consts';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = (props) => {
  const onSignIn = (response) => {
    // console.log(response);
    const idToken = response.tokenId;
    console.log(`logged into Google with ID: ${idToken}`);
    props.socket.socket.emit('googleSignIn', { idToken: idToken });
    props.onSuccess(idToken);
  };

  return (
    <GoogleLogin
      clientId={consts.oAuth2_client_ID}
      buttonText="Login with Google"
      onSuccess={onSignIn}
      onFailure={onSignIn}
      cookiePolicy={'single_host_origin'}
      className={styles.GoogleLoginButton}
    />
  );
};

export default GoogleLoginButton;
