"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.addUser);
router.post('/user', userController_1.loginUser);
router.put('/user/:id', userController_1.updatUser);
exports.default = router;
