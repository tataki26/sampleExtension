import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('uniDevice', new TreeDataProvider());
	
	  vscode.commands.registerCommand('uniDevice1.connection', ()=> {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
		  'uniDevice',
		  'UNI Device',
		  vscode.ViewColumn.One,
		  {}
		);
  
		// And set its HTML content
		panel.webview.html = getWebviewContent(1);
	  });

}

function getWebviewContent(num: number) {
	return `<!DOCTYPE html>
  <html lang="ko">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>UNI Device</title>
  </head>
  <body>
  <p>Communication Type</p>
	  <input type="radio" name="chk_info" value="USB">USB
	  <input type="radio" name="chk_info" value="UDP" checked="checked">UDP
	  <input type="radio" name="chk_info" value="UDP Full Address">UDP Full Address
	  <p>Network</p>
	  <input type="text" value="192.168.240.${num}" readonly>
	  <button type="button" onclick="alert('Hello World!')">Connect</button>
  </body>
  </html>`;
  }

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;
  
	data: TreeItem[];
  
	constructor() {
	  this.data = [new TreeItem('UNI 1'), new TreeItem('UNI 2'), new TreeItem('UNI 3'), new TreeItem('UNI 4')];
	}
  
	getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
	  return element;
	}
  
	getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}
  }

  class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;
  
	constructor(label: string, children?: TreeItem[]) {
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed);
	  this.children = children;
	}
  }
  
export function deactivate() {}
