require('dotenv').config() 
const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())

const uri = process.env.MONGO_URI

MongoClient.connect(uri)
  .then(client => {
    const db = client.db('library')
    const bookCollection = db.collection('books')
        app.get('/', (req, res) => {
            bookCollection
            .find()
            .toArray()
            .then(results => {
                  res.render('index.ejs', { books: results })
            })
.catch(error => console.error(error))
})

app.post('/books', (req, res) =>{
bookCollection
.insertOne({ name: req.body.name, genre: req.body.genre })
.then(result => {
    res.redirect('/')
})
.catch(error => console.error(error))
})

app.put('/books', (req, res) => {
bookCollection
  .findOneAndUpdate(
   { name: req.body.name },
      {
        $set: {
          name: req.body.newName,
          genre: req.body.genre
        }
      },
      {
        upsert: true,
    })
  .then(result => {
    console.log(result)
  })
  .catch(error => console.error(error))

})

app.delete('/books', (req, res) => { 
    bookCollection.deleteOne({name :req.body.name})
    .then(result => {
        res.json('Deleted.')
    })
     .catch(error => console.error(error))
})

    app.listen(PORT, () => console.log(`listening on ${PORT}`))
  })
  .catch(error => console.error(error))