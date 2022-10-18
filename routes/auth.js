// importing packages
const express = require('express');
const router = express.Router();

router.get(`/`, function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.status(200).json({msg: `It's a GET request.`});
});

router.post(`/`, function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.status(200).json({msg: `It's a POST request.`});
});

router.put(`/`, function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.status(200).json({msg: `It's a PUT request.`});
});

module.exports = router;