import express from 'express';
import data from '../src/testData';
import faker from 'faker';

const router = express.Router();
const contests = data.contests.reduce((obj, contest) => {
    obj[contest.id] = contest;
    return obj;
}, {});

router.get('/contests', (req, res) => {
    res.send({ 
        contests: contests,
    });
});
router.get('/contests/:contestId', (req, res) => {
    const contest = contests[req.params.contestId];
    contest.description = faker.lorem.paragraphs();
    res.send(contest);
});

export default router;