require('dotenv').config()
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  accessKeyId: process.env.IAM_USER_ACCESS_KEY_ID,
  secretAccessKey: process.env.IAM_USER_SECRET_ACCESS_KEY,
  region: 'eu-west-2'
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'project6-images',
    key: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname)
    }
  })
})

module.exports = multer(upload).single('image')
