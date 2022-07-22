const express = require("express");
const mongoose = require("mongoose");
const Album = require("./models/Album");
const cors = require('cors')
const sample = require("./models/Album");
const app = express();


const AlbumModel = require("./models/Album");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sample:sample1256@sample.54xie.mongodb.net/sample?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});
//Insert data from database
app.post('/insert',async (req, res) => {

   const ArtistName = req.body.ArtistName
   const SongID = req.body.SongID
   const Title = req.body.Title
   const ReleaseDate = req.body.ReleaseDate
   const SongName = req.body.SongName
   const sample = new AlbumModel({AlbumId:SongID,AlbumName:"POP",Title:"Pop Song",ArtistName:ArtistName,SongName:"",ReleaseDate:25});

   try{
      await sample.save();
   }catch(err){
    console.log(err)
   }
});

// Read data from data base
app.get('/read',async (req, res) => {
     AlbumModel.find({},(err, result) => {
       if(err){
          res.send(err);
       }

       res.send(result);
     })
  
});
//update
app.put('/update',async (req, res) => {

   const NewAlbumSong = req.body.NewAlbumSong
   const id = req.body.id
   const Title = req.body.Title
   const ReleaseDate = req.body.ReleaseDate
   //const sample = new AlbumModel({AlbumId:SongID,AlbumName:"POP",Title:"Pop Song",ArtistName:ArtistName,ReleaseDate:25});

   try{
       await AlbumModel.findById(id,(err, updatedAlbum)=>{
         updatedAlbum.AlbumName = newAlbumName;
         updatedAlbum.save();
         res.send("update");
      });
   }catch(err){
    console.log(err)
   }
});
app.delete("/delete/:id",async (req, res) =>{
const id = req.params.id;
await AlbumModel.findByIdAndRemove(id).exec();
res.send("deleted");
});


app.listen(3001,()=>{
    console.log("Server running on port 3001...");
});