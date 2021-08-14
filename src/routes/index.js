const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

const validUrl = require('valid-url')
const shortid = require('shortid')

exports.defaultRoute = async (req, res) => {
    return res.redirect(process.env.DEFAULT_ROUTE)
}

exports.get = async (req, res) => {
        try {
            const url = await Url.findOne({
                urlCode: req.params.code
            })
            if (url) {
                return res.redirect(url.longUrl)
            } else {
                return res.status(404).json('No URL Found 3')
            }

        }
        catch (err) {
            console.error(err)
            res.status(500).json('Server Error')
        }
    }

exports.post = async (req, res) => {
        const {
            longUrl
        } = req.body 

        // if (!validUrl.isUri(process.env.BASE_URL)) {
        //     return res.status(401).json('Invalid base URL')
        // }
    
        const urlCode = shortid.generate()
    
        if (validUrl.isUri(longUrl)) {
            try {
                 let url = await Url.findOne({
                    longUrl
                })
    
                if (url) {
                    res.json(url)
                } else {
                    const shortUrl = process.env.BASE_URL + '/' + urlCode
    
                    url = new Url({
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date()
                    })
                    await url.save()
                    res.json(url)
                }
            }
            catch (err) {
                console.log(err)
                res.status(500).json('Server Error')
            }
        } else {
            res.status(401).json('Invalid longUrl')
        }
}

