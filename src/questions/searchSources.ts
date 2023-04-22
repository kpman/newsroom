import fuzzy from 'fuzzy';

const searchSources = (sources) => (answers?: any, _input?: any) => {
  const input = _input || '';
  return new Promise((resolve) => {
    const fuzzyResult = fuzzy.filter(input, sources);
    resolve(fuzzyResult.map((el) => el.original));
  });
};

export default searchSources;
