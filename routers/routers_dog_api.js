const { Router } = require("express");
const ctrllerDog = require("../controllers/ctrller_dog_api");

const router = Router();

router.route("").get(ctrllerDog.getRandonDog);

module.exports = router;
