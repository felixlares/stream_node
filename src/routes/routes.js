const { Router } = require('express');
const router = Router();

router.get('/', ( req, res ) => {
    res.redirect('emisor.html');
})

module.exports = router;