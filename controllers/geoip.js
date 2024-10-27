const { matchedData, validationResult } = require('express-validator');
const geoip = require('fast-geoip');

const getAutomateFormat = (json) => {
    return "country="+json.country+
        "|region="+json.region+
        "|eu="+json.eu+
        "|city="+json.city+
        "|metro="+json.metro+
        "|area="+json.area
    ;
}

exports.lookup = async (req, res) => {
    const result = validationResult(req);
    const query = matchedData(req);

    if(result.isEmpty() && query.ip) {
        try {
            const geo = await geoip.lookup(query.ip);

            switch(query.format) {
                case 'automate':
                    return res.status(200).send(getAutomateFormat(geo));
                case 'json':
                default:
                    return res.status(200).json(geo);
            }
        
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } else {
        res.status(412).json({ error: result.array() });
    }
};