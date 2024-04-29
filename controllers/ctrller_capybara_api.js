module.exports.getRandonCapybara = async (req, res) => {
  // /capybara
  res.status(200).send("RandomCapybara");

  // /capybara?json=true
  // /capybara?html=true
};

module.exports.postCapybara = async (req, res) => {
  // Get image from request
  // Get image type to store in database
  // Get image size to store in database
  // Get image tags to store in database
  // Save in information on data database and get info _id
  // Change image name to _i
  // Save image on public/capybara_images/

  //* Status OK
  res.status(200).redirect("/home");
};
