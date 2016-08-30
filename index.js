'use strict';

const fs = require('fs');
const path = require('path');
const branchName = require('branch-name');
const buildVersion = require('build-version');

const realpath = (fp) => {
    return new Promise((resolve, reject) => {
        fs.realpath(fp, (err, resolvedPath) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resolvedPath);
        });
    });
};

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

buildData.latest = (option) => {
    const config = Object.assign(
        {
            cwd : ''
        },
        option
    );

    if (config.branch && config.version) {
        return Promise.resolve({
            branch  : config.branch,
            version : config.version
        });
    }

    const linkPath = config.branch ? path.join('build', config.branch, 'latest') : 'latest-build';

    return realpath(path.join(config.cwd, linkPath)).then((resolvedPath) => {
        return {
            branch  : config.branch || path.basename(path.join(resolvedPath, '..')),
            version : config.version || path.basename(resolvedPath)
        };
    });
};

module.exports = buildData;
