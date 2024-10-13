const express = require("express");
const router = express.Router();
const { loginUser } = require("./login.service");


const { SuccessCongratulations } = require('../../../common/server-responses/customResponseTypes');
const { StatusCodes } = require('http-status-codes');

router.post("/login", (req, res, next) => {
    try {
        const accessToken = loginUser(req.body.username);
        next(new SuccessCongratulations({ accessToken }, "Tweets fetched successfully", StatusCodes.OK));
    } catch (error) {
        next(error); // Pass error to centralized error handler   
    }
});

// Apply centralized error handler to all routes
// router.use(errorHandler);

module.exports = router;
