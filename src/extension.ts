import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('emotionDeviceView', new TreeDataProvider());

	context.subscriptions.push(
		vscode.commands.registerCommand('uniDevice.start', () => {
		  // Create and show panel
		  const panel = vscode.window.createWebviewPanel(
			'uniDevice',
			'UNI Device',
			vscode.ViewColumn.One,
			{}
		  );
	
		  // And set its HTML content
		  panel.webview.html = getWebviewContent();
		})
	  );

	  // vscode.commands.registerCommand('uniDevice.edit', ()=> vscode.window.showInformationMessage("successfully called edit entry"));
	  vscode.commands.registerCommand('uniDevice.edit', ()=> {
		// Create and show panel
		const panel = vscode.window.createWebviewPanel(
		  'uniDevice',
		  'UNI Device',
		  vscode.ViewColumn.One,
		  {}
		);
  
		// And set its HTML content
		panel.webview.html = getWebviewContent();
	  });

}

function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>UNI Device</title>
  </head>
  <body>
	  <input type="radio" name="chk_info" value="USB">USB
	  <input type="radio" name="chk_info" value="UDP" checked="checked">UDP
	  <input type="radio" name="chk_info" value="UDP Full Address">UDP Full Address
  </body>
  </html>`;
  }

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;
  
	data: TreeItem[];
  
	constructor() {
	  this.data = [new TreeItem('UNI', [
		new TreeItem('Connection'),
		new TreeItem('Motion')
	  ])];
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
