const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const user = await dbClient.users.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const sha1Password = crypto.createHash('sha1').update(password).digest('hex');
    const newUser = await dbClient.users.insertOne({ email, password: sha1Password });

    return res.status(201).json({ email: newUser.ops[0].email, id: newUser.ops[0]._id });
  }
}

module.exports = UsersController;