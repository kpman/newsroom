const handleEscKeypress = () => {
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    if (chunk.toString() === '\u001b') {
      // ESC
      process.exit(0);
    }
  });
};

export default handleEscKeypress;
