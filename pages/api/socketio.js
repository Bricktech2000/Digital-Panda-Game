import { Server } from 'socket.io';
import consts from '../../components/consts';
// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://www.youtube.com/watch?v=ZKEqqIO7n-k
// https://socket.io/docs/v3/emitting-events/

const handler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
      console.log(`connection from ID: ${socket.id}`);
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
              console.log(`human click registered with score: ${json.score}`);
          });
      });
    });
    io.on('disconnect', (socket) => {
      console.log(`disconnected from ID: ${socket.id}`);
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
