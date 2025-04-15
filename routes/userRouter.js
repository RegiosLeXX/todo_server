import {Router} from 'express'
import { userLogin, userRegister } from '../controllers/userController.js'

export let router = Router()

router.route('/login')
    .post(userLogin)

router.route('/register')
    .post(userRegister)