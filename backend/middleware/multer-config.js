const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
  secretAccessKey: 'qGY4inl1701BlyB64YkrUpzrAYHb7ympTBDWybx3',
  accessKeyId: 'AKIAIVGJODQ3773NM2LA',
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
