const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getPosts } = require("./post.service");

// const { SuccessCongratulations } = require('../common/server-responses/customResponseTypes');
const { SuccessCongratulations } = require('../../../common/server-responses/customResponseTypes');
const errorHandler = require('../../../common/middlewares/routerResponseHandler');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// Apply authentication middleware
router.get("/posts", authenticateToken, (req, res, next) => {
    try{
        const filteredPosts=getPosts(req.user);
        // res.json({ data: filteredPosts, timeStamp: new Date().toString() });
        next(new SuccessCongratulations(filteredPosts,"Tweets fetched successfully", StatusCodes.OK));
    }catch (error) {
        // res.status(401).json({ error: error.message });
        next(error); // Pass error to centralized error handler   
    }
});

// Apply centralized error handler to all routes
router.use(errorHandler);

module.exports = router;
