const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db
app.set('view engine', 'ejs')

MongoClient.connect('mongodb://starwars:abcdef1@ds225703.mlab.com:25703/star-wars-quote',{ useNewUrlParser: true },  (err, client) => {
  if (err) return console.log(err)
  db = client.db('star-wars-quote')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function(err, result) {
	if (err) console.log(err)
  res.render('index.ejs', {quotes: result})
 })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
