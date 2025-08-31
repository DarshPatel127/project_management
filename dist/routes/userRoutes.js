"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Simple GET route to test if the endpoint is working
router.get('/register', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Registration route is working!',
        timestamp: new Date().toISOString()
    });
});
router.post('/register', userController_1.registeredUser);
exports.default = router;
