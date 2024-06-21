// pages/api/s3-upload-url.js
import aws from 'aws-sdk';

const s3 = new aws.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export default function handler(req, res) {
    const { fileName, fileType } = req.query;

    const s3Params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, url) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting signed URL');
        }
        res.status(200).json({ url });
    });
}