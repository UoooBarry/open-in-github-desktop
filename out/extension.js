"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const utils_1 = require("./utils");
const environmentProcess_1 = require("./environment/environmentProcess");
const openInGithubDesktop = vscode.commands.registerCommand('githubdesktop-open.open-in-github-desktop', async () => {
    if (vscode.window.activeTextEditor) {
        let currentlyOpenTabFilePath = vscode.window.activeTextEditor.document.fileName;
        let currentDirArr = currentlyOpenTabFilePath.split('/');
        currentDirArr.pop();
        const currentDir = currentDirArr.join('/');
        (0, utils_1.execShell)(`cd ${currentDir} && github`);
    }
});
const openInGithubDesktopFromFolder = vscode.commands.registerCommand('githubdesktop-open.open-in-github-desktop-from-folder', async () => {
    const selectedFolder = await (0, utils_1.getSelectedFolder)();
    (0, utils_1.execShell)(`cd ${selectedFolder} && github`);
});
const btn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
btn.command = 'githubdesktop-open.open-in-github-desktop';
btn.text = '$(github)';
btn.tooltip = 'Open in GitHub Desktop';
btn.show();
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const activate = (context) => {
    (0, environmentProcess_1.checkGithubCli)().catch((e) => {
        if (e instanceof environmentProcess_1.EnvironmentError) {
            vscode.window.showErrorMessage(e.message, ...e.items)
                .then(environmentProcess_1.handleSelection);
        }
    });
    context.subscriptions.push(openInGithubDesktop);
    context.subscriptions.push(openInGithubDesktopFromFolder);
    context.subscriptions.push(btn);
};
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map