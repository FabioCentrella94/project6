const Sauce = require('../models/sauce')
const AWS = require('aws-sdk')

exports.createSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce)
  const url = 'https://sopekocko.s3.eu-west-2.amazonaws.com/'
  const sauce = new Sauce({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + req.file.key,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Sauce saved successfully!'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then(sauce => {
      res.status(200).json(sauce)
    })
    .catch(error => {
      res.status(404).json({
        error: error
      })
    })
}

exports.updateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(sauce => {
    const s3 = new AWS.S3()
    const params = {
      Bucket: 'sopekocko',
      Key: sauce.imageUrl.replace(
        'https://sopekocko.s3.eu-west-2.amazonaws.com/',
        ''
      )
    }
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log()
    })
    sauce = new Sauce({ _id: req.params._id })
    if (req.file) {
      const url = 'https://sopekocko.s3.eu-west-2.amazonaws.com/'
      req.body.sauce = JSON.parse(req.body.sauce)
      sauce = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + req.file.key,
        heat: req.body.sauce.heat
      }
    } else {
      sauce = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        heat: req.body.heat
      }
    }

    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        })
      })
      .catch(error => {
        res.status(400).json({
          error: error
        })
      })
  })
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(sauce => {
    const s3 = new AWS.S3()
    const params = {
      Bucket: 'sopekocko',
      Key: sauce.imageUrl.replace(
        'https://sopekocko.s3.eu-west-2.amazonaws.com/',
        ''
      )
    }
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log('AWS: Image successfully deleted!')
    })
    Sauce.deleteOne(sauce)
      .then(() => {
        res.status(200).json({
          message: 'Sauce deleted successfully!'
        })
      })
      .catch(error => {
        res.status(400).json({
          error: error
        })
      })
  })
}

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => {
      res.status(200).json(sauces)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

exports.likeDislikeSauce = (req, res, next) => {
  req.body = req.body
  Sauce.findOne({ _id: req.params.id }).then(sauce => {
    if (req.body.like == 1) {
      sauce.usersLiked.push(req.body.userId)
      sauce.likes += req.body.like
    } else if (
      req.body.like == 0 &&
      sauce.usersLiked.includes(req.body.userId)
    ) {
      sauce.usersLiked.remove(req.body.userId)
      sauce.likes -= 1
    } else if (req.body.like == -1) {
      sauce.usersDisliked.push(req.body.userId)
      sauce.dislikes += 1
    } else if (
      req.body.like == 0 &&
      sauce.usersDisliked.includes(req.body.userId)
    ) {
      sauce.usersDisliked.remove(req.body.userId)
      sauce.dislikes -= 1
    }
    sauce
      .save()
      .then(() => {
        res.status(200).json({
          message: 'Preference Updated!'
        })
      })
      .catch(error => {
        res.status(400).json({
          error: error
        })
      })
  })
}
