const express = require('express');
const app = express();
const request = require('superagent');

module.exports = {
  linkedin: (id, secret, userAgent) => {
    return (req, res, next) => {
      console.log('REQUEST', req);
    };
  }
};
