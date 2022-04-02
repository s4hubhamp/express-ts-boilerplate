import {Router} from 'express'
import * as controller from '../controllers/farmer'
import executeSingle, {executeMultiWithOr} from '../middlewares'
import adminAccess from '../middlewares/admin-access'
import agentAccess from '../middlewares/agent-access'
import editDeleteFarmer from '../middlewares/edit-delete-farmer'
import requireAuth from '../middlewares/require-auth'
import {validateBody} from '../middlewares/validation'
import catchAsync from '../utils/catchAsync'

const router = Router()

router.use(requireAuth)

router
  .route('/')
  .get(executeMultiWithOr([adminAccess, agentAccess]), catchAsync(controller.getFarmers))
  .post(executeSingle(adminAccess), validateBody('createFarmer'), catchAsync(controller.createFarmer))

router
  .route('/:farmerId')
  .get(catchAsync(controller.getFarmerById))
  .put(executeSingle(editDeleteFarmer), validateBody('updateFarmer'), catchAsync(controller.updateFarmerById))
  .delete(executeSingle(editDeleteFarmer), catchAsync(controller.deleteFarmerById))

export default router
