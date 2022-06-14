'use strict';
const express = require('express');
const getUsersRouters=express.Router();
const {users}=require('../models/users');
const bearerAuth = require('../middleware/bearerAuth');
const logger=require("../middleware/logger");

getUsersRouters.get('/users',bearerAuth,async(req,res,next)=>{
    try {
        const userRecords = await users.findAll({});
        const list = userRecords.map(user => user.username);
        res.status(200).json(list);
      } catch (e) {
        console.error(e);
        next(e);
      }
})

getUsersRouters.use(logger);
module.exports=getUsersRouters;