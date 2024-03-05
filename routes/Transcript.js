const bodyParser = require("body-parser");
const Student = require("../models/Result/Student");
const router = require("express").Router();
const verifyToken = require("../middleware/auth")


const  jsonToPdf = require("../pdfGen")

router.get("/my-transcript/:id", verifyToken,  async(req, res) => {

const id = req.params.id;
console.log(id)

try {
const myResult =  await Student.findById(id); 
console.log(myResult)
if (res) {
  res.status(200).json(myResult);  
}
else {
    res.status(400).json("User transcript not available")
}


} catch (err) {
res.status(500).json(err)
}
})

router.get("/my-transcript/:id/generate", verifyToken,  async(req, res) => {

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

router.get("/allStudents",   async(req, res) => {

const key = req.query.key;
  try {
  const myResult = await Student.find({
    "$or": [
        {name: {$regex: key, $options: '-i'}},
        {matricNo: {$regex: key,  $options: '-i'}},
    ]
}, null); 
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
  
router.post("/addTranscript", verifyToken , async(req, res) => {

    try {
      myTrans = await Student.create(req.body);
      res.status(200).json(myTrans);



    } catch (err) {
      res.status(500).json("AN error occured while this operation was executed. Kindly try again soonest");
      console.log(err)
        
    }
})

router.put("/updateResult/:id", verifyToken , async(req, res) => {
  const id =  req.params.id;
  const {details} = req.body;
console.log(id);
console.log(details)
  try {
    myTrans = await Student.findById(id);
    console.log(myTrans)
if (details) {
myTrans.details = details;
await myTrans.save();
res.status(200).json(myTrans)
}
    

  } catch (err) {
    res.status(500).json(err)
      
  }
})

router.delete("/studentResult/:id", verifyToken, async(req, res) => {
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