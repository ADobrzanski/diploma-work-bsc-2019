const path = require("path"); 
const uuidv4 = require('uuid/v4');
const { createWriteStream } = require("fs");
const S3 = require('aws-sdk/clients/s3');
const v4 = require('aws-signature-v4');
let bucket = new S3({ apiVersion: '2006-03-01' });

const uploadToAPIServer = async (stream) => {
  const filename = uuidv4();
  await new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path.join(__dirname, "../scores", filename )))
      .on("finish", () => resolve())
      .on('error', reject)
  );

  return filename;
}

const PORT = process.env.PORT || 4000;
const getLocalResourceUrl = object_key => `http://localhost:${PORT}/scores/${object_key}`

const uploadToAWSbucket = async (stream) => {
  const filename = uuidv4();
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: stream
  };
  const object_key = await new Promise(function(resolve, reject) {
    bucket.upload(params, function(err, data) {
      if (err) {
        reject(new Error('Error during file upload!'))
      } else {
        resolve(data.Key);
      }
    });
  })

  return object_key;
}

const getSignedResourceUrl = object_key => v4.createPresignedS3URL(object_key)

module.exports = {
  uploadToStorage: process.env.NODE_ENV === 'production'
    ? uploadToAWSbucket
    : uploadToAPIServer,
  getResourceUrl: process.env.NODE_ENV === 'production'
    ? getSignedResourceUrl
    : getLocalResourceUrl,
}