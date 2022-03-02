import mongoose from "mongoose"

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  typeAdditions: {
    type: String,
  },
  rarity: {
    type: String,
  },
  text: {
    type: String,
  },
  source: {
    type: String,
  },
  attunement: {
    type: String,
  },
})

const Item = mongoose.model("Item", itemSchema)

export default Item
