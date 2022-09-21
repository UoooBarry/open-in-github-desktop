"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectedFolder = exports.execShell = void 0;
const cp = require("child_process");
const vscode = require("vscode");
const execShell = (cmd) => {
    return new Promise((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });
};
exports.execShell = execShell;
const getSelectedFolder = async () => {
    await vscode.commands.executeCommand('copyFilePath');
    const folder = await vscode.env.clipboard.readText();
    const selectedFolder = await vscode.Uri.file(folder).fsPath;
    return selectedFolder;
};
exports.getSelectedFolder = getSelectedFolder;
//# sourceMappingURL=utils.js.map