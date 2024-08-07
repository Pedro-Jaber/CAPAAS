const { Router } = require("express");
const multer = require("multer"); // Allow to handle files received from forms
const ctrllerCapybara = require("../controllers/ctrller_capybara_api");

const router = Router();

const storage = multer.memoryStorage(); // Set to save image in RAM memory
const limits = { fileSize: 1024 * 1024 * 4 }; // file size in bytes // 4MB
const upload = multer({
  dest: "./public/images/temp",
  storage: storage,
  limits: limits,
});

router.route("").get(ctrllerCapybara.getRandonCapybara);
router
  .route("/post-capybara")
  .get(ctrllerCapybara.getToPostCapybara)
  .post(upload.single("image"), ctrllerCapybara.postCapybara);
router.route("/gallery").get(ctrllerCapybara.getToGallery);
router.route("/:id").get(ctrllerCapybara.getImageFromId);

module.exports = router;
