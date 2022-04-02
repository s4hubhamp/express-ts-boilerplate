import {Router} from 'express'
import index from '../controllers'

const router: Router = Router()

router.route('/').get(index)

export default router
