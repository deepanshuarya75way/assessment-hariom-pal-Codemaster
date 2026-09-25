import submissionSchema from "../models/submissions.js"
import Plagiarism  from "../models/plagiarism.js";
const { calculateCodeSmilarity } = require("../utils/plagiarism");

const CheckPlagiarism=async(req,res)=>{
       try {
          const submissions=await submissionSchema.find({
             status:"Accepted",
          }).select("_id,userId,problemId,code,language,createdAt")



          const groupedByProblem={};
          for(const submission of submission){
            const problemId=submission.problemId.toString();

            if(!groupedByProblem[problemId]){
              groupedByProblem[problemId].push(submission)
            }

            let checkpairs=0;
            let suspiciouspairs=0;

            for(const problemId in groupedByProblem){
              const problemsubmissiom=groupedByProblem[problemId];

              for(let i=0;i<problemsubmissiom.length;i++){
                 for(let j=i+1;j<problemsubmissiom.length;j++){
                  const submission1=problemsubmissiom[i];
                  const submission2=problemsubmissiom[j];

                  if(submission1.userId.toString()===submission2.userId.toString()){
                    continue;
                  }
                  const similarity=calculateCodeSmilarity(submission1.code,
                    submission2.code
                  );

                  checkpairs++;

                  let status="normal";
                  if(similarity>=80){
                    status="suspicious";
                    suspiciouspairs++;
                  }

                  const users=[
                    submission1.userId.toString(),
                    submission2.userId.toString(),
                  ].sort();


                  const submissionIds=[
                    submission1._id.toString(),
                    submission2._id.toString(),
                  ].sort()

                  const existing=await Plagiarism.findOne({
                    problemId,
                    user1:users[0],
                    user2:users[1]
                  })

                  if(existing){
                    existing.similarity=similarity;
                    existing.status=status;
                    existing.submission1=submissionIds[0];
                    existing.submission2=submissionIds[1];

                    await existing.save();
                  }
                  else{
                    await Plagiarism.create({
                      problemId,
                      user1:users[0],
                      user2:users[1],
                      submission1:submissionIds[0],
                      submission2:submissionIds[1],
                       similarity,
                       status
                    })
                  }
                 }
            }
            }
        return res.status(200).json({
          success:true,
          message:"plagirasim detected succesfully",
          totalAcceptedSubmissions:submissions.length,
          checkpairs,
          suspiciouspairs
        });
            
          }
       } catch (error) {
          return res.status(500).json({
            success:false,
            message:"failed to check plagiarsim",
            error:error.message
          })
       }
}

const getallplagiarismreports=async(req,res)=>{
  try {
    const reports=await Plagiarism.find({})
    .populate(
      "problemId",
      "title difficulty"
    )
    .populate(
      "user1",
      "firstName,lastName,email"
    )
    .populate(
      "user2",
      "firstName,lastName,email"
    )
    .populate(
      "submission1",
      "code language status "
    )
     .populate(
      "submission2",
      "code language status "
    )
    .sort({
      similarity:-1
    })
    return res.status(200).json({
      success:true,
      count:reports.length,
      reports
    })
  } catch (error) {
       return res.status(500).json({
        success:false,
        message:"failed to get reports",
        error:removeEventListener.message
       })
  }
}


export default {getallplagiarismreports,CheckPlagiarism}