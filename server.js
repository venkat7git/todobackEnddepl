const {MongoClient} = require('mongodb');
const {v4 : uuidv4} = require('uuid')
const cors = require('cors')
const express = require("express");


const app = express()

app.use(express.json())
app.use(cors())


const uri = 'mongodb+srv://venkat345ns:Mongo768atlas@cluster0.5d9fj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri);

let todo = null;

const dbConnection = ()=>{
    try{
        const database = client.db('todoDb');
        todo =  database.collection('todoCn');
        app.listen(3007,()=>{
            console.log('server listening port:3007');
        })
    }catch(err){
        console.log(err)
    }
    
}

dbConnection();



app.get('/todos/',async (req,res)=>{
    try{
        const result = await todo.find();
        const data   = await result.toArray();
        res.send(data)
      }catch(err){
        res.send(err)
        await client.close()
      }
    
})

app.post('/newTodo/',async (req,res)=>{
    

    try{
        const result = await todo.insertOne(req.body);
        res.send("inserted successfully")
    }catch(err){
        res.send(err)
    }
})

app.delete('/deleteTodo/:todoId/',async (req,res)=>{
    const {todoId} = req.params

    const queryObj = {
        id:todoId
    }
    try{
        await todo.deleteOne(queryObj);
    res.send("deleted successfully")
    }catch(err){
        res.send(err)
    }
    
})

app.put('/updateTodo/:todoId',async (req,res)=>{
    const {todoId} = req.params
    
    try{
        await todo.updateOne( { id: todoId },
            {
              $set: {
                isDone:req.body.isDone,
                time:req.body.time
              }
            })
        res.send("updated successfully")
    }catch(err){
        console.log(err)
    }
    

})
app.put('/updateTodoText/:todoId',async (req,res)=>{
    const {todoId} = req.params
    
    try{
        await todo.updateOne( { id: todoId },
            {
              $set: {
                todo:req.body.todo,
                time:req.body.time
              }
            })
        res.send("updated successfully")
    }catch(err){
        console.log(err)
    }
    

})
