import styles from '../styles/GoogleButtons.module.css';
import consts from './consts';
import Button from '../components/Button';
import GoogleLogin from 'react-google-login';
import { useEffect } from 'react';

const GoogleLoginButton = (props) => {
  const onSignIn = (response) => {
    // console.log(response);
    const idToken = response.tokenId;
    localStorage.setItem('GoogleResponse', JSON.stringify(response));
    console.log(`logged into Google with ID: ${idToken}`);
    props.onSuccess(idToken, response.wa);
  };

  useEffect(() => {
    if (localStorage.getItem('GoogleResponse') !== null)
      onSignIn(JSON.parse(localStorage.getItem('GoogleResponse')));
  }, []);

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

const GoogleLogoutButton = (props) => {
  const onLogOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('logged out of Google');
    });
    localStorage.removeItem('GoogleResponse');
    props.onSuccess(null, null);
  };
  return <Button onClick={onLogOut}>Logout</Button>;
};

export { GoogleLoginButton, GoogleLogoutButton };
