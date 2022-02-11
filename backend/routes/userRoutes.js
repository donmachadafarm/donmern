const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)

router.get('/me',protect,getMe)

// router.route('/').get(getGoals).post(addGoals)
// router.route('/:id').put(updateGoal).delete(deleteGoal)

// longer version of each route
// router.get('/', getGoals)
// router.post('/', addGoals)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router