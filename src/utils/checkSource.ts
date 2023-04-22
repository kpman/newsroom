import invariant from 'invariant';

export default (source, sourcesInfo) => {
  const result = sourcesInfo.some((sourceInfo) => sourceInfo.title === source);
  invariant(result, `The source \`${source}\` is not in the sources(.opml)!`);
};
