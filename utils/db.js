const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.database = database;
    const url = `mongodb://${host}:${port}`;
    this.client = new MongoClient(url);
    this.client.connect().catch((err) => console.error(err));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const collection = this.client.db().collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = this.client.db().collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
