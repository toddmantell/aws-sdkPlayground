const {S3} = require('aws-sdk');
const uuid = require('uuid');
const ADMZip = require('adm-zip');
const fs = require('fs');

const S3Instance = new S3({region: 'us-east-1'});

const bucketName = 'todds-test-bucket-' + uuid.v4();

async function createBucket() {
	try {
		const zip = new ADMZip();
		zip.addLocalFile('./handler.js');
		zip.writeZip('./test.zip');

		const file = fs.readFile('test.zip', (err, data) => {
			err && console.log(err);

			return data;
		});

		var uploadParams = { Bucket: bucketName, Key: 'test.zip', Body: file };
		const bucket = await S3Instance.createBucket({ Bucket: bucketName }).promise();
		await S3Instance.putObject(uploadParams).promise();

		console.log('bucket! : ', bucket);
		
		return bucket.Location;
	} catch (error) {
		console.log('Caught Error: ', error);
	}
}

module.exports = createBucket;

// createBucket();


// This is the callback-based version
// function createBucket() {
// 	return S3Instance.createBucket({Bucket: bucketName}, (err, data) => {
// 		if (err) {
// 			console.log(JSON.stringify(err));
// 			return err;
// 		}
// 		if (data) {
// 			console.log(`Bucket Created: ${JSON.stringify(data)}`);
// 			return data;
// 		}
// 	});
// }