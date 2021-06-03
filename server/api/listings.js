const router = require('express').Router()
const {Op} = require('sequelize')
const {Listing, Event, Skill} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const searchBySkill = req.query.skill && {id: req.query.skill}
  const searchByLocation = req.query.location && {
    location: {[Op.iLike]: `%${req.query.location}%`}
  }
  try {
    const listings = await Listing.findAll({
      where: {
        positionsAvailable: {[Op.gt]: 0},
        '$event.public$': true
      },
      attributes: ['id', 'positionsAvailable'],
      include: [
        {
          model: Skill,
          as: 'role',
          where: searchBySkill
        },
        {
          model: Event,
          where: searchByLocation,
          attributes: ['id', 'location', 'date', 'eventTypeId']
        }
      ]
    })
    res.status(200).json(listings)
  } catch (err) {
    next(err)
  }
})

router.get('/:listingId', async (req, res, next) => {
  try {
    const listing = await Listing.findOne({
      where: {
        id: req.params.listingId
      },
      attributes: ['id', 'positionsAvailable'],
      include: [{model: Event}, {model: Skill, as: 'role'}]
    })
    if (listing) {
      res.status(200).json(listing)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
