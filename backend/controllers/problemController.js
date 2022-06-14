import asyncHandler from "express-async-handler"
import Problem from "../models/problemModel.js"

// @desc Fetch all problems
// @route GET /api/problems
// @access Public
const getProblems = asyncHandler(async (req, res) => {
  const problems = await Problem.find({})

  res.json(problems)
})

// @desc Fetch single problem
// @route GET /api/problems/:id
// @access Public

const getProblemsById = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id)

  if (problem) {
    res.json(problem)
  } else {
    res.status(404)
    throw new Error("Problem not found")
  }
})

// @desc Delete single problem
// @route DELETE /api/problems/:id
// @access Private/admin
const deleteProblem = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id)

  if (problem) {
    await problem.remove()
    res.json({ message: "Problem removed" })
  } else {
    res.status(404)
    throw new Error("Problem not found")
  }
})

// @desc Create a problem
// @route POST /api/problems
// @access Private/admin
const createProblem = asyncHandler(async (req, res) => {
  const problem = new Problem({
    startingPosition: "wmrniorpeqrresrtiurvoxgzn|g~o!@oAiBgCeDnEeFgGiHoIrKrMrOrQr",
    movesData: [],
    elo: 1000,
    rating: 0,
    goal: ""
  })

  const createdProblem = await problem.save()
  res.status(201).json(createdProblem)
})

// @desc Update a problem
// @route PUT /api/problems/:id
// @access Private/admin
const updateProblem = asyncHandler(async (req, res) => {
  const {
    startingPosition,
    movesData,
    elo,
    rating,
    goal,
  } = req.body

  const problem = await Problem.findById(req.params.id)

  if (problem) {
    problem.startingPosition = startingPosition
    problem.movesData = movesData
    problem.elo = elo
    problem.rating = rating
    problem.goal = goal

    const updatedProblem = await problem.save()
    res.json(updatedProblem)
  } else {
    res.status(404)
    throw new Error("Problem not found")
  }
})

export {
  getProblems,
  getProblemsById,
  deleteProblem,
  createProblem,
  updateProblem,
}