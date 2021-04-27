// To validate objects
const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
var bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();
var fs = require('fs');
var http = require('http');
var url = require('url');


const courses =[
  
    {id:1, name:"Electrical Testing",code:"CSE451",description:"course in computer engineering"},
    {id:2, name:"multimedia",code:"CSE412",description:"selected topics in computer engineering"},
    {id:3, name:"image processing",code:"CSE464",description:"course in computer engineering"},

];

const students  =[
 
    {id:1, name:"Mary Malak Labib",code:"1601069"},
    {id:2, name:"Mariam",code:"1609999"},
    {id:3, name:"Mohamed",code:"1607777"},

];

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(5).required(),
        code: Joi.string().regex(/^[A-Za-z]{3}[0-9]{3}$/).required(),
        description: Joi.string().max(200)
    };
    return Joi.validate(course, schema);
}
   
function validateStudent(student){

    const schema = {
        name: Joi.string().regex(/^[a-zA-Z-']*$/).required(),   
        code: Joi.string().min(7).max(7).required(),
    };

    return Joi.validate(student,schema);
    
}

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// to get single course
// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
     // error 404 object not found
    if (!course) return res.status(404).send('THe course with the given id was not found.');
        
    res.send(course);
});


// Add course
app.post('/api/courses/create', (req, res) => {
    
    // validate request
   // const { error } = validatecourse(req.body); // result.error
    //if (error) return  res.status(400).send(result.error.details[0].message);
    
    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name,
        code: req.body.code,
    };
    courses.push(course);
    res.send(course);
});



// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the courses 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
     // error 404 object not found
    if (!course) return res.status(404).send('The course with the given id was not found.');
        
    // validate 
    // If not valid, return 400 bad request
    //const { error } = validatestudent(req.body); // result.error
    //if (error) return  res.status(400).send(error.details[0].message);

   // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code= req.body.code;
    course.description= req.body.description;
    res.send(course);
});

// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
     // error 404 object not found
     if (!course) return res.status(404).send('The course with the given id was not found.');


    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});




// to get all student
app.get('/api/students', (req, res) => {
    res.send(students);
});
// to get one student
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
     // error 404 object not found
    if (!student) return res.status(404).send('The student with the given id was not found.');     
    res.send(student);
});

// Add student
app.post('/api/students/create', (req, res) => {
    
    // validate request
   // const { error } = validateStudent(req.body); // result.error
    //if (error) return  res.status(400).send(result.error.details[0].message);
    
    // create a new student object
    const student = {
        id: students.length + 1,
        name: req.body.name,
        code: req.body.code,
    };
    students.push(student);
    res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(s => s.id === parseInt(req.params.id));
     // error 404 object not found
    if (!student) return res.status(404).send('The student with the given id was not found.');
        
    // validate 
    // If not valid, return 400 bad request
    //const { error } = validatestudent(req.body); // result.error
    //if (error) return  res.status(400).send(error.details[0].message);


    // Update the student 
    student.name =req.body.name;   
    student.code =req.body.code;
    res.send(student);
});

// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(s => s.id === parseInt(req.params.id));
     // error 404 object not found
    if (!student) return res.status(404).send('The student with the given id was not found.');

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same student
    res.send(student);
});
app.get('/web/courses/create',(req,res) =>{
    res.sendFile(__dirname+"/course.html")
})

app.get('/web/students/create',(req,res) =>{
    res.sendFile(__dirname+"/student.html")
})

app.get('/',(req,res) =>{
    res.send('Welcome');
})

// Environment variable
const port = process.env.PORT || 3000
app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);
