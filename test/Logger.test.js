const { describe, it } = require("mocha")
const { expect } = require("chai")
const rewire = require("rewire")
const Cleaner = require("atlas-cleanup-tests")
const Logger = rewire("../src/Logger")

let revert;

const cleanup = Cleaner(() => revert && revert())

describe("Logger", function(){

  describe("verbose mode", function(){
    it("should return a logger", function(){
      const logger = Logger(true);
      expect(logger).to.be.a("function");
    })
    it("should not print anything if called with falsy args", cleanup(function(){
      let calledError = 0, calledLog = 0;
      const falsy = [false, null, undefined, "", NaN, 0]
      revert = Logger.__set__("console", {
        error: () => {
          calledError++
        },
        log: () => {
          calledLog++
        }
      })
      const logger = Logger(true);
      falsy.forEach(err => falsy.forEach(msg => logger(err, msg)))
      falsy.forEach(err => logger(err))
      logger()
      expect(calledLog).to.equal(0);
      expect(calledError).to.equal(0)
    }))
    it("should print full error to stderr", cleanup(function(done){
      const err = new Error("some error")
      revert = Logger.__set__("console", {
        error: arg => {
          expect(arg).to.equal(err)
          done()
        }
      })
      Logger(true)(err)
    }))
    it("should print success message to stdout if no error", cleanup(function(){
      const msg = "my message"
      const falsy = [false, null, undefined, "", NaN, 0]
      let calledLog = 0;
      revert = Logger.__set__("console", {
        log: arg => {
          calledLog++
          expect(arg).to.equal(msg)
        }
      })
      const logger = Logger(true)
      falsy.forEach(err => logger(err, msg))
      expect(calledLog).to.equal(falsy.length);
    }))
    it("should not print success message if error", cleanup(function(){
      let calledLog = 0, calledError = 0;
      revert = Logger.__set__("console", {
        log: () => {
          calledLog++
        },
        error: () => {
          calledError++
        }
      })
      Logger(true)(new Error("some error"), "my message")
      expect(calledLog).to.equal(0);
      expect(calledError).to.equal(1)
    }))
  })

  describe("concise mode", function(){
    it("should return a logger", function(){
      const logger = Logger(false);
      expect(logger).to.be.a("function");
    })
    it("should not print anything if called with falsy args", cleanup(function(){
      let calledError = 0, calledLog = 0;
      const falsy = [false, null, undefined, "", NaN, 0]
      revert = Logger.__set__("console", {
        error: () => {
          calledError++
        },
        log: () => {
          calledLog++
        }
      })
      const logger = Logger(false);
      falsy.forEach(err => falsy.forEach(msg => logger(err, msg)))
      falsy.forEach(err => logger(err))
      logger()
      expect(calledLog).to.equal(0);
      expect(calledError).to.equal(0)
    }))
    it("should print error message to stderr", cleanup(function(done){
      const err = new Error("some error")
      revert = Logger.__set__("console", {
        error: arg => {
          expect(arg).to.equal(err.message)
          done()
        }
      })
      Logger(false)(err)
    }))
    it("should print full error to stderr if no message", cleanup(function(done){
      const err = {my: 'custome', error: "object"}
      revert = Logger.__set__("console", {
        error: arg => {
          expect(arg).to.equal(err)
          done()
        }
      })
      Logger(false)(err)
    }))
    it("should print success message to stdout if no error", cleanup(function(){
      const msg = "my message"
      const falsy = [false, null, undefined, "", NaN, 0]
      let calledLog = 0;
      revert = Logger.__set__("console", {
        log: arg => {
          calledLog++
          expect(arg).to.equal(msg)
        }
      })
      const logger = Logger(false)
      falsy.forEach(err => logger(err, msg))
      expect(calledLog).to.equal(falsy.length);
    }))
    it("should not print success message if error", cleanup(function(){
      let calledLog = 0, calledError = 0;
      revert = Logger.__set__("console", {
        log: () => {
          calledLog++
        },
        error: () => {
          calledError++
        }
      })
      Logger(false)(new Error("some error"), "my message")
      expect(calledLog).to.equal(0);
      expect(calledError).to.equal(1)
    }))
  })
})
