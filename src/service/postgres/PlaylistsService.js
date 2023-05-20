const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  // tidak perlu melakukan validasi ketersediaan data,
  // karena sudah dilakukan di producer. Apakah tepat(?)
  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id AS "id", playlists.name AS "name"
      FROM playlists 
      LEFT JOIN users on users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = PlaylistsService;
