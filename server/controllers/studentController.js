const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../data/data.json');

function readData() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

function writeData(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8', err => {
      if (err) reject(err);
      resolve();
    });
  });
}

exports.getStudents = async (req, res) => {
  try {
    const students = await readData();
    res.json(students);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const students = await readData();
    const newStudent = req.body;
    newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
    students.push(newStudent);
    await writeData(students);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const students = await readData();
    const updatedStudent = req.body;
    const index = students.findIndex(student => student.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Student not found');

    students[index] = { ...students[index], ...updatedStudent };
    await writeData(students);
    res.json(students[index]);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const students = await readData();
    const filteredStudents = students.filter(student => student.id !== parseInt(req.params.id));
    await writeData(filteredStudents);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
