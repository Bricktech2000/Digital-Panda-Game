import React, { Component } from 'react';
import styles from '../styles/Button.module.css';

const Button = (props) => {
  return (
    <div className={styles.Button} {...props}>
      {props.children}
    </div>
  );
};

export default Button;
