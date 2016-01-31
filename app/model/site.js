function SiteSchema(mongoose) {
    'use strict';
    var siteSchema = new mongoose.Schema({
        name: {type: String},
        url: {type: String}
    });
    var site = mongoose.model('site', siteSchema);

    return site;
}

module.exports = SiteSchema;
