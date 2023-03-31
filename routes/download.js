const express = require("express");
const main = require("../utils/scrape");
const router = express.Router();

router.post("/download", async (req, res) => {
    try {
        let { link } = req.body;
        await main(link);
        return res.status(200).json({
            status:"ok",
            message:"Downloading"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send(error)
    }

})

module.exports = router;