import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config  from '../config';

let mdb;

MongoClient.connect(config.mongodbUri, (err, client) => {
    assert.equal(null, err);
    mdb = client.db('linked_tutos');
    //client.close();
}) ;


const router = express.Router();

router.get('/contests', (req, res) => {
    const contests = {};
    mdb.collection('contests').find({})
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1,
        })
        .each((err, contest) => {
            if (!contest) {
                res.send({ contests });
                return;
            }

            contests[contest.id] = contest;
        });
});
router.get('/contests/:contestId', (req, res) => {
    mdb.collection('contests')
        .findOne({ id: Number(req.params.contestId) })
        .then(contest => res.send(contest))
        .catch(err => console.error(err));
});

export default router;