import {Router} from 'express'
import * as controller from '../controllers/auth'
import {validateBody} from '../middlewares/validation'
import catchAsync from '../utils/catchAsync'

const router = Router()

router.route('/admin').post(validateBody('adminLogin'), catchAsync(controller.adminLogin))
router.route('/farmer/generate-otp').post(catchAsync(controller.generateOTP))
router.route('/farmer/verify-otp').post(validateBody('otpLogin'), catchAsync(controller.verifyOTP))

export default router
