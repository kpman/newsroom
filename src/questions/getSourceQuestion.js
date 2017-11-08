module.exports = sources => ({
  type: 'list',
  name: 'source',
  message: "Please choose which source's news you want to receive.",
  choices: sources,
  filter: val => val,
});
