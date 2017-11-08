module.exports = (titles, pageSize = 5) => ({
  type: 'list',
  name: 'title',
  message: 'Please choose which title you want to open',
  choices: titles,
  filter: val => val,
  pageSize,
});
