const AWS = require('aws-sdk')

const ID = 'AKIAIVGJODQ3773NM2LA'
const SECRET = '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'

const BUCKET_NAME = 'sopekocko'

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
})

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: 'eu-west-2'
  }
}

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else console.log('Bucket Created Successfully', data.Location)
})
