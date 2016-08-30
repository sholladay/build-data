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

Get the current [branch name](https://github.com/sholladay/branch-name) and [build version](https://github.com/sholladay/build-version) to be associated with your build.

```js
buildData().then((data) => {
    console.log('data:', data);
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
