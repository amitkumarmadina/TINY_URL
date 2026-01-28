const{} = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "URL is required"});

    const shortId = nanoid(10);
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : []
    });
    return res.json({id : shortId})
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId; 
    const result = await URL.findOne({shortId});

    return res.json({
    visitHistory : result.visitHistory.length,
    analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}