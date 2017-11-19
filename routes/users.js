var express = require('express');
var router = express.Router();
var models = require('../models');
// const Op = Sequelize.Op;
var sequelize = require("sequelize");

router.get('/users', function(req,res, next){
    models.User.findAll()
        .then(function(users) {
            console.log('users result',users);
            res.send(users);
        });
})


//create a connection
router.post('/connect', function (req,res){
    console.log('request',req);
    models.User
        .findOrCreate({where: { "user_email" : req.body.friends[0],"friend_email" : req.body.friends[1]},defaults:{"blocked": 0}})
        .spread(function(user, created){

            if(created){
                console.log(user,created);
                res.json({
                    "success": true
                });
            }
            else{
                res.json({
                    "error": "connection already exists"
                });
            }
        })

})

//friendList
router.post("/friendList",function(req,res){
    console.log('request',req);
    models.User.findAndCountAll({ where : { "user_email" : req.body.email}})
        .then(function(result) {
            console.log("count",result.count);
            console.log("rows",JSON.stringify(result.rows));
            const friends=[];
            result.rows.forEach(function(friend){
                friends.push(friend.friend_email);
            })
            res.json(
                {
                    "success": true,
                    "friends" : friends,
                    "count" : result.count
                }
            );
        });
})


//subscribing to the target
router.post('/subscribe', function (req,res){
    console.log('request',req);
    models.User
        .findOrCreate({
            where: {

                "user_email": req.body.requestor,"sub_email" : req.body.target

                //friend_email is null for particular subscription
            }
        })
        .spread(function(user, created){

            if(created){
                console.log(user,created);
                res.json({
                    "success": true
                });
            }
            else{

                res.json({
                    "error": "subscribed already"
                });
            }
        })

})


//blocking to the target
router.post('/block', function (req,res){
    console.log('request',req);
    models.User
        .findOrCreate({
            where: {

                "user_email": req.body.requestor,"friend_email" : req.body.target

                //friend_email is null for particular subscription
            },defaults:
                {"blocked": 1}


        })
        .spread(function(user, created){
            if(created){
                console.log("created",JSON.stringify(created));
                res.json({
                    "success": true
                });
            }
            else{
                models.User.update({"blocked": 1},
                    {where: { "user_email": req.body.requestor,"friend_email" : req.body.target}})
                    .then(function (result) {
                        res.json({"success": true});
                    })

            }
        })
})

router.post('/commonFriends', function(req,res){

    models.sequelize.query('SELECT friend_email FROM users  WHERE friend_email in ( SELECT  friend_email FROM users  WHERE user_email = :first and blocked =0) AND  user_email  = :second and blocked=0',
        { replacements: { first: req.body.friends[0],second : req.body.friends[1]  }, type: sequelize.QueryTypes.SELECT }
    ).then(users => {
        console.log(users.length);
        const jsonOutput={
            "success" :"true",
            "friends" :users.valueOf("friends_email"),
            "count" : users.length
        };
        res.send(jsonOutput);
})
    console.log("posting");

})

router.post('/recipientList', function (req,res){
    models.sequelize.query('SELECT DISTINCT user_email FROM users where (user_email = :sender and blocked=0) or ((friend_email= :sender and blocked=0) or ' +
        'sub_email = :sender )',{ replacements: { sender: req.body.sender}, type: sequelize.QueryTypes.SELECT })
        .then(users => {
             console.log("op",users);
             const mentionEmail=req.body.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
             users.push(mentionEmail);
             res.send(users);
    })
})







module.exports = router;
