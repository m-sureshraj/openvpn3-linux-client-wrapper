#! /usr/bin/env node

const { printUsage } = require('./lib/print');
const { start, stopSession, sessionStatus } = require('./lib/command');

function main() {
    // expected input = ['username=xx', 'password=xx', 'command'] or ['command']
    const argv = process.argv.slice(2);
    const command = argv.pop();

    switch(command) {
        case 'start':
            start(argv);
            break;

        case 'stop':
            stopSession();
            break;

        case 'status':
            sessionStatus();
            break;

        default:
            printUsage();
    }
}

main();
