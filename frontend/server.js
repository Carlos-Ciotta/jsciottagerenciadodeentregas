const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors())

app.get("/entregas", async(_req, res) => {
    try {
      const { data } = await axios("https://127.0.0.1:3000/entregas")

      return res.json(data)
      
    } catch (error) {
      console.error(error)
    }
  })




app.listen('3000')