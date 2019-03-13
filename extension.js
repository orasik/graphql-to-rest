const vscode = require('vscode');


function convertGraphqlToRest(graphqlQuery) {
	// normalise
	graphqlQuery = normalise(graphqlQuery);
	graphqlQuery = JSON.stringify(graphqlQuery);

	return graphqlQuery;
}

function normalise(text) {
	return text.replace(/[\s,]+/g, ' ').trim();
}
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "graphql-to-rest-queries" is now active!');

	let disposable = vscode.commands.registerTextEditorCommand('extension.graphql_to_rest', editor => {
		
		if (vscode.window.activeTextEditor) {
			let graphqlQuery =  editor.document.getText();

			graphqlQuery = convertGraphqlToRest(graphqlQuery);

			let firstLine = editor.document.lineAt(0);
			let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			let textRange = new vscode.Range(
				0,
                firstLine.range.start.character,
				editor.document.lineCount - 1,
				lastLine.range.end.character); 

			// Replace the editor with the converted text
			editor.edit(builder => builder.replace(textRange, `{"query": `+graphqlQuery+`}`));
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate,
	convertGraphqlToRest
}
