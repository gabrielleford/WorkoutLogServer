const router = require('express').Router();
const { Log } = require('../models');
const validateJWT = require('../middleware/validatejwt');


router.get('/practice', validateJWT, (req, res) => {
    res.send('This is a practice route!')
})

router.post('/create', validateJWT, async (req, res) => {
    let { description, definition, result } = req.body.log;
    let { id } = req.user;

    const log = {
        description,
        definition,
        result,
        owner_id: id
    };

    try {
        const newLog = await Log.create(log);
        res.status(201).json({
            message: 'Log successfully created',
            log: newLog
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to create log ${err}`
        });
    }
});

router.get('/', validateJWT, async (req, res) => {
    const { id } = req.user;

    try {
        const logs = await Log.findAll({
            where: {
                owner_id: id
            }
        });

        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({
            error: `Error: ${err}`
        });
    }
});

router.get('/:id', validateJWT, async (req, res) => {
    const logId = req.params.id;
    const { id } = req.user;

    try {
        const logById = await Log.findAll({
            where: {
                id: logId,
                owner_id: id
            }
        });

        res.status(200).json(logById);
    } catch (err) {
        res.status(500).json({ error: `Error: ${err}`});
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.id;
    const { id } = req.user;

    const query = {
        where: {
            id: logId,
            owner_id: id
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    }

    try {
        const updated = await Log.update(updatedLog, query);

        res.status(200).json({
            message: 'Workout Log Updated',
            updtdLog: updatedLog
        });
    } catch (err) {
        res.status(500).json({ error: `Error: ${err}`});
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    const logId = req.params.id;
    const { id } = req.user;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: id
            }
        };

        await Log.destroy(query);

        res.status(200).json({ message: 'Workout log deleted'});
    } catch (err) {
        res.status(500).json({ error: `Error: ${err}`});
    }
});

module.exports = router;