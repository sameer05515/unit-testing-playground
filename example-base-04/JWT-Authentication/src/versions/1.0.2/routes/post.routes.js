const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getPosts } = require("./post.service");


const { SuccessCongratulations } = require('../../../common/server-responses/customResponseTypes');
const { StatusCodes } = require('http-status-codes');

// Apply authentication middleware
router.get("/posts", authenticateToken, (req, res, next) => {
    try{
        const filteredPosts=getPosts(req.user);
        next(new SuccessCongratulations(filteredPosts,"Tweets fetched successfully", StatusCodes.OK));
    }catch (error) {
        next(error); // Pass error to centralized error handler   
    }
});

// Apply centralized error handler to all routes
// router.use(errorHandler);

module.exports = router;
