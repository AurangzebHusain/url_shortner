const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('index');
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started at ${process.env.PORT || 5000}`);
});
