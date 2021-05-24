function parseOptions(options = []) {
    let username = options[0] || '';
    username = username.substring(username.indexOf('=') + 1);

    let password = options[1] || '';
    password = password.substring(password.indexOf('=') + 1);

    return { username, password };
}

module.exports = {
    parseOptions,
};
