function yellow(text) {
    return `\u001b[33m${text}\u001b[0m`;
}

function cyan(text) {
    return `\u001b[36m${text}\u001b[0m`;
}

function red(text) {
    return `\u001b[31m${text}\u001b[0m`;
}

module.exports = {
    yellow,
    cyan,
    red
};
