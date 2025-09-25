import app from './src/app.js';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // await prisma.$connect();
    console.log('✅ Conectado ao banco de dados');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📖 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar servidor:', err);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('\n🛑 Encerrando servidor...');
  // await prisma.$disconnect();
  console.log('✅ Conexão com banco encerrada');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Encerrando servidor...');
  // await prisma.$disconnect();
  console.log('✅ Conexão com banco encerrada');
  process.exit(0);
});

startServer();
