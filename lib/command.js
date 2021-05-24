const { spawnSync, spawn } = require('child_process');

const { printSessionsPath } = require('./print');
const { red, yellow, cyan } = require('./color');
const { parseOptions } = require('./util');

function getSessionsPath() {
    const { stdout, stderr } = spawnSync('openvpn3', ['sessions-list'], {
        encoding: 'utf8',
    });

    if (stderr) {
        process.stderr.write(stderr);
        process.exit();
    }

    return stdout.split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('Path: '))
        .map(line => line.split(': ').pop());
}

function sessionStatus() {
    let sessionsPath = getSessionsPath();

    if (sessionsPath.length === 0) {
        process.stdout.write(yellow('No active sessions found\n'));
        process.exit();
    }

    if (sessionsPath.length > 1) {
        printSessionsPath(sessionsPath);

        process.stdout.write('Run the following command to get the specific session status\n');
        process.stdout.write(cyan('openvpn3 session-stats --path <path>\n'));
        process.exit();
    }

    const [path] = sessionsPath;
    const { stdout, stderr } = spawnSync('openvpn3', ['session-stats', '--path', path], {
        encoding: 'utf8',
    });

    if (stderr) {
        process.stderr.write(stderr);
        process.exit();
    }

    process.stdout.write(stdout);
}

function stopSession() {
    const sessionsPath = getSessionsPath();

    if (sessionsPath.length === 0) {
        process.stdout.write(yellow('No active session found\n'));
        process.exit();
    }

    if (sessionsPath.length > 1) {
        printSessionsPath(sessionsPath);

        process.stdout.write('Run the following command to stop a specific session\n');
        process.stdout.write(cyan('openvpn3 session-manage --disconnect --path <path>\n'));
        process.exit();
    }

    const [path] = sessionsPath;
    const { stdout, stderr } = spawnSync('openvpn3', ['session-manage', '--disconnect', '--path', path], {
        encoding: 'utf8',
    });

    if (stderr) {
        process.stderr.write(stderr);
        process.exit();
    }

    process.stdout.write(stdout);
}

function startSessionAuto(username, password, configPath) {
    const cmd = spawn('openvpn3', ['session-start', '--config', configPath], {
        encoding: 'utf8',
    });

    cmd.stdout.on('data', (data) => {
        process.stdout.write(data);

        if (data.toString().trim().toLowerCase().startsWith('auth user name')) {
            process.stdout.write(`${username}\n`);
            cmd.stdin.write(`${username}\n`);
        }

        if (data.toString().trim().toLowerCase().startsWith('auth password')) {
            process.stdout.write('******');
            cmd.stdin.write(`${password}\n`);
        }

        if (data.toString().trim().toLowerCase().startsWith('enter a passcode')) {
            process.stdout.write('1\n');
            cmd.stdin.write('1\n');
        }
    });

    cmd.stderr.on('data', (data) => {
        process.stderr.write(data);
    });
}

function startSessionManual(configPath) {
    const cmd = spawn('openvpn3', ['session-start', '--config', configPath]);

    cmd.stdout.pipe(process.stdout);
    process.stdin.pipe(cmd.stdin);
}

function start(options = []) {
    const { VPN_CONFIG_PATH } = process.env;
    if (!VPN_CONFIG_PATH) {
        process.stderr.write(red('Environment variable `VPN_CONFIG_PATH` not defined. Refer to the setup guide.\n'));
        process.exit();
    }

    if (options.length === 0) {
        startSessionManual(VPN_CONFIG_PATH);
    } else {
        const { username, password } = parseOptions(options);
        if (!username || !password) {
            process.stderr.write(red('username or password is not defined. Refer to the setup guide.\n'));
            process.exit();
        }

        startSessionAuto(username, password, VPN_CONFIG_PATH);
    }
}

module.exports = {
    start,
    stopSession,
    sessionStatus,
};
