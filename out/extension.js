"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const cp = require("child_process");
const openInGithubDesktop = vscode.commands.registerCommand('githubdesktop-open.open-in-github-desktop', async () => {
    if (vscode.window.activeTextEditor) {
        let currentlyOpenTabFilePath = vscode.window.activeTextEditor.document.fileName;
        let currentDirArr = currentlyOpenTabFilePath.split('/');
        currentDirArr.pop();
        const currentDir = currentDirArr.join('/');
        execShell(`cd ${currentDir} && github`);
    }
});
const btn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
btn.command = 'githubdesktop-open.open-in-github-desktop';
btn.text = '$(github)';
btn.tooltip = 'Open in GitHub Desktop';
btn.show();
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const activate = (context) => {
    context.subscriptions.push(openInGithubDesktop);
    context.subscriptions.push(btn);
};
exports.activate = activate;
const execShell = (cmd) => {
    new Promise((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });
};
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map