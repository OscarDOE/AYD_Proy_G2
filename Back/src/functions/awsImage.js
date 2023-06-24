const aws = require('aws-sdk')
const awsConfig = require('../config/aws.config')

const uploadImage = async (directory, photo, imageName, type) => {
    const pathName = `${directory}/${imageName}.png`;

    const buff = Buffer.from(photo, 'base64');

    aws.config.update(awsConfig.configS3)

    //Se crea una variable que contiene el servicio o caracteristicas S3
    const s3 = new aws.S3()

    const paramsS3 = {
        Bucket: 'semi1proyecto-g5',
        Key: pathName,
        Body: buff,
        ContentType: `image/${type}`
    }

    return new Promise((resolve, reject) => {
        s3.putObject(paramsS3, (err, data) => {
            if (err) {
                console.log('ERROR uploadImage - ', err)
                return reject(err);
            }

            const imageURL = `https://semi1proyecto-g5.s3.amazonaws.com/${pathName}`
            resolve(imageURL);
        });
    })
}

module.exports = {
    uploadImage
}