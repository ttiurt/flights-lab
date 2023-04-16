import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightsCtrl.new)

router.post('/', flightsCtrl.create)

router.get('/index', flightsCtrl.index)

router.get('/:flightId', flightsCtrl.show)

export { router }
