const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../routes/authRoutes');

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) =>{
    const tracks = await Track.find({ userId: req.user._id});

    res.send(tracks);
})

router.post('/track', async (req, res) =>{
    const { name, locations } = req.body;

    if (!name || !locations ) {
        return res.status(422).send({ error: 'You must provida a name and locations.'})
    }

    try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();

    res.send(track);
    } catch (error) {
        res.status(422).send({ error: error.message });
    }

});

module.exports = router;