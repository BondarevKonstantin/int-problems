import mongoose from "mongoose"

const problemSchema = mongoose.Schema({
  startingPosition: {
    type: String,
    required: true,
  },
  movesData: {
    type: [String],
    required: true,
  },
  elo: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  goal: {
    type: String,
  },
})

const Problem = mongoose.model("Problem", problemSchema)

export default Problem
