import { Server } from 'socket.io';
import getUserid from './getUserid';
import getRecaptchaScore from './getRecaptchaScore';
// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://www.youtube.com/watch?v=ZKEqqIO7n-k
// https://socket.io/docs/v3/emitting-events/
const following = {};
const cookies = {};

const incrementCookies = (userid) => {
  if (cookies[userid] === undefined) cookies[userid] = 0;
  cookies[userid] += 1;
};
const getCookies = (userid) => (userid ? cookies[userid] : 0);

const follow = (userid, followed) => {
  following[userid] = followed;
};

const handler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
      console.log(`connection to socket: ${socket.id}`);
      // https://medium.com/@sergeisizov/using-recaptcha-v3-with-node-js-6a4b7bc67209
      // https://developers.google.com/recaptcha/docs/v3
      // https://www.google.com/recaptcha/admin/create
      // https://developers.google.com/recaptcha/docs/verify
      socket.on('cookie', async (arg) => {
        const score = await getRecaptchaScore(arg.token);
        const userid = await getUserid(arg.idToken);
        incrementCookies(userid);

        if (score <= 0.7) console.log(`bot detected with score: ${score}`);
        else
          console.log(
            `user: ${userid} click registered with score: ${score} on socket: ${socket.id}`
          );
        setTimeout(() => {
          const delta = userid
            ? getCookies(userid) - arg.cookieCount
            : -arg.cookieCount;
          console.log(
            `sending server cookie count: ${getCookies(
              userid
            )} with delta: ${delta} to user: ${userid} through socket: ${
              socket.id
            }`
          );
          io.to(socket.id).emit('cookie', {
            cookieCount: getCookies(userid),
            delta: delta,
          });
        });
      });
    });
    io.on('disconnect', async (socket) => {
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
