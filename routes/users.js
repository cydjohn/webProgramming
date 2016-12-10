/**
 * Created by sanketh on 11/26/2016.
 */
const data = require("../data");
const express = require('express');
var fs = require('fs');
const path = require('path');
const passport = require("passport");
const router = express.Router();
const userData = data.users;
var xss = require('xss');


router.get("/", function (request, response) {
    console.log("session check in /");
    console.log(request.session.passport)
    if(request.session.passport && request.session.passport.user)
        response.redirect("/myprofile");
    else
        response.render("mainHomeScreen", {partial:"home-scripts"});
});

router.get("/successfulSignup", function(request, response) {
    response.render("user/successSignupScreen", {partial:"home-scripts"});
});

router.get("/login", function (request, response) {
    console.log("Get Method for login form.");
    console.log("session check in /login");
    if(request.session.passport && request.session.passport.user)
        response.redirect("/myprofile");
    else
        response.render("user/loginform", {partial:"userlogin-scripts", message: request.flash('message')});
});

router.get("/myprofile", function(request, response) {
    //console.log(request.user);
    if(request.user === undefined) response.redirect('/login');
    else response.render('user/myprofile', { user: request.user, partial:"mainscreen-scripts" });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/myprofile',
    failureRedirect: '/login',
    failureFlash : true
}));

router.get('/logout', function(request, response){
    request.logout();
    response.redirect('/login');
});

/*router.get("/myprofile/:id", function (request, response) {
    //console.log("Get Method for myprofile.")
    //console.log(request.params);
    //console.log(request.params.id);

    userData.getUserByID(request.params.id).then((user) => {
        //console.log("MY PROFILE");
        //response.status(200).json({message: "Success"});
        fs.unlink(user.imagePath);
        console.log(fs.unlink(user.imagePath));
        response.render("user/myprofile",{partial:"mainscreen-scripts", profile : user});
        }, (error) => {
            //console.log("MY PROFILE NOT exists");
            response.status(404).json({message: "User not exists!"});
        }), (error) => {
        //console.log(error);
        let route = path.resolve(`static/errorPage.html`);
        res.status(404).sendFile(route);
    }
    //response.render("user/myprofile", {profile: user} ,{partial:"mainscreen-scripts"});
});*/

router.get("/signup", function (request, response) {
    //console.log("Get Method for signup form.")
    response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.post("/signup", function (request, response) {
    console.log("request.file check");
    //console.log(request.body.file);
    /*if(request.file){
        var tmp_path = request.file.path;
        var imageId = uuid.v4();
        var target_path = 'public/profilePictures/' + imageId;
        request.body.image = target_path;

        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {console.log("Image Uploaded Successfully"); });
        src.on('error', function(err) { response.json({error: true,message:err}); });
    }
    else
    {
        var target_path = 'public/images/defaultProfilePic.jpg';
        request.body.image = target_path;
    }*/
        var requestData = request.body;
        userData.addUser(request.body)
            .then((newUser) => {
                //console.log("New User Added!");
                response.redirect("/successfulSignup");
                //response.json({ success: true, message: newUser});
            }).catch((e) => {
                //console.log("*********");
                console.log(e);
                //response.json({ error: true, message:"Email already exists."});
            response.render("user/signupform",{error: e,partial:"mainscreen-scripts",firstName: xss(requestData.firstName), lastName: xss(requestData.lastName), gender: requestData.gender, email:xss(requestData.email),password:requestData.password,
                phoneNumber:xss(requestData.phoneNumber),address:xss(requestData.address),city:xss(requestData.city),state:xss(requestData.state),zipCode:xss(requestData.zipCode)});
            //return;
        });
    //response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.post("/login", function (request, response) {
    console.log("Post Method for login form.")
    //response.render("user/signupform",  {partial:"mainscreen-scripts"});
});

router.get("/about", function (request, response) {
    response.render("aboutPage", {partial:"userlogin-scripts"});
});

module.exports = router;
