// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getSelectedFolder, execShell } from './utils';
import { checkGithubCli, EnvironmentError, handleSelection } from './environment/environmentProcess';

const openInGithubDesktop = vscode.commands.registerCommand('githubdesktop-open.open-in-github-desktop', async () => {
  if (vscode.window.activeTextEditor) {
    let currentlyOpenTabFilePath = vscode.window.activeTextEditor.document.fileName;
    let currentDirArr = currentlyOpenTabFilePath.split('/');
    currentDirArr.pop();
    const currentDir = currentDirArr.join('/');
    execShell(`cd ${currentDir} && github`);
  }
});

const openInGithubDesktopFromFolder = vscode.commands.registerCommand('githubdesktop-open.open-in-github-desktop-from-folder', async () => {
  const selectedFolder = await getSelectedFolder();
  execShell(`cd ${selectedFolder} && github`);
});

const btn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
btn.command = 'githubdesktop-open.open-in-github-desktop';
btn.text = '$(github)';
btn.tooltip = 'Open in GitHub Desktop';
btn.show();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {
  checkGithubCli().catch((e) => {
    if (e instanceof EnvironmentError) {
      vscode.window.showErrorMessage(e.message, ...e.items)
        .then(handleSelection);
    }
  });

  context.subscriptions.push(openInGithubDesktop);
  context.subscriptions.push(openInGithubDesktopFromFolder);
  context.subscriptions.push(btn);
};


// this method is called when your extension is deactivated
export function deactivate() { }
