// scripts/createAdmin.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');
const User = require('../models/user');
const Admin = require('../models/admin');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('🔌 Conectado ao banco de dados com sucesso.');

    const email = 'admin@laurem.com.br';
    const password = 'liszt@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário base
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      role: "admin",
      name: 'Administrador',
    });

    // Criação do admin
    const admin = await Admin.create({
      user_id: user.id,
      email: user.email,
      phone: '(11) 99999-0000',
      role: 'superadmin',
    });

    console.log('✅ Admin criado com sucesso!');
    console.log(`🆔 ID: ${admin.id}`);
    console.log(`📧 Email: ${admin.email}`);
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
  } finally {
    await sequelize.close();
    console.log('🔒 Conexão encerrada.');
  }
}

createAdmin();
