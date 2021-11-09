import { Server } from 'socket.io';
// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://www.youtube.com/watch?v=ZKEqqIO7n-k

const handler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    io.on('connection', (socket) => {
      console.log(`connection from ID: ${socket.id}`);
    });
    io.on('disconnect', (socket) => {
      console.log(`connection from ID: ${socket.id}`);
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
