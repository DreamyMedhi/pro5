const express = require('express');
const dotenv=require('dotenv');
const app = express();
const port = 3000;
const mongoose=require('mongoose');

dotenv.config();
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
});
app.use(express.urlencoded({extended:false}));

const formDataSchema =new mongoose.Schema({
    name:String,
    email:String,
})
const FormData = mongoose.model('FormData', formDataSchema);


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));


  app.post('/data', (req, res) => {
    const formData = req.body;
  
    const newFormData = new FormData({
      name: formData.name,
      email: formData.email
    });
  
    newFormData.save().then(() => {
        res.render('result', { data: formData });
      })
      .catch((error) => {
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.get('/formdata', (req, res) => {
    FormData.find().then((formDatas) => {
        res.render('formdata', { formDatas });
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  

app.get('/', (req, res) => {
  res.render('form');
});


app.listen(port, () => {
  console.log("Local Server 3000 running");
});
