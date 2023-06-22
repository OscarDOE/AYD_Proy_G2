const aws = require('aws-sdk')
const awsConfig = require('../config/aws.config')

const uploadImage = async (directory, data, imageName, type) => {
    const pathName = `${directory}/${imageName}.${type}`;

    const buff = Buffer.from(data, 'base64');

    const content = type == 'pdf' ? 'application/pdf':`image/${type}`;

    aws.config.update(awsConfig.configS3)

    //Se crea una variable que contiene el servicio o caracteristicas S3
    const s3 = new aws.S3()

    const paramsS3 = {
        Bucket: 'ayddata',
        Key: pathName,
        Body: buff,
        ContentType: content
    }

    return new Promise((resolve, reject) => {
        s3.putObject(paramsS3, (err, data) => {
            if (err) {
                console.log('ERROR uploadImage - ', err)
                return reject(err);
            }

            const imageURL = `https://ayddata.s3.amazonaws.com/${pathName}`
            resolve(imageURL);
        });
    })
}

module.exports = {
    uploadImage
}