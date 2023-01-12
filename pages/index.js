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
import { fromB64, toB64 } from './api/base64';

import io from 'socket.io-client';

let socket = {};
const cookieCountRef = 0;
const idTokenRef = 0;

export default () => {
  const [idToken, setIdToken] = useState(null);
  const [userid, setUserid] = useState(null);
  const [cookieCount, setCookieCount] = useState(0);
  //that's  evil
  useEffect(() => (cookieCountRef = cookieCount), [cookieCount]);
  useEffect(() => (idTokenRef = idToken), [idToken]);

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
        // console.log(`received server cookie delta: ${arg.delta}`);
        if (arg.delta != 0) {
          console.log(
            `client desynced with server, using client cookie delta: ${arg.delta}`
          );
        }

        setTimeout(() => sendCookieCount(), 250);
        setCookieCount((cookies) => cookies + arg.delta);
      });
      socket.socket.on('suspicious', (arg) => {
        console.log(
          `server detected suspicious activity, requested new idToken`
        );
        setIdToken(null);
      });
    });
  }, []);

  const sendCookieCount = () => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(consts.reCAPTCHA_site_key, { action: 'cookie' })
        .then((token) => {
          // console.log(
          // `sending client cookie count: ${cookieCountRef} with reCAPTCHA token`
          // );
          socket.socket.emit('cookie', {
            token: token,
            idToken: idTokenRef,
            cookieCount: cookieCountRef,
          });
        });
    });
  };

  const updateClicks = (delta) => {
    setCookieCount((cookies) => cookies + delta);
  };

  const updateUserid = (userid) => {
    setUserid(toB64(parseInt(userid, 10)));
  };

  useEffect(() => updateClicks(0), [idToken]);
  useEffect(() => sendCookieCount(), []);

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
        <p>
          Current User ID:&nbsp;&nbsp;
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 'bold' }}>
            {userid}
          </span>
        </p>
        <Button onClick={() => updateClicks(1)}>Cookies: {cookieCount}</Button>
        {idToken !== null ? (
          <GoogleLogoutButton
            socket={socket}
            onSuccess={(idToken, userid) =>
              setIdToken(idToken) & updateUserid(userid)
            }
          />
        ) : (
          <GoogleLoginButton
            socket={socket}
            onSuccess={(idToken, userid) =>
              setIdToken(idToken) & updateUserid(userid)
            }
          />
        )}
      </div>
    </React.Fragment>
  );
};
