var fs      = require('fs'),
    path    = require('path'),
    PNG     = require('pngjs').PNG,
    scolors = require('colors/safe'),
    rootDir = path.join(__dirname, '..'),
    dataDir = path.join(rootDir, 'data'),
    logo    = fs.readFileSync(path.join(dataDir, 'logo.txt'), { encoding: 'utf-8' });

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
};

var male      = require(dataDir + '/male.json'),
    female    = require(dataDir + '/female.json'),
    colors    = require(dataDir + '/colors.json'),
    templates = [male, female],
    size      = 128,
    block     = '██',
    ascii     = '',
    template;

var png = new PNG({
  width: size,
  height: size,
  filterType: -1
});

var hair = Object.keys(colors['hairs']).sample(),
    skin = Object.keys(colors['skins']).sample(),
    eye  = Object.keys(colors['eyes']).sample(),
    tpl  = templates.sample(),
    cmap = {
      '0': 'cyan',
      'W': 'white',
      'B': 'black',
      'M': 'red',
      'H': hair,
      'S': skin,
      'E': eye
    }

// set the colors
colors['H'] = colors['hairs'][hair],
colors['S'] = colors['skins'][skin],
colors['E'] = colors['eyes'][eye];

function translateColor (type, color) {
  var available = ['black', 'red', 'green', 
                   'yellow', 'blue', 'magenta', 
                   'cyan', 'white', 'gray', 'grey'];

  if (available.indexOf(color) >= 0) {
    return color;
  } else {
    switch(type) {
      case 'S':
        switch(color) {
          case 'pale':
            return 'white';
          case 'dark':
            return 'black';
          default:
            return 'grey';
        }
      case 'H':
        switch(color) {
          case 'brown':
            return 'magenta';
          case 'blonde':
            return 'yellow';
          default:
            return 'black';
        }
      case 'E':
        switch(color) {
          case 'brown':
            return 'magenta';
          default:
            return 'black';
        }
      default:
        return 'cyan';
    }
  }
}

// build png
for (var y = 0; y < png.height; y++) {
  for (var x = 0; x < png.width; x++) {
    var idx   = (png.width * y + x) << 2,
        px    = Math.floor(x / (size / 10)),
        py    = Math.floor(y / (size / 10)),
        row   = tpl[py],
        cell  = row[px],
        color = colors[cell];

    png.data[idx  ] = color[0];
    png.data[idx+1] = color[1];
    png.data[idx+2] = color[2];
    png.data[idx+3] = color[3];
  }
}

// build ascii
for (var y = 0; y < 10; y++) {
  for (var x = 0; x < 10; x++) {
    var row   = tpl[y],
        cell  = row[x],
        color = translateColor(cell, cmap[cell]);

    if (typeof(scolors[color]) === 'function') {
      ascii += scolors[color](block);
    } else {
      ascii += scolors.cyan(block);
    }
  }

  ascii += '\n';
}

png.pack();
var chunks = [];

png.on('data', function(chunk) {
  chunks.push(chunk);
});

png.on('end', function() {
  var result = Buffer.concat(chunks),
      base64 = result.toString('base64');

  process.stdout.write(
    scolors.white(logo) +
    scolors.yellow.bold.underline('\n\nPreview (note colors may be different in png):') +
    '\n\n' + ascii +
    scolors.white('\n - ' + scolors.bold.underline('Hair') + ' Color: ') + scolors[translateColor('H', hair)].bgCyan.bold(hair) +
    scolors.white('\n - ' + scolors.bold.underline('Eyes') + ' Color: ') + scolors[translateColor('H', eye)].bgCyan.bold(eye) +
    scolors.white('\n - ' + scolors.bold.underline('Skin') + ' Color: ') + scolors[translateColor('S', skin)].bgCyan.bold(skin) +
    scolors.white('\n\n<img src="data:image/png;base64,') + scolors.white(base64) + scolors.white('">') +
    scolors.white('\n\nurl(\'data:image/png;base64,') + scolors.white(base64) + scolors.white('\')') +
    '\n\n'
  );
});

// save to file
// var filename = new Date().getTime() + '.png';
// png.pack().pipe(fs.createWriteStream(filename));
