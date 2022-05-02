import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";

export class ConnectionPanel {
  public static currentPanel: ConnectionPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.onDidDispose(this.dispose, null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri, 1);
    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: vscode.Uri) {
    if (ConnectionPanel.currentPanel) {
      ConnectionPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel("uniDevice1", "UNI1.Connect", vscode.ViewColumn.One, {
        enableScripts: true,
      });

      ConnectionPanel.currentPanel = new ConnectionPanel(panel, extensionUri);
    }
  }

  public dispose() {
    ConnectionPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri, num: number) {
    
    const toolkitUri = getUri(webview, extensionUri, [
        "node_modules",
        "@vscode",
        "webview-ui-toolkit",
        "dist",
        "toolkit.js",
      ]);

      const mainUri = getUri(webview, extensionUri, ["webview-ui", "main.js"]);

    return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <script type="module" src="${toolkitUri}"></script>
        <script type="module" src="${mainUri}"></script>
        <title>Hello World!</title>
      </head>
      <body>
        <p>Communication Type</p>
        <input type="radio" name="chk_info" value="USB">USB
        <input type="radio" name="chk_info" value="UDP" checked="checked">UDP
        <input type="radio" name="chk_info" value="UDP Full Address">UDP Full Address<br>
        <br>Network<br>
        <input type="text" value="192.168.240.${num}" readonly style="width:150px;height:20px;font-size:15px;">
        <input type="button" id="connect" value="Connect" style="height:30px;background-color:#0e639c;color:white;margin:10px">
      </body>
    </html>
  `;
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            vscode.window.showInformationMessage(text);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

}