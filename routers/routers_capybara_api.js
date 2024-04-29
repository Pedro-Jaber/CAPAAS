const { Router } = require("express");
const ctrllerCapybara = require("../controllers/ctrller_capybara_api");

const router = Router();

router.route("").get(ctrllerCapybara.getRandonCapybara);

module.exports = router;
