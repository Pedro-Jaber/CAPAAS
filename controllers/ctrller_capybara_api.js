const Capybara = require("../model/model_capybara");

module.exports.getRandonCapybara = async (req, res) => {
  // /capybara
  try {
    const data = await Capybara.aggregate([{ $sample: { size: 1 } }]).exec();
    const image = data[0];
    image.blob = Buffer.from(image.blob.toString("base64"), "base64");

    // Image Info
    console.log("\n= Image Info ==========================================");
    console.log(image);
    console.log("=======================================================\n");

    // HTML Response --> /capybara?json=true
    if (req.query.html == "true") {
      res.send(
        ` <img src="data: ${image.mimetype};base64,
          ${image.blob.toString(
            "base64"
          )}" style="max-width: 90vw; max-height: 90vh;"> `
      );
    }
    // Json response --> /capybara?html=true
    else if (req.query.json == "true") {
      let imageJson = {
        tags: image.tags,
        mimetype: image.mimetype,
        size: image.size,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        _id: image._id.toString(),
      };
      res.status(200).json(imageJson);
    }
    // Pure Image response --> /capybara
    else {
      res.type(image.mimetype).send(image.blob);
    }
  } catch (error) {
    console.error("Error retrieving random image:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getImageFromId = async (req, res) => {
  const _id = req.params.id;

  try {
    const image = await Capybara.findById(_id).exec();

    // HTML Response
    if (req.query.html == "true") {
      // Image Not Found
      if (image == null) {
        res.status(404).send("404 Image Not Found");
      } else {
        res.send(
          ` <img src="data: ${image.mimetype};base64,
          ${image.blob.toString(
            "base64"
          )}" style="max-width: 90vw; max-height: 90vh;"> `
        );
      }
    }
    // Json response
    else if (req.query.json == "true") {
      // Image Not Found
      if (image == null) {
        res.status(404).json({ statusCode: "404", message: "Image Not Found" });
      } else {
        let imageJson = {
          tags: image.tags,
          mimetype: image.mimetype,
          size: image.size,
          createdAt: image.createdAt,
          updatedAt: image.updatedAt,
          _id: image._id.toString(),
        };
        res.status(200).json(imageJson);
      }
    }
    // Pure Image response
    else {
      // Image Not Found
      if (image == null) {
        res.status(404).send("404 Image Not Found");
      } else {
        res.type(image.mimetype).send(image.blob);
      }
    }
  } catch (error) {
    console.error("Error retrieving image by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getToPostCapybara = async (req, res) => {
  const data = await Capybara.aggregate([{ $sort: { createdAt: -1 } }])
    .limit(24)
    .exec();

  // console.log(data);

  res.status(200).render("postcapybara", { data });
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
      res.status(201).redirect("/capybara/post-capybara");
    });
  } catch (error) {
    console.log(error);
    //* Status 500 Internal Server Error
    res.status(500).send("500 Internal Server Error");
  }

  //TODO Status 400 Bad Request //error in information
  //res.status(400).send("400 Bad Request");
};
