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

	  context.subscriptions.push(
		  vscode.commands.registerCommand('uniDevice1.motion', () =>{

			const panel = vscode.window.createWebviewPanel(
				'uniDevice',
				'UNI Device',
				vscode.ViewColumn.One,
				{}
			);

			panel.webview.html = getMotionContent(panel.webview, context);
		  })
	  );
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

  function getMotionContent(webview: vscode.Webview, context: any): string{
	let html: string = ``;

	const myCSS = webview.asWebviewUri(vscode.Uri.joinPath(
		context.extensionUri, 'src', 'motion.css'
	));

	const myJS = webview.asWebviewUri(vscode.Uri.joinPath(
		context.extensionUri, 'src', 'motion.js'
	));

	html += `<!DOCTYPE html>
	<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>UNI Device</title>
		<link href="${myCSS}" rel="stylesheet" />
	</head>
	<body>
	<div class="tabs">
		<input id="all" type="radio" name="tab_item" checked>
		<label class="tab_item" for="all">Motion Status</label>
		<input id="programming" type="radio" name="tab_item">
		<label class="tab_item" for="programming">Drive Status</label>
		<input id="design" type="radio" name="tab_item">
		<label class="tab_item" for="design">Motion Fault</label>
		<div class="tab_content" id="all_content">
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption></caption>
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
		</div>
		<div class="tab_content" id="programming_content">
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption></caption>
		<thead>
			<tr align="center" bgcolor="black">
				<th>Axis No.</th>
				<th>Command Pulse</th>
				<th>Actual Pulse</th>
				<th>Command Rpm</th>
				<th>Actual Rpm</th>
				<th>DC Link Voltage</th>
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
		</div>
			<div class="tab_content" id="design_content">
			<table
			border="1"
			width="100%"
			height="100"
			cellspacing="5">
			<caption></caption>
			<thead>
				<tr align="center" bgcolor="black">
					<th>Axis No.</th>
					<th>+Limit</th>
					<th>-Limit</th>
					<th>Software +Limit</th>
					<th>Software -Limit</th>
					<th>Following Error</th>
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
		</div>
	</div>
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
		<br>
	<div class="tabs2">
		<input id="all2" type="radio" name="tab_item2" checked>
		<label class="tab_item2" for="all2">Move</label>
		<input id="programming2" type="radio" name="tab_item2">
		<label class="tab_item2" for="programming2">Jog</label>
		<input id="design2" type="radio" name="tab_item2">
		<label class="tab_item2" for="design2">Interpolation</label>
		<div class="tab_content2" id="all_content2">
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
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
		</div>
		<div class="tab_content2" id="programming_content2">
		<table
		border="1"
		width="100%"
		height="100"
		cellspacing="5">
		<caption></caption>
		<thead>
			<tr align="center" bgcolor="black">
				<th>Axis No.</th>
				<th>Velocity</th>
				<th>Acceleration</th>
				<th>Deceleration</th>
				<th>Jerk Acceleration</th>
				<th>Jerk Deceleration</th>
			</tr>
		</thead>
		<tbody>
			<tr align="center" bgcolor="black">
				<td>0</td>
				<td>360</td>
				<td>100</td>
				<td>10</td>
				<td>66</td>
				<td>66</td>
			</tr>
			<tr align="center" bgcolor="black">
				<td>1</td>
				<td>360</td>
				<td>100</td>
				<td>100</td>
				<td>66</td>
				<td>66</td>
			</tr>
		</tbody>
		</table>
		</div>
			<div class="tab_content2" id="design_content2">
			<table
			border="1"
			width="100%"
			height="100"
			cellspacing="5">
			<caption></caption>
			<thead>
				<tr align="center" bgcolor="black">
					<th>Moving Method</th>
					<th>Velocity</th>
					<th>Acceleration</th>
					<th>Deceleration</th>
					<th>Jerk Acceleration</th>
					<th>Jerk Deceleration</th>
				</tr>
			</thead>
			<tbody>
				<tr align="center" bgcolor="black">
					<td>Line</td>
					<td>360</td>
					<td>1000</td>
					<td>100</td>
					<td>66</td>
					<td>66</td>
				</tr>
				<tr align="center" bgcolor="black">
					<td>Arc&Radius</td>
					<td>360</td>
					<td>1000</td>
					<td>100</td>
					<td>66</td>
					<td>66</td>
				</tr>
				<tr align="center" bgcolor="black">
					<td>Arc&Angle</td>
					<td>360</td>
					<td>1000</td>
					<td>100</td>
					<td>66</td>
					<td>66</td>
				</tr>
			</tbody>
			</table>
		</div>
	</div>
	</body>
	</html>`;

	return html;
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
