/*
  Warnings:

  - You are about to drop the `RefreshTokens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ai_reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `api_configurations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portfolio_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_watchlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usage_limits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RefreshTokens" DROP CONSTRAINT "RefreshTokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ai_reports" DROP CONSTRAINT "ai_reports_stockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ai_reports" DROP CONSTRAINT "ai_reports_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."portfolio_stocks" DROP CONSTRAINT "portfolio_stocks_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."portfolio_stocks" DROP CONSTRAINT "portfolio_stocks_stockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_prices" DROP CONSTRAINT "stock_prices_stockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_watchlist" DROP CONSTRAINT "stock_watchlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."usage_limits" DROP CONSTRAINT "usage_limits_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_preferences" DROP CONSTRAINT "user_preferences_userId_fkey";

-- DropTable
DROP TABLE "public"."RefreshTokens";

-- DropTable
DROP TABLE "public"."ai_reports";

-- DropTable
DROP TABLE "public"."api_configurations";

-- DropTable
DROP TABLE "public"."portfolio_stocks";

-- DropTable
DROP TABLE "public"."stock_prices";

-- DropTable
DROP TABLE "public"."stock_watchlist";

-- DropTable
DROP TABLE "public"."usage_limits";

-- DropTable
DROP TABLE "public"."user_preferences";

-- CreateTable
CREATE TABLE "public"."userPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportFrequency" TEXT NOT NULL DEFAULT 'MONTHLY',
    "enableNotifications" BOOLEAN NOT NULL DEFAULT true,
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "dashboardTheme" TEXT NOT NULL DEFAULT 'LIGHT',
    "defaultCurrency" TEXT NOT NULL DEFAULT 'BRL',
    "emailDigestTime" TEXT NOT NULL DEFAULT '08:00',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."usageLimits" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountsUsed" INTEGER NOT NULL DEFAULT 0,
    "categoriesUsed" INTEGER NOT NULL DEFAULT 0,
    "portfoliosUsed" INTEGER NOT NULL DEFAULT 0,
    "aiReportsUsed" INTEGER NOT NULL DEFAULT 0,
    "lastResetDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usageLimits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refreshTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3) NOT NULL,
    "deviceInfo" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "refreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."apiConfigurations" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "apiKey" TEXT,
    "baseUrl" TEXT NOT NULL,
    "rateLimit" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apiConfigurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stockWatchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchange" TEXT NOT NULL,
    "priceAlertHigh" DECIMAL(65,30),
    "priceAlertLow" DECIMAL(65,30),
    "enableAlerts" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stockWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."portfolioStocks" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "avgPrice" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolioStocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stockPrices" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "openPrice" DECIMAL(65,30),
    "highPrice" DECIMAL(65,30) NOT NULL,
    "lowPrice" DECIMAL(65,30) NOT NULL,
    "closePrice" DECIMAL(65,30) NOT NULL,
    "volume" BIGINT,
    "marketCap" DECIMAL(65,30),
    "date" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'API',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stockPrices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aiReports" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "reportType" "public"."ReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentiment" "public"."Sentiment",
    "confidence" DOUBLE PRECISION,
    "sources" TEXT[],
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "aiReports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPreferences_userId_key" ON "public"."userPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "usageLimits_userId_key" ON "public"."usageLimits"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "apiConfigurations_provider_key" ON "public"."apiConfigurations"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "stockWatchlist_userId_symbol_exchange_key" ON "public"."stockWatchlist"("userId", "symbol", "exchange");

-- CreateIndex
CREATE UNIQUE INDEX "portfolioStocks_portfolioId_stockId_key" ON "public"."portfolioStocks"("portfolioId", "stockId");

-- CreateIndex
CREATE UNIQUE INDEX "stockPrices_stockId_date_key" ON "public"."stockPrices"("stockId", "date");

-- AddForeignKey
ALTER TABLE "public"."userPreferences" ADD CONSTRAINT "userPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."usageLimits" ADD CONSTRAINT "usageLimits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refreshTokens" ADD CONSTRAINT "refreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stockWatchlist" ADD CONSTRAINT "stockWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."portfolioStocks" ADD CONSTRAINT "portfolioStocks_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."portfolioStocks" ADD CONSTRAINT "portfolioStocks_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stockPrices" ADD CONSTRAINT "stockPrices_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aiReports" ADD CONSTRAINT "aiReports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aiReports" ADD CONSTRAINT "aiReports_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."stocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
