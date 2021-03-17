const createTestCafe   = require('testcafe');
const testCafe         = await createTestCafe('localhost', 1337, 1338);
const runner           = testCafe.createRunner();
const remoteConnection = testcafe.createBrowserConnection();

// Visit this URL from the remote device.
console.log(remoteConnection.url);

// Wait until the remote device's browser connects.
await new Promise(resolve => remoteConnection.once('ready', resolve));

await runner
	.src('./tests')
	.browsers(remoteConnection)
	.run();
