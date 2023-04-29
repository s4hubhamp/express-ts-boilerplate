import {Router} from 'express'
import * as controller from '../controllers'

const router: Router = Router()

router.route('/').get(controller.index)

export default router
