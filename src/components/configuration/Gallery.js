import React, { useState, useEffect } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, S3 } from '@aws-sdk/client-s3';

function Gallery(props) {
	const [ value, setValue ] = useState([]);

	const upload = (file) => {
        var file = file.target.files[0];
        console.log('bbb', file);
		const target = { Bucket: 'bharani.tech', Key: file.name, Body: file };
		try {
			const parallelUploads3 = new Upload({
				client: new S3Client({
					region: 'ap-south-1',
					credentials: {
						accessKeyId: 'AKIAYVFPZG3VENTUASZD',
						secretAccessKey: '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'
					}
				}),
				leavePartsOnError: false, // optional manually handle dropped parts
				params: target
			});

			parallelUploads3.on('httpUploadProgress', (progress) => {
				console.log(progress);
			});

			parallelUploads3.done();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<input type="file" onChange={upload} />
		</div>
	);
}

export default Gallery;
