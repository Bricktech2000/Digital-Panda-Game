import { useEffect, useState } from 'react';
import React from 'react';
import NextHead from 'next/head';
import Button from '../components/Button';
import consts from '../components/consts';
import styles from '../styles/index.module.css';
import {
  GoogleLoginButton,
  GoogleLogoutButton,
} from '../components/GoogleButtons';

import io from 'socket.io-client';

var socket = {};

export default () => {
  const [idToken, setIdToken] = useState(null);
  const [cookieCount, setCookieCount] = useState(0);

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      socket.socket = io();
      socket.socket.on('connect', () => {
        console.log(`connected to socket: ${socket.socket.id}`);
      });
      socket.socket.on('disconnect', () => {
        console.log(`disconnected from socket`);
      });
      socket.socket.on('cookie', (arg) => {
        console.log(
          `received server cookie count: ${arg.cookieCount} with delta: ${arg.delta}`
        );
        setCookieCount((cookies) => cookies + arg.delta);
        if (arg.delta != 0) {
          console.log(
            `client desynced with server, setting absolute client cookie count: ${arg.cookieCount}`
          );
          setCookieCount(arg.cookieCount);
        }
      });
    });
  }, []);
  const updateClicks = () => {
    setCookieCount((cookies) => cookies + 1);
    cookieCount++;
    console.log(`sending client cookie count: ${cookieCount}`);
    grecaptcha.ready(() => {
      grecaptcha
        .execute(consts.reCAPTCHA_site_key, { action: 'cookie' })
        .then((token) => {
          socket.socket.emit('cookie', {
            token: token,
            idToken: idToken,
            cookieCount: cookieCount,
          });
        });
    });
  };

  return (
    <React.Fragment>
      <NextHead>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0"
        />
        <title>Digital Panda Game</title>
        <meta name="description" content="" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* https://fonts.google.com/specimen/Roboto?category=Sans+Serif */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        {/* https://fonts.google.com/specimen/Inconsolata?category=Monospace */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* https://developers.google.com/recaptcha/docs/v3 */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${consts.reCAPTCHA_site_key}`}
        ></script>
        {/* https://developers.google.com/identity/sign-in/web/sign-in */}
        {/* https://stackoverflow.com/questions/42566296/google-api-authentication-not-valid-origin-for-the-client */}
        {/* https://stackoverflow.com/questions/31610461/using-google-sign-in-button-with-react */}
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta
          name="google-signin-client_id"
          content={consts.oAuth2_client_ID}
        ></meta>
      </NextHead>
      <div className={styles.Index}>
        <h1>Digital Panda Game</h1>
        <p>An idle game or something</p>
        {idToken !== null ? (
          <React.Fragment>
            <Button onClick={updateClicks}>Cookies: {cookieCount}</Button>
            <GoogleLogoutButton socket={socket} onSuccess={setIdToken} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button onClick={updateClicks}>Cookies: {cookieCount}</Button>
            <GoogleLoginButton socket={socket} onSuccess={setIdToken} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
