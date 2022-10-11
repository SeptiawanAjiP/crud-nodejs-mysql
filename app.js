const express = require('express')
const app = express()
const conn = require('./config/db')

app.use(express.json())
 
app.get('/get-mahasiswa', function (req, res) {
  const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL';
  conn.query(queryStr, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menampilkan data",
        "data" : results
      });
    }
  })
})

app.get('/get-mahasiswa-by-id', function (req, res) {
  const param = req.query;
  const id = param.id;
  const queryStr = 'SELECT * FROM mahasiswa WHERE id = ? AND deleted_at IS NULL';
  const values = [id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menampilkan data",
        "data" : results
      });
    }
  })
})



app.post('/store-mahasiswa', function (req, res) {
  const param = req.body;
  const name = param.name;
  const jurusan = param.jurusan;
  const queryStr = 'INSERT INTO mahasiswa (name, jurusan) VALUES (?, ?)';
  const values = [name, jurusan];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menyimpan data",
        "data" : null
      });
    }
  })
})

app.post('/update-mahasiswa', function (req, res) {
  const param = req.body;
  const id = param.id;
  const name = param.name;
  const jurusan = param.jurusan;
  const queryStr = 'UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? AND deleted_at IS NULL';
  const values = [name, jurusan, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses mengubah data",
        "data" : null
      });
    }
  })
})

app.post('/delete-mahasiswa', function (req, res) {
  const param = req.body;
  const id = param.id;
  const queryStr = 'UPDATE mahasiswa SET deleted_at = ? WHERE id = ?';
  const now = new Date();
  const values = [now, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        "success" : true,
        "message" : "Sukses menghapus data",
        "data" : null
      });
    }
  })
})
 
app.listen(3000)