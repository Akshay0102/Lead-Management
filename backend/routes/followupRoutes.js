const express = require("express")
const router = express.Router()
const {addFollowUp,getFollowUp,deleteFollowUp} = require("../controller/followUpController")

router.post('/',addFollowUp);
router.get('/:leadId',getFollowUp);
router.delete('/:followUpId',deleteFollowUp);

module.exports = router;