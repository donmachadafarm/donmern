const asyncHandler = require('express-async-handler') 

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    res.status(200).json({
        message: 'get goals'
    })
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const addGoals = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({
        message: 'set goal'
    })
})

// @desc Update goal
// @route PUT /api/goals
// @access Private
const updateGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message: `update goal ${req.params.id}`
    })
})

// @desc Delete goal
// @route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message: `delete goal ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    addGoals,
    updateGoal,
    deleteGoal,
}