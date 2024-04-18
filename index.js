const express = require('express')
const path = require('path')
const multer = require('multer')
const sql = require('mysql2')

const connection = sql.createConnection({
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

var curr_filename = null;   // Will be used to create current image url
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "static/Images")
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, req.body['uid'] + "-" + req.body['name'] + "-" + file.originalname)
        curr_filename = req.body['uid'] + "-" + req.body['name'] + "-" + file.originalname;
    }
})
const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/image", upload.single("input_img"), (req, res) => {
    const data = req.body;
    let name = data['name'].toUpperCase();
    let roll = data['roll'].toUpperCase();
    let img_url = path.join("Images", curr_filename)
    res.render("get_image.ejs", { name, roll, data, img_url })
    // Insert data in SQL
    let q = 'INSERT INTO student_details VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let { uid, dept, dob, address, state, pincode, contact1, contact2, valid_upto, blood_grp, issue_date } = data;

    if (!contact2) {
        contact2 = null;   // 2nd contact number is optional
    }
    let new_data = [uid, name, roll, dept, dob, address, state, pincode, contact1, contact2, valid_upto, blood_grp, issue_date];
    connection.query(q, new_data, (err, result) => {
        try {
            if (err) throw err;
        } catch (err) {
            console.log(err);
        }
    })
})
