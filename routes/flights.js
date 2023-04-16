import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/new', flightsCtrl.new)

router.post('/', flightsCtrl.create)

router.get('/index', flightsCtrl.index)

router.get('/:flightId', flightsCtrl.show)

router.delete('/:flightId', flightsCtrl.delete)

router.get('/:flightId/edit', flightsCtrl.edit)

router.put('/:flightId', flightsCtrl.update)

export { router }
