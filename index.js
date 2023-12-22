const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5001
require('dotenv').config()
app.use(cors())
app.use(express.json())

// MongoDB...

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wukhoja.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const toDoCollection = client.db('taskManagement').collection('toDO')
    // const ongoingCollection = client.db('taskManagement').collection('ongoing')
    // const completedCollection = client.db('taskManagement').collection('completed')

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.post('/addNewTask',async(req,res)=>{
      const taskInfo = req.body
      console.log(taskInfo);
      const result =await toDoCollection.insertOne(taskInfo)
      res.send(result)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Job Task Server');
  })
  app.listen(port, () => {
    console.log(`App is running on ${port}`);
  })