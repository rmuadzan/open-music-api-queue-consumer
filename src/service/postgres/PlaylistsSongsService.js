const { Pool } = require('pg');

class PlaylistsSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsSongs(playlistId) {
    const query = {
      text: `SELECT playlists_songs.id AS "id", songs.title AS "title", songs.performer AS "performer"
      FROM playlists_songs 
      LEFT JOIN playlists ON playlists.id = playlists_songs.playlist_id 
      LEFT JOIN songs ON songs.id = playlists_songs.song_id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistsSongsService;
