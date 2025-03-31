const User = require('../models/User');

class UserController {
  // Get all users
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new user
  async store(req, res) {
    const { nome, email } = req.body;
    try {
      const id = await User.create({ nome, email });
      res.status(201).json({ message: "Usuário criado!", id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single user
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.error('Error in show method:', error);
      res.status(500).json({ error: error.message });
    }
  }

  // Update a user
  async update(req, res) {
    const { nome, email } = req.body;
    try {
      const updated = await User.update(req.params.id, { nome, email });
      if (!updated.length) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(updated[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a user
  async destroy(req, res) {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted.length) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController(); 