const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('in RUCKA !!!!!!!!!!');
  req.session.destroy((error) => {
    if (error) {
      console.log('destroysession=========', error);
    }
    res.clearCookie('cookieName');
    res.sendStatus(200);
  });
});

module.exports = router;
