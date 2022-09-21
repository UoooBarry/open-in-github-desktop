import { execShell } from "../utils";
import { env, Uri } from 'vscode';

const INSTALL_GITHUB_CLI_MESSAGE = 'Install Github Desktop CLI';

export class EnvironmentError extends Error {
  items: Array<string>;

  constructor(message: string, items: Array<string> = []) {
    super(message);

    this.items = items;
  }
}

export const checkGithubCli = async () => {
  const cmd = 'github help';
  try {
    await execShell(cmd);
  } catch {
    throw new EnvironmentError('Github CLI is not installed', [INSTALL_GITHUB_CLI_MESSAGE]);
  }
};

export const handleSelection = async (selection: string | undefined) => {
  switch (selection) {
    case INSTALL_GITHUB_CLI_MESSAGE:
      const url = Uri.parse('https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/overview/launching-github-desktop-from-the-command-line');
      env.openExternal(url);
      break;
    default:
      break;
  }
};