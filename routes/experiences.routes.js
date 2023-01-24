// Experiences Routes
const router = require("express").Router();
const Experience = require("../models/Experiences.model");
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const User = require("../models/User.model")

/* Create Entry Route (post) */
router.post("/create-entry", isAuthenticated, async (req, res, next) => { 
  const { title, description, picture } = req.body;
  console.log('SEE HERE NEW ENTRY ---->', req.body)
  try {
    const newExperience = await Experience.create({
      title: title.trim(),
      description: description.trim(),
      picture: picture.trim(),
      owner: req.payload._id
    });
    const updatedUser = await User.findOneAndUpdate({_id: req.payload._id}, {$push: {experiences: [newExperience._id]}}, {new: true})
    res
      .status(201)
      .json({ message: "New experience created"}); 
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

/* get route for specifric exp*/

router.get("/update-entry/:experienceId", async (req, res) => {
  const { experienceId } = req.params;
  console.log("made it here: ", experienceId)
  const foundExperience = await Experience.findById(experienceId)
  res.status(200).json(foundExperience)
})


/* Update Entry Route (put) */
router.put("/update-entry/:experienceId", async (req, res, next) => {
  const { experienceId } = req.params;

  //  if (title !== "") {
  //   newData.title = title.trim();
  // }

  // if (description !== "") {
  //   newData.description = description.trim();
  // }

  // if (picture !== "") {
  //   newData.picture = picture.trim();
  // }

  try {
    const experience = await Experience.findByIdAndUpdate(
      experienceId,
      req.body
    );
    res.status(200).json({ message: "Experience updated", id: experience.id });
  } catch (error) {
    res.status(500).json(error);
  }
});


/* Delete Entry Route (delete) */
router.delete("/delete-entry/:experienceId", async (req, res, next) => {
  const { experienceId } = req.params;
  console.log(experienceId)
  await Experience.findByIdAndDelete(experienceId);
  res.status(200).json({ message: "Experience deleted" });
});

module.exports = router;
