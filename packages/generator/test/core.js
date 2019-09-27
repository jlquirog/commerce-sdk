"use strict";

const fetchMock = require("fetch-mock").sandbox();
const nodeFetch = require("node-fetch");
nodeFetch.default = fetchMock;

import BaseClient from "../src/core/base/client";

import { assert } from "chai";

describe("base client test", () => {
  it("makes correct call", () => {
    let client = new BaseClient("https://somewhere");

    fetchMock.get("*", 200);

    return client
      .get("/over/the/rainbow")
      .then(() => {
        assert.equal(fetchMock.lastUrl(), "https://somewhere/over/the/rainbow");
      })
      .finally(() => {
        fetchMock.restore();
      });
  });
});