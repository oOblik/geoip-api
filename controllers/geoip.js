const { matchedData, validationResult } = require('express-validator');
const geoip = require('fast-geoip');
const { getRegionName, getCountryName, getAutomateFormat } = require('../helpers/utils');

exports.lookup = async (req, res) => {
    const result = validationResult(req);
    const query = matchedData(req);

    // Validate query params
    if(!result.isEmpty()) {
        return res.status(412).json({ error: result.array() });
    }

    let geo = {};
    
    try {
        // Get GeoIP info
        geo = await geoip.lookup(query.ip);

        // Expand Country and Region codes
        if(geo.country && geo.region) {
            geo.region = getRegionName(geo.country, geo.region) || geo.region;
        }
        if(geo.country) {
            geo.country = getCountryName(geo.country) || geo.country;
        }

    } catch (error) {
        return res.status(500).json({error: error.message});
    }

    // Return result based on format param
    switch(query.format) {
        case 'automate':
            return res.status(200).send(getAutomateFormat(geo));
        case 'json':
        default:
            return res.status(200).json(geo);
    }
};