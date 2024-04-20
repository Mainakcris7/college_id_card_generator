const express = require('express')
const path = require('path')
const multer = require('multer')
const sql = require('mysql2')
const fs = require('fs')

// for student
const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'student_id_card',  // database that is used
    password: "mainak@mysql"   // password of mysql
})

// for teacher
const connection2 = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'student_id_card',  // database that is used
    password: "mainak@mysql"   // password of mysql
})

const app = express()
const PORT = 8080;
app.listen(PORT)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "static")))
app.set('views', path.join(__dirname, "views"))
app.set("view engine", "ejs")

var pic_url = null;   // Will be used to create current picture url
var sign_url = null;   // Will be used to create current sign url
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + req.body['uid'] + "-" + req.body['name'] + ".png")
    }
})

// Handle multiple uploads
const upload = multer({ storage: storage })
const multi_upload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'sign', maxCount: 1 }])

app.get("/", (req, res) => {
    res.render("index.ejs")
})

var who;
app.get("/form/:who", (req, res) => {
    who = req.params['who']
    res.render("form.ejs", { who })
})

// This same data will be used in the /image route, that's why saving it, each time new data comes, these values will be updated
var data;
var name, roll;

app.post("/preview", multi_upload, (req, res) => {
    data = req.body;

    name = data['name'].toUpperCase();
    if ("roll" in data)
        roll = data['roll'].toUpperCase();
    // res.send(req.files)
    pic_url = path.join("Images", "pic" + "-" + req.body['uid'] + "-" + req.body['name'] + ".png")
    if (who == 'faculty') {
        if ("sign" in req.files) {
            sign_url = path.join("Images", "sign" + "-" + req.body['uid'] + "-" + req.body['name'] + ".png")
        } else {
            sign_url = null
        }
    }


    res.render("preview.ejs", { name, roll, data, pic_url, sign_url, who })
    // res.send("hey")
    // res.send({ ...data, pic_url, sign_url })
})
app.get("/image", (req, res) => {

    // Insert data in SQL
    if (who == 'student') {
        let q = 'INSERT INTO student_details VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let { uid, dept, dob, address, state, pincode, contact1, contact2, valid_upto, blood_grp, issue_date } = data;

        if (!contact2) {
            contact2 = null;   // 2nd contact number is optional
        }
        let new_data = [uid, name, roll, dept, dob, address, state, pincode, contact1, contact2, valid_upto, blood_grp, issue_date];
        connection.query(q, new_data, (err, result) => {
            try {
                if (err) throw err;
                res.render("get_image.ejs", { name, roll, data, pic_url, who })
            } catch (err) {
                res.render("error.ejs", { err })
            }
        })
        // write to csv
        let csv_data = `\n${uid}, ${name}, ${roll}, ${dept}, ${dob}, ${address}, ${state}, ${pincode}, ${contact1}, ${contact2}, ${valid_upto}, ${blood_grp}, ${issue_date}`
        fs.appendFile("student.csv", csv_data, (err) => {
            try {
                if (err) throw err;
            }
            catch (err) {
                console.log(err)
            }
        })
    } else {   // For faculty
        let q2 = 'INSERT INTO teacher_details VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let { uid, dept, designation, address, state, pincode, contact1, contact2, blood_grp } = data;

        if (!contact2) {
            contact2 = null;   // 2nd contact number is optional
        }

        let new_data = [uid, name, designation, dept, address, state, pincode, contact1, contact2, blood_grp];
        connection2.query(q2, new_data, (err, result) => {
            try {
                if (err) throw err;
                res.render("get_image.ejs", { name, roll, data, pic_url, sign_url, who })
            } catch (err) {
                res.render("error.ejs", { err })
            }
        })

        // Write to teacher.csv file
        let csv_data = `\n${uid}, ${name}, ${designation}, ${dept}, ${address}, ${state}, ${pincode}, ${contact1}, ${contact2}, ${blood_grp}`
        fs.appendFile("teacher.csv", csv_data, (err) => {
            try {
                if (err) throw err;
            }
            catch (err) {
                console.log(err)
            }
        })

    }
})
