
<h1 align="center">
  <br>
	<img width=480 src="https://rawgit.com/kpman/newsroom/master/media/logo.png" alt="newsroom">
	<br>
  <br>
</h1>

> A CLI tool for getting different sources of news.

[![npm version](https://img.shields.io/npm/v/newsroom-cli.svg?style=flat)](https://www.npmjs.com/package/newsroom-cli) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

## Install

```shell
npm install -g newsroom-cli
```

## Usage

```shell
$ newsroom
```

You will enter a interactive command line interface.
Choose the source you want to receive and press enter.

```shell
$ newsroom [source] [number]
```

You can see the latest news or articles from source which supported by this CLI.

<img width=859 src="https://rawgit.com/kpman/newsroom/master/media/screenshot.png" alt="screenshot">

## Help

```shell
$ newsroom --help
```

## Contributing

### Fork repo

1. Fork this repo.
2. Pull your forked repo on your local machine.

### Create a branch

1. `git checkout master` in your local repo.
2. `git pull origin master` to ensure you have the latest main code
3. `git checkout -b the-name-of-my-branch` to create a branch (remember to replace `the-name-of-my-branch` with a suitable name)

### Make the change

- Modify the source code in `src` folder.
- Run `npm run lint` from the project root. Make sure it pass the check.

### Push it

1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fixed header logo on Android`) to stage and commit your changes.
2. `git push my-fork-name the-name-of-my-branch`
3. Make a pull-request.

## Maintainers

- [Daniel Tseng](https://github.com/kpman)

## License

MIT
