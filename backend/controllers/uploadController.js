import asyncHandler from 'express-async-handler'
import path from 'path'
import {
  getImageName,
  validateImageSize,
  validateImageType,
} from '../utill/imageValidator.js'

//@desc Upload image
//@route POST /api/uploads/image
//@access Private/Admin
const upload = asyncHandler(async (req, res) => {
  if (req.files) {
    if (process.env.IMAGE_STORAGE === 'cloudinary') {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
          folder: 'proshop-images',
          use_filename: true,
        }
      )
      req.body.image = result.secure_url
      fs.unlinkSync(req.files.image.tempFilePath)
    } else {
      let productImage = req.files.image
      const imageName = getImageName(productImage)
      const imageType = validateImageType(productImage)
      const imageSize = validateImageSize(productImage, 1000000)
      if (!imageType) {
        res.status(400)
        throw new Error('Image type must be jpeg, png, jpg, or gif! ')
      }
      if (!imageSize) {
        res.status(400)
        throw new Error('Image size must be less than 1MB! ')
      }
      const __dirname = path.resolve()
      const imagePath = __dirname + '/public/images/' + `${imageName}`
      req.body.image = '/images/' + `${imageName}`
      await productImage.mv(imagePath)
    }
  }
  res.status(201).json(req.body.image)
})

export { upload }
