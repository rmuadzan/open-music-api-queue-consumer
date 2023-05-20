class Listener {
  constructor(playlistsService, playlistsSongsService, mailSender) {
    this._playlistsService = playlistsService;
    this._playlistsSongsService = playlistsSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this._playlistsService.getPlaylistById(playlistId);
      const songs = await this._playlistsSongsService.getPlaylistsSongs(playlists.id);
      const content = JSON.stringify({
        playlist: {
          ...playlists,
          songs,
        },
      });
      const result = await this._mailSender.sendEmail(targetEmail, content);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
