import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const users = [
  {
    username: "Regalmafia",
    email: "Bondkr@mail.ru",
    password: bcrypt.hashSync(process.env.ADM_PASS, 10),
    isAdmin: true,
  },
]

export default users
