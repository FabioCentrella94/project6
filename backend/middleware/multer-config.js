const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: 'T2zUz2tUmKXhTkdgEoh4hxJLvIwx9z83DNa21wfu',
  accessKeyId: 'AKIAZJI6OO467DBBOA7V',
  region: 'eu-west-2'
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sopekocko',
    key: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname)
    }
  })
})

module.exports = multer(upload).single('image')
