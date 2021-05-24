const { yellow } = require('./color');

function printSessionsPath(paths) {
    process.stdout.write(yellow('You have more than one session running:\n\n'));
    process.stdout.write(paths.map(path => `- ${path}`).join('\n'));
    process.stdout.write('\n\n');
}

function printUsage() {
    process.stdout.write('Usage: vpn [options]\n\n');
    process.stdout.write(yellow('options:\n'));
    process.stdout.write('start   -   start a new session\n');
    process.stdout.write('stop    -   stop the current session\n');
    process.stdout.write('status  -   print the session status\n');
}

module.exports = {
    printUsage,
    printSessionsPath,
};