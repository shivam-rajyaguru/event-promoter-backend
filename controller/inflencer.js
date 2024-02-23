const Influence = require("../model/influence");

const getAllInfluencer = async (req, res) => {
  try {
    const { name } = req.query;
    // console.log(name);
    const queryObject = {};
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    const influencer = await Influence.find(queryObject);

    res.status(200).json({ influencer });
    return influencer;
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addInfluence = async (req, res) => {
  try {
    const { name, username, email, country, totalsubmission, lastsubmission } =
      req.body;

    const influence = new Influence({
      name,
      username,
      email,
      country,
      totalsubmission,
      lastsubmission,
    });
    const savedData = await influence.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllInfluencer, addInfluence };
