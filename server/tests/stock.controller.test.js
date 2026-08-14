import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { registerStock, getAllStocks, getStockBySymbol } from "../controllers/stock/stock.js";
import Stock from "../models/Stock.js";

let mongoServer;

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

test.after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test.beforeEach(async () => {
  await Stock.deleteMany({});
});

test("registerStock creates a stock and returns it in the response body", async () => {
  const req = {
    body: {
      symbol: "AAPL",
      companyName: "Apple Inc.",
      currentPrice: 190,
      lastDayTradedPrice: 188,
      iconUrl: "https://example.com/aapl.png",
    },
  };
  const res = mockRes();

  await registerStock(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.data.symbol, "AAPL");
  assert.equal(res.body.data.currentPrice, 190);

  const saved = await Stock.findOne({ symbol: "AAPL" });
  assert.ok(saved, "stock should be persisted");
});

test("registerStock rejects a duplicate symbol", async () => {
  await Stock.create({
    symbol: "TSLA",
    companyName: "Tesla Inc.",
    currentPrice: 250,
    lastDayTradedPrice: 245,
    iconUrl: "https://example.com/tsla.png",
  });

  const req = {
    body: {
      symbol: "TSLA",
      companyName: "Tesla Inc.",
      currentPrice: 250,
      lastDayTradedPrice: 245,
      iconUrl: "https://example.com/tsla.png",
    },
  };
  const res = mockRes();

  await assert.rejects(() => registerStock(req, res), /already exists/);
});

test("registerStock rejects missing required fields", async () => {
  const req = { body: { symbol: "MSFT" } };
  const res = mockRes();

  await assert.rejects(() => registerStock(req, res), /provide all values/);
});

test("getAllStocks returns every stock without time series fields", async () => {
  await Stock.create({
    symbol: "GOOG",
    companyName: "Alphabet Inc.",
    currentPrice: 140,
    lastDayTradedPrice: 138,
    iconUrl: "https://example.com/goog.png",
    dayTimeSeries: [{ price: 140 }],
  });

  const res = mockRes();
  await getAllStocks({}, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.data.length, 1);
  assert.equal(res.body.data[0].symbol, "GOOG");
  assert.equal(res.body.data[0].dayTimeSeries, undefined);
});

test("getStockBySymbol returns a single matching stock", async () => {
  await Stock.create({
    symbol: "AMZN",
    companyName: "Amazon.com Inc.",
    currentPrice: 180,
    lastDayTradedPrice: 178,
    iconUrl: "https://example.com/amzn.png",
  });

  const req = { query: { stock: "AMZN" } };
  const res = mockRes();

  await getStockBySymbol(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.data.symbol, "AMZN");
});

test("getStockBySymbol throws NotFoundError for an unknown symbol", async () => {
  const req = { query: { stock: "DOESNOTEXIST" } };
  const res = mockRes();

  await assert.rejects(() => getStockBySymbol(req, res), /not found/i);
});

test("getStockBySymbol throws BadRequestError when no symbol is provided", async () => {
  const req = { query: {} };
  const res = mockRes();

  await assert.rejects(() => getStockBySymbol(req, res), /provide stock symbol/i);
});
