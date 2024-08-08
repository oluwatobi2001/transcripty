const bodyParser = require("body-parser");
const Student = require("../models/Result/Student");
const router = require("express").Router();
const {UserRouteVerification} = require("../middleware/auth")


const  jsonToPdf = require("../pdfGen")

router.get("/my-transcript/:id", UserRouteVerification,  async(req, res) => {

const id = req.params.id;
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
res.status(500).json(err)
}
})

router.get("/my-transcript/:id/generate", UserRouteVerification,  async(req, res) => {

  const id = req.params.id;
  try {
  const myResult =  await Student.findById(id); 
  if (myResult) { 
 
    jsonToPdf(myResult);
    res.status(200).json(myResult); 

  }
  else {
      res.status(400).json("User transcript not available")
  }
  
  
  } catch (err) {
  res.status(500).json(err);
  console.log(err)
  }
  })



  
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

  router.post("/")
  
router.post("/addTranscript", UserRouteVerification, async(req, res) => {
const params = {...req.body}
const resultDetails = {
  name: params.name,
  matricNo: params.matricNo,
  academiSessionAdmitted: params.academiSessionAdmitted,
  details: params.details
}

    try {
      myTrans = await Student.create(resultDetails);
      res.status(200).json(myTrans);



    } catch (err) {
      res.status(500).json("AN error occured while this operation was executed. Kindly try again soonest");
      console.log(err)
        
    }
})

router.put("/updateResult/:id", UserRouteVerification , async(req, res) => {
  const id =  req.params.id;
  const {details} = req.body;
console.log(id);
console.log(details);
  try {
    myTrans = await Student.findById(id);
    console.log(myTrans)
if (details) {
myTrans.details = details;
await myTrans.save();
res.status(200).json(myTrans)
}
    

  } catch (err) {
    console.error(err)
    res.status(500).json("The requested operation could not be completed at this time. Please try again later")
      
  }
})

router.delete("/studentResult/:id", UserRouteVerification, async(req, res) => {
  const id =  req.params.id
  try {
    myTrans = await Student.findById(id);
    try {
      await myTrans.delete();
      res.status(200).json("successfuly deleted")
    }
    catch(err) {
      res.status(500).json("Can't delete now, try again later")
    }


    res.status(200).status(myTrans);


  } catch (err) {
    res.status(500).json("Inappropirate access")
      
  }
})



module.exports = router;