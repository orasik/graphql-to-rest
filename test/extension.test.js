/* global suite, test */
const assert = require('assert');
const extension = require('../extension');

suite("GraphQL to Rest Tests", function() {

	test("query without commas", function() {
		let graphqlQuery = `query Me{
			me {
			  displayName
			  officeLocation
			  skills
			  messages {
				subject
				isRead
				from {
				  emailAddress {
					address
				  }
				}
			  }
			}
		  }`;

		let expectedRestBody = `"query Me{ me { displayName officeLocation skills messages { subject isRead from { emailAddress { address } } } } }"`;

		assert.equal(extension.convertGraphqlToRest(graphqlQuery), expectedRestBody);
	});

	test("query with commas", function() {
		let graphqlQuery = `query MyQuery{
			me {
				drives {
					quota {
						used,
						remaining,
					}
					root {
						children {
							name,
							size,
							lastModifiedDateTime,
							webUrl,
						}
					}
				}
			}
		}`;

		let expectedRestBody = `"query MyQuery{ me { drives { quota { used remaining } root { children { name size lastModifiedDateTime webUrl } } } } }"`;

		assert.equal(extension.convertGraphqlToRest(graphqlQuery), expectedRestBody);
	});

	test("mutation without commas", function() {
		let graphqlQuery = `mutation {
			updateCategory(id: 1, name: "Awesome Category", products: [7]) {
				name
				products {
					name
				}
			}
		}
		`;

		let expectedRestBody = `"mutation { updateCategory(id: 1 name: \\"Awesome Category\\" products: [7]) { name products { name } } }"`;

		assert.equal(extension.convertGraphqlToRest(graphqlQuery), expectedRestBody);
	});

	test("mutation with commas", function() {
		let graphqlQuery = `mutation {
				post(
					url: "https://www.oras.dev",
					description: "Oras Al-Kubaisi",
				) {
					id
				}
			}`;

		let expectedRestBody = `"mutation { post( url: \\"https://www.oras.dev\\" description: \\"Oras Al-Kubaisi\\" ) { id } }"`;

		assert.equal(extension.convertGraphqlToRest(graphqlQuery), expectedRestBody);
	});
});
