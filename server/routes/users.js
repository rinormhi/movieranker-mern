const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

const uc = new UserController();

router.post("/register", (req, res) => {
    uc.create(req, res);
});

router.post("/local", (req, res) => {
    console.log("LOCAL");

});

module.exports = router;