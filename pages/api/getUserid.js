import consts from '../../components/consts';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(consts.oAuth2_client_ID);

// https://developers.google.com/identity/sign-in/web/backend-auth
export default async function getuserid(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: consts.oAuth2_client_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return userid;
  } catch (e) {
    return null;
  }
}
