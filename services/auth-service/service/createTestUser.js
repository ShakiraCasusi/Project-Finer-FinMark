const bcrypt = require('bcrypt');
const sequelize = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const hashed = await bcrypt.hash('admin0408', 10);

  const user = await User.create({
    email: 'casusishakira28@gmail.com',
    password: hashed,
    role: 'admin'
  });

  console.log('Test user created:', user.email);
  process.exit();
};

run().catch(console.error);
