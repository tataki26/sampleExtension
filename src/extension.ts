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
		panel.webview.html = getConnectContent(1);
	  });

	  vscode.commands.registerCommand('uniDevice1.motion', () => {
		  const panel = vscode.window.createWebviewPanel(
			  'uniDevice',
			  'UNI Device',
			  vscode.ViewColumn.One,
			  {}
		  );

		  panel.webview.html = getMotionContent();
	  });

}

function getConnectContent(num: number) {
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

  function getMotionContent(){
	return `<!DOCTYPE html>
	<html lang="ko">
	<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>UNI Device</title>
	</head>
	<body>
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption>Motion Status</caption>
		<thead>
			<tr align="center" bgcolor="black">
				<th>Axis No.</th>
				<th>Command Position</th>
				<th>Actual Position</th>
				<th>Delta Position</th>
				<th>Command Velocity</th>
				<th>Actual Velocity</th>
			</tr>
		</thead>

		<tbody>
			<tr align="center" bgcolor="black">
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
				<td>0</td>
			</tr>
			<tr align="center" bgcolor="black">
			<td>1</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			<td>0</td>
			</tr>
		</tbody>
		</table>
		<br>
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption></caption>
		<thead>
			<tr align="center" bgcolor="black">
				<th>Axis No.</th>
				<th>Drive Ready</th>
				<th>Drive ON</th>
				<th>Drive Run</th>
				<th>Moving</th>
				<th>In-Position</th>
			</tr>
		</thead>

		<tbody>
			<tr align="center" bgcolor="black">
				<td>0</td>
				<td><input type="radio" name="chk_info" value="On"></td>
				<td><input type="radio" name="chk_info" value="On"></td>
				<td><input type="radio" name="chk_info" value="On"></td>
				<td><input type="radio" name="chk_info" value="On"></td>
				<td><input type="radio" name="chk_info" value="On"></td>
			</tr>
			<tr align="center" bgcolor="black">
			<td>1</td>
			<td><input type="radio" name="chk_info" value="Off"></td>
			<td><input type="radio" name="chk_info" value="Off"></td>
			<td><input type="radio" name="chk_info" value="Off"></td>
			<td><input type="radio" name="chk_info" value="Off"></td>
			<td><input type="radio" name="chk_info" value="Off"></td>
			</tr>
		</tbody>
		</table>
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption>Move</caption>
		<thead>
			<tr align="center" bgcolor="black">
				<th>Axis No.</th>
				<th>Velocity</th>
				<th>Acceleration</th>
				<th>Deceleration</th>
				<th>Jerk Acceleration</th>
				<th>Jerk Deceleration</th>
				<th>Run</th>
			</tr>
		</thead>

		<tbody>
			<tr align="center" bgcolor="black">
				<td>0</td>
				<td>90</td>
				<td>600</td>
				<td>600</td>
				<td>66</td>
				<td>66</td>
				<td><button type="button" onclick="alert('Hello World!')">Run</button></td>
			</tr>
			<tr align="center" bgcolor="black">
			<td>1</td>
			<td>360</td>
			<td>100</td>
			<td>100</td>
			<td>66</td>
			<td>66</td>
			<td><button type="button" onclick="alert('Hello World!')">Run</button></td>
			</tr>
		</tbody>
		</table>
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
