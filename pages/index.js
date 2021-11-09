import React from 'react';
import NextHead from 'next/head';
import styles from '../styles/index.module.css';

export default function Index() {
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
      </NextHead>
      <div class={styles.Index}>
        <h1>Digital Panda Game</h1>
        <p>An idle game or something</p>
      </div>
    </React.Fragment>
  );
}
