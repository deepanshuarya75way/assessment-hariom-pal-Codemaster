const mongoose = require('mongoose');
const plagiarismSchema=new mongoose.Schema({
  problemId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Problem",
    required:true,

  },
  user1:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
   user2:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  submission1:{
type:mongoose.Schema.Types.ObjectId,
ref:"Submission",
required:true
  },
  submission2:{
type:mongoose.Schema.Types.ObjectId,
ref:"Submission",
required:true
  },
  similarity:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    enum:[
      "normal",
      "suspicious",
      "reviewed"
    ],
    default:"normal",
  },

})

const Plagiarism = mongoose.model('Plagiarism',plagiarismSchema);

module.exports = Plagiarism;