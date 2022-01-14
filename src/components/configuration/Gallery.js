import React, { useState, useEffect, useContext } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, S3, AbortMultipartUploadCommand, GetBucketTaggingCommand, DeleteObjectCommand  } from '@aws-sdk/client-s3';
import AppContext from "../../contexts/AppContext";

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [accessKeyId, secretAccessKey, bucket, region] = [appData.aws_s3_access_key_id, appData.aws_s3_secret_access_key, appData.aws_s3_bucket, appData.aws_s3_region];
    useEffect(() => {
        // fetch1();
        // fetch2();
    },[])
    const fetch1 = async () => {

        const client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
        const command = new GetBucketTaggingCommand({Bucket: bucket, Key: "arn:aws:iam::595221624554:user/bharani"});
        const response = await client.send(command)
        .then(a => console.log('bbb', a))
        .catch(e => console.log('bbb', e));
        // console.log('bbb', response);
    };

    const fetch2 = () => {
        const client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });

		const params = {
            Key: "arn:aws:iam::595221624554:user/bharani",
            Bucket: bucket
		};
        const command = new AbortMultipartUploadCommand(params);
        
        client
        .send(command)
        .then((data) => {
          // process data.
          console.log('bbb', data);
        })
        .catch((error) => {
            console.log('bbb', error);
          // error handling.
        })
        .finally(() => {
          // finally.
        });
    };

	const uploadFile = (f) => { // working good
		var file = f.target.files[0];
		const target = { Bucket: bucket, Key: `test/${file.name}`, Body: file };
		try {
			const instance = new Upload({
				client: new S3Client({
					region,
					credentials: {
						accessKeyId,
						secretAccessKey
					}
				}),
				leavePartsOnError: false,
				params: target
			});

			instance.on('httpUploadProgress', (progress) => {
				console.log(progress);
			});

			instance.done();
		} catch (e) {
			console.log(e);
		}
	};

    const deleteInstance = async () => { // acess denied
        var target = {  Bucket: bucket, Key: 'test/' };
        const client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
        const command = new DeleteObjectCommand(target);
        const response = await client.send(command);
        console.log('bbb', response)
    }

	return (
		<div>
			<input type="file" onChange={uploadFile} />
            <button onClick={deleteInstance}>Delete</button>
		</div>
	);
}

export default Gallery;
