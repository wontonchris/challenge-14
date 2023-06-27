const express = require('express');
const router = express.Router();
const {User,Project} = require('../models');

router.get("/",(req,res)=>{
    Project.findAll().then(projects=>{
        const projectsHbsData = projects.map(project=>project.get({plain:true}))
        console.log(projects);
        console.log("==============")
        console.log(projectsHbsData)

        res.render("home",{
            projects:projectsHbsData,
            logged_in:req.session.logged_in
        })
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})
router.get("/project/:id",(req,res)=>{
    Project.findByPk(req.params.id,{
        include:[User]
    }).then(project=>{
        const projectHbsData = project.get({plain:true});
        console.log(project);
        console.log("==============")
        console.log(projectHbsData)
        projectHbsData.logged_in=req.session.logged_in
        res.render("proj-details",projectHbsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Project]
    }).then(userData=>{
        const hbsData = userData.toJSON();
        console.log(hbsData)
        hbsData.logged_in=req.session.logged_in
        res.render("profile",hbsData)
    })
})

module.exports = router;