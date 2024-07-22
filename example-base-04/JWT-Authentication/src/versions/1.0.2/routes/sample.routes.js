const express = require("express");
const router = express.Router();

const {
    SuccessCongratulations,
} = require("../../../common/server-responses/customResponseTypes");
const { StatusCodes } = require("http-status-codes");

router.get("/sample1", (req, res, next) => {
    next({
        message:
            'checking if a custom object is passed in chain, with only "message", field, then it goes for error case.',
    });
});

router.get("/sample2", (req, res, next) => {
    res.json({
        message:
            "directly sending a response, without calling next middleware. this is defeating purpose to send uniform response",
    });
});

router.get("/sample3", (req, res, next) => {
    next(
        new SuccessCongratulations(
            "response sent in desired format and passed to next middleware",
            "Tweets fetched successfully",
            StatusCodes.OK
        )
    );
});

module.exports = router;
