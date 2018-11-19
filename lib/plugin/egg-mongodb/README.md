# egg-mogodb

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-mogodb.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-mogodb
[travis-image]: https://img.shields.io/travis/eggjs/egg-mogodb.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-mogodb
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-mogodb.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-mogodb?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-mogodb.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-mogodb
[snyk-image]: https://snyk.io/test/npm/egg-mogodb/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-mogodb
[download-image]: https://img.shields.io/npm/dm/egg-mogodb.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-mogodb

<!--
Description here.
-->

## Install

```bash
$ npm i egg-mogodb --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.mogodb = {
  enable: true,
  package: 'egg-mogodb',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.mogodb = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
