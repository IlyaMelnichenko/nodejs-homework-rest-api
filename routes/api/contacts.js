const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middleware/validation");
const schemas = require("../../schema/schema");

const router = express.Router();


router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.putContact);

module.exports = router;
