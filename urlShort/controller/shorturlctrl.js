import Url from "../model/url.model.js";
import shortid from "shortid";


const handleShortUrl = async (req, res) => {
    const shortID = shortid(8)
    const body = req.body
/*     console.log(body) */
    if (!body.url) {
        res.status(400).json({ err: "Url not found!" })
    }
    try {
        await Url.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitedHistory: [],
            createdBy:req.user._id
        })
      /*   console.log(shortID) */
        return res.render("home", { id: shortID, status: "Successfully Created" })
    } catch (err) {
        console.error("Error creating short URL:\n", err);
        res.status(500).json({ err: "internal err" })
    }
}



const analytics = async (req, res) => {
    const shortId = req.params.shortId
/*     console.log(shortId) */
    try {
        const entry = await Url.findOne({ shortId })
        if (!entry) {
            res.status(400).json({ err: "id not found!" })
        }
      /*   console.log(entry) */
        res.json({
            totalClicks: entry.visitedHistory.length,
            analytics: entry.visitedHistory
        }
        )
    } catch (err) {
        console.error("Error getting analytics\n", err);
        res.status(500).json({ err: "internal err" })
    }
}


export { handleShortUrl, analytics }