const express = require('express');
const { default: jwtDecode } = require('jwt-decode');
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const router = express.Router();

const User = require('../../models/User');

router.get('/:token', (req, res) => {
    var jwtDecode = jwt_decode(req.params.token);
    User.findOne({ full_name: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] })
        .then((user) => {
            user.api_token = jwt_encode({ "username": user.username, "full_name": user.full_name }, 'secret');
            res.json(user);
        }).catch(res.status(401));
})

module.exports = router;