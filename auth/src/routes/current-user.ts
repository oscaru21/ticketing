import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
    res.send('Hi people!')
})

export { router as currentUserRouter}