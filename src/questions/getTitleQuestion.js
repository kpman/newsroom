module.exports = (titles, pageSize = 5) => ({
  type: 'checkbox',
  name: 'title',
  message: 'Please choose which title you want to open',
  choices: titles,
  filter: (val) => val,
  pageSize,
});
