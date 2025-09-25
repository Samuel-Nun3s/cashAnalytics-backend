import dotenv, { configDotenv } from 'dotenv';

dotenv.config();

const validateRequiredEnvVars = () => {
  const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
  const missingVars = [];

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Variáveis de ambiente obrigatórias não encontradas:');
    missingVars.forEach(varName => {
      console.error(` - ${varName}`);
    });
    console.error(' Verifique seu arquivo .env');
    process.exit(1);
  }
};

const getSecretOrGenerate = (envVar, fallback) => {
  if (process.env.NODE_ENV === 'production' && !process.env[envVar]) {
    console.error(`❌ ${envVar} é obrigatório em produção!`);
    process.exit(1);
  }

  return process.env[envVar] || fallback;
};

if (process.env.NODE_ENV !== 'test') {
  validateRequiredEnvVars();
}

const config = {
  // Configs: Servidor
  server: {
    port: parseInt(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',

    // Configs de producao
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test'
  },

  // Configs: Banco de dados
  database: {
    url: process.env.DATABASE_URL,
    
    // Pool de conexões
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS) || 10,
    connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 10000, // 10s
    
    // Configurações de SSL
    sslMode: process.env.DB_SSL_MODE || 'prefer'
  },

  // Configs: JWT
  jwt: {
    // Secrets - NUNCA commitar valores reais!
    accessSecret: getSecretOrGenerate(
      'JWT_SECRET', 
      'dev-access-secret-change-in-production-12345'
    ),
    
    refreshSecret: getSecretOrGenerate(
      'JWT_REFRESH_SECRET', 
      'dev-refresh-secret-change-in-production-67890'
    ),
    
    // Durações dos tokens
    accessExpiration: process.env.JWT_EXPIRATION || '15m',
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    
    // Configurações do token
    issuer: process.env.JWT_ISSUER || 'minha-api',
    audience: process.env.JWT_AUDIENCE || 'meu-app',
    
    // Algoritmo de assinatura
    algorithm: 'HS256'
  },

  // Configs: Seguranca
  security: {
    // Configurações de senha
    password: {
      minLength: parseInt(process.env.PASSWORD_MIN_LENGTH) || 8,
      requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== 'false',
      requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== 'false',
      requireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS !== 'false',
      requireSpecialChars: process.env.PASSWORD_REQUIRE_SPECIAL !== 'false'
    },

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.COOKIE_SAME_SITE || 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      domain: process.env.COOKIE_DOMAIN || undefined
    },
    
    // Salt rounds para bcrypt
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12
  },

  api: {
    version: process.env.API_VERSION || '1.0.0',
    baseUrl: process.env.API_BASE_URL || `http://localhost:${parseInt(process.env.PORT) || 3000}`,
    timeout: parseInt(process.env.API_TIMEOUT) || 30000, // 30s
    
    // Rate limiting por endpoint
    endpoints: {
      auth: {
        rateLimit: 5, // 5 tentativas por 15 min
        timeout: 5000 // 5s
      },
      users: {
        rateLimit: 100, // 100 requests por 15 min
        timeout: 10000 // 10s
      }
    }
  }
}

config.debug = () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔧 Configurações da aplicação:');
    console.log(`   Ambiente: ${config.server.nodeEnv}`);
    console.log(`   Porta: ${config.server.port}`);
    console.log(`   Banco: ${config.database.url ? '✅ Configurado' : '❌ Não configurado'}`);
    console.log(`   JWT Access: ${config.jwt.accessSecret ? '✅ Configurado' : '❌ Não configurado'}`);
    console.log(`   JWT Refresh: ${config.jwt.refreshSecret ? '✅ Configurado' : '❌ Não configurado'}`);
    console.log(`   CORS Origin: ${Array.isArray(config.cors.origin) ? config.cors.origin.join(', ') : config.cors.origin}`);
    console.log(`   Rate Limit: ${config.rateLimit.maxRequests} req/${config.rateLimit.windowMs/60000}min`);
    console.log('');
  }
};

if (config.server.isProduction) {
  const criticalConfigs = [
    { key: 'DATABASE_URL', value: config.database.url },
    { key: 'JWT_SECRET', value: config.jwt.accessSecret },
    { key: 'JWT_REFRESH_SECRET', value: config.jwt.refreshSecret }
  ];

  const missing = criticalConfigs.filter(cfg => !cfg.value || cfg.value.includes('dev-'));

  if (missing.length > 0) {
    console.error('❌ Configurações críticas para produção não encontradas:');
    missing.forEach(cfg => console.error(`   - ${cfg.key}`));
    process.exit(1);
  }
}

export default config;