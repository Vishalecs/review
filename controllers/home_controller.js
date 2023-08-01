const User = require('../models/user');
const Review = require('../models/review');

// This function is for the passing the variable to the home page, such as reviers array, and employee array
module.exports.home = async function(req, res){
    try{
        //checking for aunthentication
        if(!req.isAuthenticated()){
            req.flash('error', 'Please LogIn !');
            return res.redirect('/users/sign-in');
        }
        //Feching the user and reviews from the form
        let user = await User.findById(req.user.id);
        let review = await Review.find({ reviewer: req.user.id });

        //making array of recipent
        let recipent = [];
        for(let i=0; i<user.userToReview.length; i++){
            let userName = await User.findById(user.userToReview[i]);
            recipent.push(userName);
        }
        
        //making review array
        let reviews = [];
        for(let i=0; i<review.length; i++){
            let reviewUser = await User.findById(review[i].reviewed);
            if(reviewUser != null){
                let currentUser = {
                    name : reviewUser.name,
                    content: review[i].content
                }
                reviews.push(currentUser);
            }
        }

        return res.render('home',{
            title: "ERS",
            recipent: recipent,
            reviews: reviews,
            user: user
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}