import React, { useState, useEffect } from 'react'
import AWS from 'aws-sdk';

function Gallery(props) {
    const [value, setValue] = useState([]);
    (async() => {
        try {
            AWS.config.update({
                accessKeyId: "AKIAYVFPZG3VLSSDHBBA",
                secretAccessKey: "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",
                region: "ap-south-1"
            })
            const s3 = new AWS.S3();
            const response = await s3.listObjectsV2({
                Bucket: "bharani.tech"
            }).promise();
            console.log('bbb', response);
        } catch (e) {
            console.log('bbb', e);
        }
    })();


    return (
        <div>Hello Gallery</div>
    )
}

export default Gallery;