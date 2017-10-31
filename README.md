# Newsroom

A CLI tool for getting latest weekly.

## Usage

```shell
newsroom
```

You will enter a interactive command line interface.
Choose the weekly category and press enter.

## Help

```shell
newsroom --help
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
