const express = require ('express')
const notes = require ('../models/notes')
const auth = require ('../middleware/auth')

const router = new express.Router()
router.post('/notes', auth, async (req, res) => {
    const note = new notes({
        ...req.body,
        owner: req.user._id
    })

    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/notes', auth, async (req, res) => {
    try {
        await req.user.populate('notes')
        res.send(req.user/notes)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/notes/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const note = await notes.findOne({ _id, owner: req.user._id })

        if (!note) {
            return res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/notes/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const note = await notes.findOne({ _id: req.params.id, owner: req.user._id})

        if (!note) {
            return res.status(404).send()
        }

        updates.forEach((update) => note[update] = req.body[update])
        await note.save()
        res.send(note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/notes/:id', auth, async (req, res) => {
    try {
        const note = await notes.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!note) {
            res.status(404).send()
        }

        res.send(note)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/notes', auth , async(req,res)=>{
    await notes.deleteMany({owner: req.user._id})
    res.send("All notes deleted!")
})

module.exports = router