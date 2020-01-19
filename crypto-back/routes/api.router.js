require('dotenv').config();
const express = require('express');
const rp = require('request-promise');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/latest', asyncHandler(async(req, res) => {
  let apiRes = undefined;
  if (process.env.NODE_ENV === 'prod') {
    apiRes = await rp.get(`http://api.coinlayer.com/api/live?target=EUR&symbols=BTC,ETH,XMR&access_key=${process.env.API_KEY}`);
  }
  if (process.env.NODE_ENV === 'dev') {
    apiRes = '{"success": true,"terms": "https://coinlayer.com/terms","privacy": "https://coinlayer.com/privacy","timestamp": 1579381924,"target": "EUR","rates": {"BTC": 8041.004723,"ETH": 158.600319,"XMR": 61.474279}}'
  }
  apiRes = JSON.parse(apiRes);
  if (apiRes.success === true) {
    const prices = apiRes.rates;
    const data = {};
    Object.keys(prices).forEach(key => {
      switch (key) {
        case 'BTC':
          data[key] = {
            'name': 'Bitcoin',
          };
          break;

        case 'ETH':
          data[key] = {
            'name': 'Ethereum',
          };
          break;

        case 'XMR':
          data[key] = {
            'name': 'Monero',
          };
          break;

      }
      data[key]['rate'] = prices[key];
    });
    res.json({response: data});
  } else {
    res.json({ error: { 'message': 'Too many calls can\'t display data' } });
  }
}));

module.exports = router;
