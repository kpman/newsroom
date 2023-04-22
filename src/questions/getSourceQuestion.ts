import searchSources from './searchSources';

export default (sources) => ({
  type: 'autocomplete',
  name: 'source',
  message: 'Please choose a source:',
  source: searchSources(sources),
});
