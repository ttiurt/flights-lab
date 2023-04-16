import { Flight } from '../models/flight.js'

function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res){
  console.log(req.body)
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index(req, res){
  console.log('index working')
  res.render('flights/index', {
    title: 'All Flights'
  })
}

export {
  newFlight as new,
  create,
  index,
}