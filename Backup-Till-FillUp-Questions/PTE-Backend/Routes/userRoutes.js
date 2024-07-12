const express = require('express')
const {getAllUsers,create,update, deleteUser} = require('../Controller/userController')
const {getReadingQuestions, checkAnswers} = require('../Controller/readingQuestionsController')


const route = express.Router();

route.get('/getAllUsers',getAllUsers)
route.post('/create',create)
route.put('/update/:id',update)
route.delete('/delete/:id',deleteUser)

route.get('/getAllReadingQuestions',getReadingQuestions)
route.post('/checkAnswers',checkAnswers)





module.exports =  route;