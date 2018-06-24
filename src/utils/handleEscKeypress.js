const handleEscKeypress = () => {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => {
    if (chunk === '\u001b') {
      // ESC
      process.exit(0);
    }
  });
};

module.exports = handleEscKeypress;
