import * as cp from "child_process";
import * as vscode from 'vscode';

export const execShell = (cmd: string) => {
	new Promise<string>((resolve, reject) => {
		cp.exec(cmd, (err, out) => {
			if (err) {
				return reject(err);
			}
			return resolve(out);
		});
	});
};

export const getSelectedFolder = async (): Promise<string> =>  {
  await vscode.commands.executeCommand('copyFilePath');
	const folder = await vscode.env.clipboard.readText();
	const selectedFolder = await vscode.Uri.file(folder).fsPath;

	return selectedFolder;
};
