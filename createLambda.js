const AWS = require('aws-sdk');
// const bucketCreator = require('./bucketCreator');
const secrets = require('./secrets.json');

const myLambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

console.log('secrets', secrets.ROLE);

async function createLambda() {
	try {		
	// const newBucket = await bucketCreator();

	// console.log('newBucket: ', newBucket);
	
	// const bucketNameWithoutSlash = newBucket.Location.split('/')[1];
	
	// console.log(bucketNameWithoutSlash);
	
	myLambda.createFunction(
		{
			Code: {
				S3Bucket: 'get-grahamnumber-product-serverlessdeploymentbuck-ayyakhzvxuse',
				S3Key: secrets.S3KEY
			},
			FunctionName: 'MySDKLambda',
			Handler: 'handler.getGrahamNumber',
			Role: secrets.ROLE,
			Runtime: 'nodejs8.10',
			TracingConfig: {
				Mode: 'Active'
			}
		}, (err, data) => {
			err && console.log(err.stack);
			data && console.log('Lambda Created: ', data);
		});		
	} catch (error) {
		console.log(`An Error Occurred: ${JSON.stringify(error.stack)}`);
	}
}

createLambda();