'use strict';

const fs = require('fs');
const path = require('path');
const branchName = require('branch-name');
const buildVersion = require('build-version');

const realpath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.realpath(filePath, (err, resolvedPath) => {
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
    const { cwd } = config;

    return Promise.all([
        config.branch || branchName.assumeMaster({ cwd }),
        config.version || buildVersion({ cwd })
    ])
        .then((data) => {
            return {
                branch  : data[0],
                version : data[1]
            };
        });
};

buildData.latest = (option) => {
    const config = Object.assign({}, option);
    const { branch, version, cwd } = config;

    if (branch && version) {
        return Promise.resolve({
            branch,
            version
        });
    }

    const linkPath = branch ?
        path.join('build', branch, 'latest') :
        'latest-build';

    return realpath(path.join(cwd || '', linkPath)).then((resolvedPath) => {
        return {
            branch  : branch || path.basename(path.join(resolvedPath, '..')),
            version : version || path.basename(resolvedPath)
        };
    });
};

module.exports = buildData;
