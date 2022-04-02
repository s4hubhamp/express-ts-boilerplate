import {Router} from 'express'
import * as controller from '../controllers/admin'
import adminAccess from '../middlewares/admin-access'
import {validateBody} from '../middlewares/validation'
import catchAsync from '../utils/catchAsync'

const router = Router()

// router.use(adminAccess)

// router.route('/:farmerId').get(controller.getFarmerById).put(controller.updateFarmerById)

export default router
