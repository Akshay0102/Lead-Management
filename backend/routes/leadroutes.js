const express = require("express")
const { createLead, getLead, getLeads, deleteLead } = require("../controller/leadController")
const router = express.Router()

router.post('/',createLead);
router.get('/',getLeads);
router.delete('/:id',deleteLead);

module.exports = router;
