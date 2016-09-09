# build-data [![Build status for build-data on Circle CI.](https://img.shields.io/circleci/project/sholladay/build-data/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/build-data "Build Data Builds")

> Get metadata for your build.

## Why?

 - Useful for managing [build processes](https://github.com/sholladay/build-dir).
 - Reliable and concurrent data collection.
 - Intelligent behavior in or out of a repository.

## Install

```sh
npm install build-data --save
```

## Usage

Get it into your program.

```js
const buildData = require('build-data');
```

Get the current [branch name](https://github.com/sholladay/branch-name) and a [version](https://github.com/sholladay/build-version) to be associated with your build.

```js
buildData().then((data) => {
    console.log('data:', data);
    // {
    //     branch  : 'master',
    //     version : '1.0.0'
    // }
});
```

Get the data that was used for the most recent build.

```js
buildData.latest().then((data) => {
    console.log('data:', data);
});
```

You can and should provide any data you know already.

```js
buildData({ version : '3.2.1' }).then((data) => {
    console.log('data:', data);
});
```

## API

### buildData(option)

#### option

Type: `object`

Settings and known build metadata.

##### cwd

Type: `string`<br>
Default: `process.cwd()`

The parent directory of the build root.

##### branch

Type: `string`

Use the given branch name, instead of asking git.

##### version

Type: `string`

Use the given version, instead of asking [build-version](https://github.com/sholladay/build-version).

### buildData.latest(option)

Same as `buildData()`, except the `branch` defaults to the most recently built branch and `version` defaults to the most recently built version of the branch.

### buildDir.link(option)

Takes `cwd`, `branch`, and `version` on the option object.

Within the `cwd`, writes a symlink at `latest-build` pointing to `build/<branch>/latest` and from there to `<version>`.

### buildDir.prepare(option)

Returns a promise for an object with these fields:

 - `path` is a newly created temporary directory for you to write the build to.
 - `finalize()` moves `path` to its final location and runs `buildDir.link()` on it.

## Related

 - [build-version](https://github.com/sholladay/build-version) - Get a version for your build.
 - [build-dir](https://github.com/sholladay/build-dir) - Get a place to put your build.
 - [build-path](https://github.com/sholladay/build-path) - Get a path for the given build.
 - [build-keys](https://github.com/sholladay/build-keys) - Get the paths of files from your build.
 - [build-files](https://github.com/sholladay/build-files) - Read the files from your build.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/build-data/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/build-data/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/build-data/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/build-data/blob/master/LICENSE "The license for build-data.") © [Seth Holladay](http://seth-holladay.com "Author of build-data.")

Go make something, dang it.
