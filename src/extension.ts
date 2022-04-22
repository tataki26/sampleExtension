import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('emotionDevice', new TreeDataProvider());
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
