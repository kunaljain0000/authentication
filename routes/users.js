const express = require('express');
const router = express.Router();

//usermodel
const usermodel = require('./usermodel/User');


//login
router.get('/login', (req, res) =>  res.render('login'));


//register
router.get('/register', (req, res) =>  res.render('register'));


//register data
router.post('/register', (req, res) => {
   const { name, email, password, password2 }= req.body;

   let errors= [];

   //check required fields
   if (!name || !email || !password || !password2) {
       errors.push({msg: 'please fill out the required fields'});
   }

   //check password match 
   if (password !== password2) {
        errors.push({msg: 'passwords do nt match'});
    }

    //check password length
    if (password.length < 6) {
        errors.push({msg: 'password length should be minimum 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });

    }
    else{
        //validation passed

        User.findOne({email: email})
        .then(user => {
            if(user){
                //user exists
                error.push({msg:'email already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });

            }else{
                const newuser = new User({
                    name,
                    email,
                    password
                });

                console.log(newuser)
                res.send('hello');
            }
        })
    }
});




module.exports = router;