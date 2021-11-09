import styles from '../styles/GoogleButtons.module.css';
import consts from './consts';
import Button from '../components/Button';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = (props) => {
  const onSignIn = (response) => {
    // console.log(response);
    const idToken = response.tokenId;
    console.log(`logged into Google with ID: ${idToken}`);
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

const GoogleLogoutButton = (props) => {
  const onLogOut = () => {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('logged out of Google');
    });
    props.onSuccess(null);
  };
  return <Button onClick={onLogOut}>Logout</Button>;
};

export { GoogleLoginButton, GoogleLogoutButton };
