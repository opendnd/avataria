function translateColor(type, color) {
  const available = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey'];

  if (available.indexOf(color) >= 0) {
    return color;
  }
  switch (type) {
    case 'S':
      switch (color) {
        case 'pale':
          return 'white';
        case 'dark':
          return 'black';
        default:
          return 'grey';
      }
    case 'H':
      switch (color) {
        case 'brown':
          return 'magenta';
        case 'blonde':
          return 'yellow';
        default:
          return 'black';
      }
    case 'E':
      switch (color) {
        case 'brown':
          return 'magenta';
        default:
          return 'black';
      }
    default:
      return 'cyan';
  }
}

module.exports = translateColor;
