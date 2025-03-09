const express = require('express');
const CardSchema = require('../model/Card');
const router = express.Router();

router.get('/card', async (req, res) => {
    try {
        const cards = await CardSchema.find();
        res.json(cards);
    }catch(err){
        res.status(500).send.json({error : 'Fail to fetch card data'});
    }
});

module.exports = router;