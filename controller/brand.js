const Brand = require("../model/brand");

const addBrand = async (req, res) => {
  try {
    const {
      brandName,
      brandCategory,
      brandDescription,
      brandWebsite,
      brandContact,
      brandEmail,
      brandAddress,
      brandCity,
      brandState,
      brandZip,
      brandSocialFacebook,
      brnadSocialInsta,
      brandSocialTweet,
    } = req.body;

    const brand = new Brand({
      brandName,
      brandCategory,
      brandDescription,
      brandWebsite,
      brandContact,
      brandEmail,
      brandAddress,
      brandCity,
      brandState,
      brandZip,
      brandSocialFacebook,
      brnadSocialInsta,
      brandSocialTweet,
    });

    const savedData = await brand.save();
    res.status(200).json(savedData);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

// const addBrandSecond = async (req, res) => {
//   try {
//     const {
//       brandWebsite,
//       brandContact,
//       brandEmail,
//       brandAddress,
//       brandCity,
//       brandState,
//       brandZip,
//       brandSocialFacebook,
//       brnadSocialInsta,
//       brandSocialTweet,
//     } = req.body;

//     const brand = new Brand({
//       brandWebsite,
//       brandContact,
//       brandEmail,
//       brandAddress,
//       brandCity,
//       brandState,
//       brandZip,
//       brandSocialFacebook,
//       brnadSocialInsta,
//       brandSocialTweet,
//     });
//     const savedData = await brand.save();
//     res.status(200).json(savedData);
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = addBrand;
