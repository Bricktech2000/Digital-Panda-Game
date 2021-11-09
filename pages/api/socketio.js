import { Server } from 'socket.io';
import consts from '../../components/consts';
// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://www.youtube.com/watch?v=ZKEqqIO7n-k
// https://socket.io/docs/v3/emitting-events/

const db = {};

const handler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
      console.log(`connection to socket from ID: ${socket.id}`);
      // https://medium.com/@sergeisizov/using-recaptcha-v3-with-node-js-6a4b7bc67209
      // https://developers.google.com/recaptcha/docs/v3
      // https://www.google.com/recaptcha/admin/create
      // https://developers.google.com/recaptcha/docs/verify
      socket.on('updateClicks', (arg) => {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${consts.reCAPTCHA_secret_key}&response=${arg.token}`;
        fetch(url, { method: 'POST' })
          .then((res) => res.json())
          .then((json) => {
            if (!json.success || json.score <= 0.7)
              console.log(`bot detected with score: ${json.score}`);
            else
              console.log(
                `${
                  db[arg.idToken] ? 'logged in' : 'logged out'
                } human click registered with score: ${json.score}`
              );
          });
      });
      socket.on('googleSignIn', (arg) => {
        // https://developers.google.com/identity/sign-in/web/backend-auth
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(consts.oAuth2_client_ID);
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: arg.idToken,
            audience: consts.oAuth2_client_ID,
          });
          const payload = ticket.getPayload();
          const userid = payload['sub'];
          db[arg.idToken] = true;
          console.log(
            `user logged into google with ID: ${socket.id} ${userid}`
          );
        }
        verify().catch(console.error);
      });
    });
    io.on('disconnect', (socket) => {
      console.log(`disconnected from socket with ID: ${socket.id}`);
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
