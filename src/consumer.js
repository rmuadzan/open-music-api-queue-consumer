require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService = require('./service/postgres/PlaylistsService');
const PlaylistsSongsService = require('./service/postgres/PlaylistsSongsService');
const MailService = require('./service/mail/MailService');
const Listener = require('./listener');
const config = require('./utils/config');

const init = async () => {
  const playlistsService = new PlaylistsService();
  const playlistsSongsService = new PlaylistsSongsService();
  const mailService = new MailService();
  const listener = new Listener(playlistsService, playlistsSongsService, mailService);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });
};

init();
