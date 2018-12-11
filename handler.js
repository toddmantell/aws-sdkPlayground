'use strict';

const AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
AWSXRay.config([AWSXRay.plugins.EC2Plugin]);
require('isomorphic-fetch');

module.exports.getPrice = async (event, context, callback) => {
	const price = await getChipotlePrice();

  return {
    statusCode: 200,
    body: JSON.stringify(price)
  };
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

async function getChipotlePrice() {
	const price = await fetch(`https://api.iextrading.com/1.0/stock/CMG/price`);

	return await price.json();
}
