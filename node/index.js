
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000;
const DB = "mongodb+srv://kajal2082909:kajal12345@cluster0.ax0k2yr.mongodb.net/Figma?retryWrites=true&w=majority"
const cors = require('cors');

mongoose.connect(DB).then(()=>{
console.log('connection successful')
}).catch((err) =>{
  console.log('no connection',err)
})


app.use(cors()); // Enable CORS for all routes
// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.get('/',(req,res)=>{
  res.send('Hello world from the server')
})

const fileSchema = new mongoose.Schema({
  filename:String,
  description:String
  // other project fields
});

const File = mongoose.model('File', fileSchema);


const projectSchema = new mongoose.Schema({
  name:String,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  // other project fields
});

const Project = mongoose.model('Project', projectSchema);







// ------------UserTable--------------


const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  // other fields as needed
});

const User = mongoose.model('User', userSchema);

app.post('/api/users/addData', async (req, res) => {
  try {
    // Create a new document using the Mongoose model
    const newData = new User(req.body);
    // Save the document to the database
    const result = await newData.save();

    res.status(201).json({ success: true, insertedId: result._id });
  } catch (error) {
    console.error('Error adding data to MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/users/getData', async (req, res) => {
  try {
    // Use Mongoose query to find documents in the collection
    const data = await User.find();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error getting data from MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/users/getData/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await User.findById({ _id: id });
    if (!result){
      res.status(200).json({ message : "Data is not available" });

    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error getting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.put('/api/users/putData/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await User.updateOne({ _id: id }, { $set: req.body });
    
    res.status(200).json({ success: true, modifiedCount: result.nModified });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.delete('/api/users/deleteData/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await User.deleteOne({ _id: id });
    if (!result){
      res.status(500).json({ success: false ,message:"Id is not available"});
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// ------------Project Crud-----------------------------

app.post('/api/users/:userId/projects', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('projects');;
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const newProject = new Project(req.body);
    await newProject.save();
    console.log(newProject._id)
    user.projects.push(newProject._id);
    // Save the document to the database
    await user.save();

    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/users/:userId/projects', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('projects');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, projects: user.projects });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.get('/api/projects', async (req, res) => {
  try {
    // Use Mongoose query to find documents in the collection
    const result = await Project.find();
    
    res.status(200).json({ success: true, data:result});
  } catch (error) {
    console.error('Error getting data from MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await Project.findById({ _id: id });
    if (!result){
      res.status(200).json({ message : "Data is not available" });

    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error getting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await Project.updateOne({ _id: id }, { $set: req.body });
    
    res.status(200).json({ success: true, modifiedCount: result.nModified });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await Project.deleteOne({ _id: id });
    if (!result){
      res.status(500).json({ success: false ,message:"Id is not available"});
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// --------------------File Crud--------------------------

app.post('/api/projects/:projectId/files',async(req,res)=> {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const newFile = new File(req.body);
    await newFile.save();
    project.files.push(newFile);
    // Save the document to the database
    await project.save();

    res.status(201).json({ success: true, files:newFile });
  } catch (error) {
    console.error('Error creating File:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
})

app.get('/api/projects/:projectId/files', async (req, res) => {
  console.log("kkkkkkkkkkk",req.params)
  try {
    const project = await Project.findById(req.params.projectId).populate('files');
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, files: project.files });
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.get('/api/files', async (req, res) => {
  try {
    // Use Mongoose query to find documents in the collection
    const result = await File.find();
    
    res.status(200).json({ success: true, data:result});
  } catch (error) {
    console.error('Error getting data from MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/api/files/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await File.findById({ _id: id });
    if (!result){
      res.status(200).json({ message : "Data is not available" });

    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error getting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.put('/api/files/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await File.updateOne({ _id: id }, { $set: req.body });
    
    res.status(200).json({ success: true, modifiedCount: result.nModified });
  } catch (error) {
    console.error('Error updating data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.delete('/api/files/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Use Mongoose query to update a document in the collection
    const result = await File.deleteOne({ _id: id });
    if (!result){
      res.status(500).json({ success: false ,message:"Id is not available"});
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting data in MongoDB:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port,()=>{
  console.log(`Server up and running on port ${port}`);
})