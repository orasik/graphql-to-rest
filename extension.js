const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "graphql-to-rest-queries" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerTextEditorCommand('extension.graphql_to_rest', editor => {
		
		if (vscode.window.activeTextEditor) {
			let graphqlQuery =  editor.document.getText();

			graphqlQuery = graphqlQuery.replace(/[\s,]+/g, ' ').trim();

			graphqlQuery = graphqlQuery.replace("query ", "query#");
			graphqlQuery = graphqlQuery.replace("mutation ", "mutation#");
			graphqlQuery = graphqlQuery.replace(/\"/g, '\\"');
			graphqlQuery = graphqlQuery.replace(/\n/g, '');
			graphqlQuery = graphqlQuery.replace("query#", "query ");
			graphqlQuery = graphqlQuery.replace("mutation#", "mutation ");
			console.log(graphqlQuery);
			let firstLine = editor.document.lineAt(0);
			let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			let textRange = new vscode.Range(0,
                firstLine.range.start.character,
                editor.document.lineCount - 1,
lastLine.range.end.character); 

			editor.edit(builder => builder.replace(textRange, `{"query": "`+graphqlQuery+`"}`));
			// Display a message box to the user
			vscode.window.showInformationMessage('Done!');
		}

	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
