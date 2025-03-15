import express from 'express'
import authMiddleware from '../middleware/authentication.js'
import { placeorder, userOrders, verifyorder,listorder,updateStatus } from '../controllers/ordercontroller.js'

const orderrouter = express.Router();

orderrouter.post('/place',authMiddleware,placeorder);
orderrouter.post('/verify',verifyorder)
orderrouter.post('/userorders',authMiddleware,userOrders)
orderrouter.get('/list',listorder)
orderrouter.post('/status',updateStatus)

export default orderrouter;