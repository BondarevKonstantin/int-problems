import express from "express"
import dotenv from "dotenv"
import path from "path"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

import creatureRoutes from "./routes/creatureRoutes.js"
import spellRoutes from "./routes/spellRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use("/api/creatures", creatureRoutes)
app.use("/api/spells", spellRoutes)
app.use("/api/users", userRoutes)
app.use("/api/items", itemRoutes)

const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
  console.log(path.resolve(__dirname, "frontend", "build"))
  app.use(express.static(path.resolve(__dirname, "frontend", "build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running")
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
