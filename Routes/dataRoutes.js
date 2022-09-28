const express = require('express')
 const fs = require('fs');
const utils = require('../utils/scrapingFunctions')
const router = express.Router()

// Get domains list
router.get('/domainlist', (req, res) => {
    fs.readFile('./utils/domainList.json', (err, data) => {
       if(!err) {
        res.status(200).send(data)
       } else {
       console.log(err)
       res.status(400).json({success: false, data:"Error while trying to fetch list"})
       }
    })
})
// Save eddited domains list
router.post('/domainlist', (req, res) => {
    let data =req.body.domainsList
   utils.writeDomainList(data)
})

//Get last scraping results
router.get('/last-searchresults', (req, res) => {
    fs.readFile('./utils/lastSearchData.json', (err, data) => {
       if(!err) {
        res.status(200).send(data)
       } else {
       console.log(err)
       res.status(400).json({success: false, data:"Error while trying to fetch list"})
       }
    })
})

// Scrape links
router.post('/scrapedomainlist', (req, res) => {
        utils.initiateCrwal(req.body.domainsList)
         res.status(200)
})

module.exports = router