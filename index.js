import express from 'express'
import cors from ' cors'
const app = express()
app.use (express.json())
app.use (express.urlencoded({extended:true}))
appuse(cors())
const port = 3000
app.listen(port,()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
})