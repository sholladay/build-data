'use strict';

const fs = require('fs');
const path = require('path');
const branchName = require('branch-name');
const buildVersion = require('build-version');
const buildPath = require('build-path');

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

const buildData = async (option) => {
    const config = Object.assign({}, option);
    const { cwd } = config;

    const [branch, version] = await Promise.all([
        config.branch || branchName.assumeMaster({ cwd }),
        config.version || buildVersion({ cwd })
    ]);

    return {
        branch,
        version
    };
};

buildData.latest = async (option) => {
    const config = Object.assign({}, option);
    const { branch, version, cwd } = config;

    if (branch && version) {
        return {
            branch,
            version
        };
    }

    const linkPath = branch ?
        buildPath({
            branch,
            version : 'latest'
        }) :
        'latest-build';

    const resolvedPath = await realpath(path.join(cwd || '', linkPath));
    return {
        branch  : branch || path.basename(path.join(resolvedPath, '..')),
        version : version || path.basename(resolvedPath)
    };
};

module.exports = buildData;
