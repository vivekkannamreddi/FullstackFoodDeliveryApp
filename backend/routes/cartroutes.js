    import express from "express"
    import { addToCart,removeFromCart,getCart } from "../controllers/cartcontroller.js"
    import authMiddleware from "../middleware/authentication.js";

    const cartRuoter = express.Router();

    cartRuoter.post('/add',authMiddleware,addToCart);
    cartRuoter.post('/remove',authMiddleware,removeFromCart);
    cartRuoter.post('/get',authMiddleware,getCart);

    export default cartRuoter;
