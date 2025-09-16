const bodyParser = require("body-parser");
const Student = require("../models/Result/Student");
const router = require("express").Router();
const {UserRouteVerification} = require("../middleware/auth")


const  jsonToPdf = require("../pdfGen")

router.get("/my-transcript/:id", UserRouteVerification,  async(req, res) => {

const {id} = req.params;
console.log(id)

try {
const myResult =  await Student.findById(id); 
console.log(myResult)
if (myResult) {
  res.status(200).json(myResult);  
}
else {
    res.status(400).json("User transcript not available")
}


} catch (err) {
res.status(500).json({err: "Error obtaining the transcript. Please try again later. "})
}
})

router.get("/my-transcript/:id/generate", UserRouteVerification, async (req, res) => {
  const { id } = req.params;
  try {
    const myResult = await Student.findById(id);
    if (myResult) {
      // ✅ set headers before streaming
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

      // ✅ generate PDF and stream to response
      jsonToPdf(myResult, res);
    } else {
      res
        .status(400)
        .json({ err: "Users transcript could not be generated. Please try again later" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: "Users transcript could not be generated. Please try again later" });
  }
});



  
router.get("/allStudents",  UserRouteVerification,  async(req, res) => {
  const query = req.query.key;
  const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

  // Build the search query
  try {

  
  const items = await Student.find({
    $or: [
      { matricNo: { $regex: regex } },
      { name: { $regex: regex } },
     // For array fields
    ]
  });

  res.json(items);
  }
  catch (err) {
    console.log(err)
  res.status(500).json(err)
  }
  })

  
  
router.post("/addTranscript", UserRouteVerification, async(req, res) => {
  
const params = {...req.body?.studentInfo}

console.log(params)
if(details = null) {
  return res.status(400).json({err: "user result information missing"})
}
    try {
      myTrans = await Student.create({ name: params.name,
        email: params.email,
        matricNo: params.matricNo,
        academicSessionAdmitted: params.academicSessionAdmitted,
        details: params?.details});
      res.status(200).json({msg: "Student Info has been successfully created. "});



    } catch (err) {
      res.status(500).json("AN error occured while this operation was executed. Kindly try again soonest");
      console.log(err)
        
    }
})

router.put("/updateResult/:id", UserRouteVerification , async(req, res) => {
  const {id} =  req.params;

  const {details} = req.body;

  try {
    myTrans = await Student.findById(id);
    console.log(myTrans)
if (details) {
myTrans.details = details;
await myTrans.save();
res.status(200).json({msg:"user information updated successfully"})
}
    

  } catch (err) {
    console.error(err)
    res.status(500).json("The requested operation could not be completed at this time. Please try again later")
      
  }
})

router.delete("/studentResult/:id", UserRouteVerification, async(req, res) => {
  const {id} =  req.params;
  try {
    myTrans = await Student.findById(id);
    try {
      await myTrans.delete();
      res.status(200).json("successfuly deleted")
    }
    catch(err) {
      res.status(500).json("Can't delete now, try again later")
    }


    res.status(200).status({msg: "user deleted successfully"});


  } catch (err) {
    res.status(500).json("Inappropirate access")
      
  }
})



module.exports = router;