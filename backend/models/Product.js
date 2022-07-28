import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ReviewSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    rating: { type: Number, required: [true, 'Rating is required'] },
    comment: { type: String, required: [true, 'Review comment is required'] },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
)

const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [ReviewSchema],
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
