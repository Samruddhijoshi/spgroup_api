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
        })
        .catch(function(err){

            res.json({
                "error": err
            });
        })

})


//create a connection
//this api finds and create (if not found)the record matching the usr_email and friend_email and update block as 0
/**
 * @api {post} /connect create a friend connection between two email addresses
 * @apiGroup Users
 * @apiParam {String[]} friends  Friends array to create a connect in between them
 * @apiParamExample {json} Input
 *    {
 *      "friends":
 *      [
 *       "andy@example.com",
 *      "john@example.com"
 *      ]
 *
 *    }
 * @apiSuccess {String} success.success Two friends are connected successfully

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *    {
 *      "success": true
 *    }
 *    * @apiSuccess {String} success.success Two friends are connected already

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 ACCEPTED
 *    {
 *      "success": "connection already exists"
 *    }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/connect', function (req,res){
    models.User
        .findOrCreate({where: { "user_email" : req.body.friends[0],"friend_email" : req.body.friends[1]},defaults:{"blocked": 0}})
        .spread(function(user, created){

            if(created){
                console.log(user,created);
                res.statusCode = 201;
                res.json({
                    "success": true
                });
            }
            else{
                res.statusCode = 200;
                res.json({
                    "success": "connection already exists"
                });
            }
        })
        .catch(function(err){
            res.json({"error":err});
        })

})

//friendList //2
/**
 * @api {post} /friendList As a user, I need an API to retrieve the friends list for an email address.
 * @apiGroup Users
 * @apiParam {String} email input the emails address
 * @apiParamExample {json} Input
 *    {
 *       "email": 'andy@example.com'
 *   }
 * @apiSuccess {String} success.success connection success
 * @apiSuccess {String[]} success.friends friendsList
 * @apiSuccess {Number} success.count friendsList count
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *   {
 *      "success": true,
 *      "friends" :
 *                  [
 *                      'john@example.com'
 *                  ],
 *      "count" : 1
 *    }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post("/friendList",function(req,res){
    models.User.find({where : {  "user_email" : req.body.email }})
        .then(function(result){
            models.User.findAndCountAll({ where : { "user_email" : req.body.email}})
                .then(function(result) {
                    console.log("count",result);
                    console.log("rows",JSON.stringify(result.rows));
                    const friends=[];
                    result.rows.forEach(function(friend){
                        friends.push(friend.friend_email);
                    })
                    res.statusCode = 200;
                    res.json(
                        {
                            "success": true,
                            "friends" : friends,
                            "count" : result.count
                        }
                    );
                })
        }).catch(function (err) {
        res.json({
            "error" :err
        })
    });

})


//subscribing to the target //4
/**
 * @api {post} /subscribe As a user, I need an API to subscribe to updates from an email address.
 * @apiGroup Users
 * @apiParam {String} requestor email addres of the requestor from-subscriber
 * @apiParam {String} target email addres of the target subscribed-to
 * @apiParamExample {json} Input
 *    {
 *     "requestor": "lisa@example.com",
 *      "target": "john@example.com"
 *     }
 * @apiSuccess {String} success.success requestor is subscribed with target

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 OK
 *    {
 *      "success": true
 *    }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/subscribe', function (req,res){
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
                res.statusCode =201;
                res.json({
                    "success": true
                });
            }
            else{
                res.statusCode =200;

                res.json({
                    "success": "subscribed already"
                });
            }
        })

})


//blocking to the target //5  As a user, I need an API to block updates from an email address.
//find or create( if found ) the user and friend email address record and update the blocked with 1
/**
 * @api {post} /block  As a user, I need an API to block updates from an email address.
 * @apiGroup Users
 * @apiParam {String} requestor requestor email address
 * @apiParam {String} target target email address
 * @apiParamExample {json} Input
 *    {
 *     "requestor": "lisa@example.com",
 *      "target": "john@example.com"
 *     }
 * @apiSuccess {String} success.success requestor blocked the target successfully.

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true
 *    }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/block', function (req,res){
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
                res.statusCode = 201;
                res.json({
                    "success": true
                });
            }
            else{
                models.User.update({"blocked": 1},
                    {where: { "user_email": req.body.requestor,"friend_email" : req.body.target}})
                    .then(function (result) {
                        res.statusCode = 200;
                        res.json({"success": true});
                    })
                    .catch(function(err){
                        throw new Error({error: "blocked  freinds error" +err});
                    })
            }
        }).catch(function(err){
            console.log(err);
            res.json({"error" : err});
        })
})

//3
/**
 * @api {post} /commonFriends As a user, I need an API to retrieve the common friends list between two email addresses.
 * @apiGroup Users
 * @apiParam {String[]} friends  friends array mentioning two friends email id to find common friends.
 * @apiParamExample {json} Input
 *    {
 *      "friends":
 *      [
 *       "andy@example.com",
 *      "john@example.com"
 *      ]
 *
 *    }
 * @apiSuccess {String} success.success common friends exists
 * @apiSuccess {String} success.friends list of common  friends emails address
 * @apiSuccess {String} success.count common friends list count

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
  * {
  *     "success": true,
  *     "friends" :
  *     [
  *      'common@example.com'
  *      ],
  *     "count" : 1
  *  }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/commonFriends', function(req,res){
    let friends = [];
    models.sequelize.query('SELECT friend_email FROM users  WHERE friend_email in ( SELECT  friend_email FROM users  WHERE user_email = :first and blocked =0) AND  user_email  = :second and blocked=0',
        { replacements: { first: req.body.friends[0],second : req.body.friends[1]  }, type: sequelize.QueryTypes.SELECT }
    ).then(users => {
        users.forEach(function(user, index){
            friends.push(user.friend_email);
        });
        console.log("helloo",friends);
        let jsonOutput= {};
        if(friends.length){
            jsonOutput={
                "success" :"false",
                "friends" : friends,
                "count"   : friends.length
            };
        }else {
            jsonOutput = {
                "success": "true",
                "friends": friends,
                "count": friends.length
            };
        }
        res.statusCode = 200;
        res.send(jsonOutput);
    })
})
//6  As a user, I need an API to retrieve all email addresses that can receive updates from an email address.
/**
 * @api {post} /recipientList  As a user, I need an API to retrieve all email addresses that can receive updates from an email address.
 * @apiGroup Users
 * @apiParam {String} sender sender email address
 * @apiParam {String} text text message to send
 * @apiParamExample {json} Input
 *  {
 *       "sender":  "john@example.com",
 *       "text": "Hello World! kate@example.com"
 *   }
 * @apiSuccess {String} success.success  fetch of reciepients
 * @apiSuccess {String[]} success.recipients list of reciepients who are supposed to recieve the text

 * @apiSuccessExample {json} success
 *    HTTP/1.1 200 OK
 *  {
 *  "success": true
 *   "recipients":
 *       [
 *       "lisa@example.com",
 *       "kate@example.com"
 *       ]
 *   }
 * @apiErrorExample {json}  error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/recipientList', function (req,res){
    let recipient = [];
    models.sequelize.query('SELECT DISTINCT user_email FROM users where (user_email = :sender and blocked=0) or ((friend_email= :sender and blocked=0) or ' +
        'sub_email = :sender )',{ replacements: { sender: req.body.sender}, type: sequelize.QueryTypes.SELECT })
        .then(users => {
              console.log("op",users);
            users.forEach(function(user,index){
                recipient.push(user.user_email);
            });
            const mentionEmail=req.body.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            mentionEmail.forEach(function(user,index){
                recipient.push(user);
            })
            let jsonOutput={
                "success" :"true",
                "recipients" : recipient
            };
            res.statusCode =200;
             res.send(jsonOutput);
    })
})







module.exports = router;
