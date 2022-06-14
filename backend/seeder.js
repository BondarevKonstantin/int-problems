import dotenv from "dotenv"

import users from "./data/users.js"
import problems from "./data/problems.js"

import User from "./models/userModel.js"
import Problem from "./models/problemModel.js"

import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Problem.deleteMany()

    await User.insertMany(users)
    await Problem.insertMany(problems)

    console.log("Data imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Problem.deleteMany()

    console.log("Data destroyed!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
