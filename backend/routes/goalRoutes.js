const express = require('express')
const router = express.Router()
const { getGoals, addGoals, updateGoal, deleteGoal } = require('../controllers/goalController')

router.route('/').get(getGoals).post(addGoals)
router.route('/:id').put(updateGoal).delete(deleteGoal)

// longer version of each route
// router.get('/', getGoals)
// router.post('/', addGoals)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router