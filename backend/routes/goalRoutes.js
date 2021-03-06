const express = require('express')
const router = express.Router()
const { getGoals, addGoals, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, addGoals)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// longer version of each route
// router.get('/', getGoals)
// router.post('/', addGoals)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router