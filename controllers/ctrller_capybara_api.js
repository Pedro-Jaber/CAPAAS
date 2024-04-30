const Capybara = require("../model/model_capybara");

module.exports.getRandonCapybara = async (req, res) => {
  // /capybara
  res.status(200).send("RandomCapybara");

  // /capybara?json=true
  // /capybara?html=true
};

module.exports.getToPostCapybara = (req, res) => {
  res.status(200).render("postcapybara");
};

module.exports.postCapybara = async (req, res) => {
  const tags_string = req.body.tags; // Get image tags to store in database
  const image = req.file; // Get image from request

  const mimetype = image.mimetype; // Get image mimetype to store in database
  const size = image.size; // Get image size to store in database
  const blob = image.buffer; // Get Blob to store in database
  const tags = tags_string.trim().toLowerCase().split(" "); // Extract all the tags from the String

  console.log(image);

  console.log(mimetype);
  console.log(size);
  console.log(blob);
  console.log(tags);

  // const buffer64 = buffer.toString("base64"); // 33.33% bigger than the buffer
  // console.log(buffer.length);
  // console.log(buffer64.length);

  // The image in the HTML
  // res.send(
  //   ` <img src="data: ${mimetype};base64, ${buffer64}" style="max-width: 100vw; max-height: 100vh;"> `
  // );

  // Just the image
  // res.type(mimetype).send(buffer);

  // Save image and information on data database
  try {
    await Capybara.create({
      mimetype,
      size,
      blob,
      tags,
    }).then(() => {
      //* Status 201 Created
      // res.status(201).redirect("/home");
      res.status(201).redirect("/capybara/post-capybara");
    });
  } catch (error) {
    console.log(error);
    //* Status 500 Internal Server Error
    res.status(500).send("500 Internal Server Error");
  }

  //* Status 400 Bad Request //error in information
  //res.status(400).send("400 Bad Request");
};
