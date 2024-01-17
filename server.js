const express = require('express');
const cors = require('cors');
const app = express()

app.use(express.json(), cors({ origin: 'http://localhost:3000' }));
student_id = 0
students = []

app.get("/student", (req, res) => {
  res.status(200).json({"status":"OK", "students":students})
})

app.post("/student", (req, res) => {
  students.push({ "name": req.body.name, "grade": req.body.grade, "id": student_id });
  student_id += 1;
  res.status(201).json({ "status": "OK", "message": "Student added with name " + req.body.name });
});

app.delete("/student/:id",(req,res)=>{
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  const deleteId = parseInt(req.params.id);
  students = students.filter(student => student.id !== deleteId);
  res.status(200).json({ "status": "OK", "message": "Deleted student with id " + deleteId });
})

app.patch("/student/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find(s => s.id === studentId);
  student.name = req.body.name;
  student.grade = req.body.grade;

  res.status(200).json({ "status": "OK", "message": "Student updated", "student": student });
});

app.listen(5656, () => {
    console.log(`http://localhost:5656`)
})
