'use strict';

const branchName = require('branch-name');
const buildVersion = require('build-version');

const buildData = (option) => {
    const config = Object.assign({}, option);
    return Promise.all([
        config.branch || branchName.assumeMaster(),
        config.version || buildVersion()
    ])
        .then((data) => {
            return {
                branch  : data[0],
                version : data[1]
            };
        });
};

module.exports = buildData;
