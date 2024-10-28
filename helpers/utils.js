const geodata = require('country-region-data');
const { transliterate } = require('transliteration');


exports.getCountryName = (shortCode) => {
    const country = geodata.find(c => c.countryShortCode === shortCode);
    return country ? country.countryName : null;
}

exports.getRegionName = (countryShortCode, regionShortCode) => {
    const country = geodata.find(c => c.countryShortCode === countryShortCode);
    if (country) {
        const region = country.regions.find(r => r.shortCode === regionShortCode);
        return region ? region.name : null;
    }
    return null;
}

exports.getAutomateFormat = (obj) => {
    let result = Object.entries(obj)
    .map(([key, value]) => {
        value = value.toString()
            .replace('|',' ')
            .replace('=',' ');
        return `${key}=${value}`;
    })
    .join('|')
    .replace(/\s+/g, ' ').trim();

    return transliterate(result);
}