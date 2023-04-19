import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

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
    res.redirect('/flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/new')
  })
}

function index(req, res){
  console.log('index working')
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      title: 'All Flights',
      flights: flights,
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function show(req, res){
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      console.log(flight, '<-- FLIGHT')
      console.log(meals, '<-- MEALS NOT IN FLIGHT')
      res.render('flights/show', {
        flight: flight,
        title: 'Flight Detail',
        meals: meals
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteFlight(req, res){
  console.log('DELETE')
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights/index')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights/index')
  })
}

function edit(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req, res){
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function addTicket(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function addToMeals(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  addTicket,
  addToMeals
}