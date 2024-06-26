const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log('destroysession=========', error);
    }
    res.clearCookie('cookieName');
    res.sendStatus(200);
  });
});

module.exports = router;
