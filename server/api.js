const router = require('express').Router()

router.get('/user', (req, res) => {
  res.send({
    username: 'Creepypoke',
    rooms: [
      {
        id: 'some-string-id',
        access: 'admin',
      },
      {
        id: 'another-string-id',
        access: 'guest'
      },
    ],
  })
})

router.post('/user', (req, res) => {
  res.send({
    username: 'Creepypoke',
  })
})

router.post('/room', (req, res) => {
  res.send({
    id: 'some-string-id',
  })
})

router.get('/room/:roomId', (req, res) => {
  res.send({
    id: req.params.roomId,
    users: [
      {
        username: 'Creepypoke',
        access: 'admin',
      },
      {
        username: 'stcherenkov',
        access: 'guest',
      }
    ],
    tasks: [
      {
        id: 'JWWEB-666',
        title: 'Some task',
        description: 'Some description',
      },
    ],
  })
})

router.get('/room/:roomId/task/:taskId', (req, res) => {
  res.send({
    id: req.params.taskId,
    title: 'Some other task',
    description: 'Some other description',
    voting: {
      status: 'not-started',
      voted: 0,
      total: 2,
    },
  })
})

router.post('/room/:roomId/task/:taskId/call', (req, res) => {
  res.send({
    id: req.params.taskId,
    title: 'Some other task',
    description: 'Some other description',
    voting: {
      status: 'in-progress',
      voted: 0,
      total: 2,
    },
  })
})

router.post('/room/:roomId/task/:taskId/vote', (req, res) => {
  res.send({
    id: req.params.taskId,
    title: 'Some other task',
    description: 'Some other description',
    voting: {
      status: 'in-progress',
      voted: 1,
      total: 2,
    },
  })
})

module.exports = router
