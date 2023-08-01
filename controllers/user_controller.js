
const User = require('../models/user');

//redering the signin page
module.exports.signIn = function(req, res){
    return res.render('sign_in',{
        title: 'ERS'
    });
}

//creating the session, basically for logging in
module.exports.createSession = async function(req, res){
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

//This function is used for rendering the signUp page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title:'ERS'
    });
}

//function to create the new user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash message
        req.flesh('error', 'Password should be equal to confirm password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false
        });
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

//This function is used for logging out
module.exports.destroySession = async function(req, res, done) {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    req.flash('success' , 'You are logged out!');
    return res.redirect('/users/sign-in');
}

//forget password pagfe
module.exports.forgetPasswordPage = function(req, res){
    return res.render('forget_password',{
        title: 'Forget Password'
    });
}

// this will update the existing password, with the newly created password.
module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    //console.log(user);
    //console.log(req.body);
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        req.flash('success' , 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');

}

// Adding employe, it is same as signUp , but it will redirect you to the addEmplyee page
module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    return res.redirect('back');
}
module.exports.createSuperUser = async function (req, res) {
    try {
        const superuser = await User.findOne({ email: 'admin@gmail.com' }).maxTimeMS(30000); // Set timeout to 30 seconds

  
      if (!superuser) {
        await User.create({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: '123',
          isAdmin: true,
        });
        console.log('Superuser created successfully!');
      } else {
        console.log('Superuser already exists!');
      }
    } catch (err) {
      console.error('Error creating superuser:', err);
    }
  };
  



  

  module.exports.editEmployee = async function (req, res) {
    try {
      const employeeId = req.params.id;
      const employee = await User.findById(employeeId);
  
      if (!employee) {
        // Handle the case when the employee doesn't exist
        return res.redirect('/admin/view-employee');
      }
  
      return res.render('edit', {
        title: 'Edit Employee',
        employee: employee,
      });
    } catch (err) {
      console.error('Error rendering edit employee form:', err);
      return res.redirect('/admin/view-employee');
    }
  };
  
  // Handle the employee update
  module.exports.updateEmployee = async function (req, res) {
    try {
      const employeeId = req.params.id;
      const employee = await User.findById(employeeId);
  
      if (!employee) {
        // Handle the case when the employee doesn't exist
        return res.redirect('/admin/view-employee');
      }
  
      // Update the employee details
      employee.name = req.body.name;
      employee.email = req.body.email;
      // Update any other fields you want to modify
  
      await employee.save();
  
      return res.redirect('/admin/view-employee');
    } catch (err) {
      console.error('Error updating employee:', err);
      return res.redirect('/admin/view-employee');
    }
  };