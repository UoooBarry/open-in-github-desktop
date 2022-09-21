"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSelection = exports.checkGithubCli = exports.EnvironmentError = void 0;
const utils_1 = require("../utils");
const vscode_1 = require("vscode");
const INSTALL_GITHUB_CLI_MESSAGE = 'Install Github Desktop CLI';
class EnvironmentError extends Error {
    constructor(message, items = []) {
        super(message);
        this.items = items;
    }
}
exports.EnvironmentError = EnvironmentError;
const checkGithubCli = async () => {
    const cmd = 'github help';
    try {
        const out = await (0, utils_1.execShell)(cmd);
    }
    catch {
        throw new EnvironmentError('Github CLI is not installed', [INSTALL_GITHUB_CLI_MESSAGE]);
    }
};
exports.checkGithubCli = checkGithubCli;
const handleSelection = async (selection) => {
    switch (selection) {
        case INSTALL_GITHUB_CLI_MESSAGE:
            const url = vscode_1.Uri.parse('https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/overview/launching-github-desktop-from-the-command-line');
            vscode_1.env.openExternal(url);
            break;
        default:
            break;
    }
};
exports.handleSelection = handleSelection;
//# sourceMappingURL=environmentProcess.js.map