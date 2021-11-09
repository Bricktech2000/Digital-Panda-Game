import { useEffect } from 'react';
import React from 'react';
import NextHead from 'next/head';
import Button from '../components/Button';
import consts from '../components/consts';
import styles from '../styles/index.module.css';

import io from 'socket.io-client';

export default () => {
  var socket;
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      socket = io();
      socket.on('connect', () => {
        console.log(`connected with ID: ${socket.id}`);
      });
      socket.on('disconnect', () => {
        console.log(`disconnected`);
      });
    });
  });
  const updateClicks = () => {
    console.log('click registered');
    grecaptcha.ready(() => {
      grecaptcha
        .execute(consts.reCAPTCHA_site_key, { action: 'updateClicks' })
        .then((token) => socket.emit('updateClicks', { token: token }));
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
      </NextHead>
      <div className={styles.Index}>
        <h1>Digital Panda Game</h1>
        <p>An idle game or something</p>
        <Button onClick={updateClicks}>Cookie</Button>
      </div>
    </React.Fragment>
  );
};
