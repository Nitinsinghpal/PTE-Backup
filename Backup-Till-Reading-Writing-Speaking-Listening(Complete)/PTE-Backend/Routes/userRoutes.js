const express = require('express')
const {getAllUsers,create,update, deleteUser} = require('../Controller/userController')
const {getReadingQuestions, checkAnswers} = require('../Controller/readingQuestionsController');
const { checkSpellings, checkSummary } = require('../Controller/writingController');


const route = express.Router();

route.get('/getAllUsers',getAllUsers)
route.post('/create',create)
route.put('/update/:id',update)
route.delete('/delete/:id',deleteUser)

//For Reading
route.get('/getAllReadingQuestions',getReadingQuestions)
route.post('/checkAnswers',checkAnswers)

//For Writing
route.get('/checkSpellings',checkSpellings)
route.post('/checkSummary',checkSummary)






module.exports =  route;