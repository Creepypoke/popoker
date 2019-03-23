const express = require('express')

const router = express.Router()

const ROOMS = []

/* GET users listing. */
router.get('/:id', (req, res) => {
  const reqID = Number(req.params.id)
  const targetRoom = ROOMS[reqID]

  if (targetRoom !== undefined) {
    res.send(`Welcome to Room ${reqID}!`)
    targetRoom.guests.push({ name: 'pep' })
    console.log(targetRoom)
  } else {
    res.send(`Sorry, but Room ${reqID} is not found :(`)
  }
})

/* GET users listing. */
router.post('/create', (req, res) => {
  const { name } = req.body
  const roomData = {
    guests: [{ name }],
  }
  res.send(`Room ${ROOMS.push(roomData) - 1} was created by ${name}`)
})

module.exports = router
