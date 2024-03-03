const Brand = require("../model/brand");

const addBrand = async (req, res) => {
  try {
    const { brandName, brandCategory, brandDescription } = req.body;

    const brand = new Brand({
      brandName,
      brandCategory,
      brandDescription,
    });
    const savedData = await brand.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = addBrand;
