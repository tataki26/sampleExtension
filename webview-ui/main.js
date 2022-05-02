const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
  const connectButton = document.getElementById("connect");
  connectButton.addEventListener("click", handleConnectClick);
}

function handleConnectClick() {
  vscode.postMessage({
    command: "hello",
    text: "Connect Success!!! 🤠",
  });
}