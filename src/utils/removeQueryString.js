module.exports = url => {
  const index = url.indexOf('?');
  if (index === -1) {
    return url;
  }

  return url.slice(0, index);
};
