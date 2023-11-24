const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middleware");
const schemas = require("../../schema/schema");

const router = express.Router();


router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.contactSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schemas.contactSchema), ctrl.putContact);

module.exports = router;
