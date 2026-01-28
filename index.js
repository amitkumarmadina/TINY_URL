const express = require('express');
const urlRoutes = require('./routes/url');
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
  
const app = express();
const port = 3000; 

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => {
    console.log('Connected to MongoDB');
});

app.use('/url', urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId,
  },{
    $push : {
      visitHistory: {
        timestamp: new Date(),
      },
    },
  });
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});