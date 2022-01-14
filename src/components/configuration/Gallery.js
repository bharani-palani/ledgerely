import React, { useState, useEffect, useContext } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, S3  } from '@aws-sdk/client-s3';
import AppContext from "../../contexts/AppContext";

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [accessKeyId, secretAccessKey, bucket, region] = [appData.aws_s3_access_key_id, appData.aws_s3_secret_access_key, appData.aws_s3_bucket, appData.aws_s3_region];
     const config = {
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    };
   useEffect(() => {
        fetch();
    },[])


   const fetch = () => { // working good
        // paramsSample = {
        //     Bucket: 'STRING_VALUE', /* required */
        //     Delimiter: 'STRING_VALUE',
        //     EncodingType: url,
        //     ExpectedBucketOwner: 'STRING_VALUE',
        //     Marker: 'STRING_VALUE',
        //     MaxKeys: 'NUMBER_VALUE',
        //     Prefix: 'STRING_VALUE',
        //     RequestPayer: requester
        // };
        var params = {
            Bucket: bucket, 
        };
        new S3(config).listObjects(params, (err, data) => {
            if (err) console.log(err, err.stack); 
            else     console.log(data);          
        }); 
    }

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

    const deleteFile = async () => { // working good
        var params = {  Bucket: bucket, Key: 'test' };
        new S3(config).deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack); 
            else     console.log(data);          
        }); 
    }

    const emptyS3Directory = async (folder, callback) => { // working fine
        let params = {
            Bucket: bucket,
            Prefix: folder
        };

        new S3(config).listObjects(params, function(err, data) {
            if (err) return callback(err);
        
            if (data.Contents.length === 0) callback("folder empty");
        
            params = {Bucket: bucket};
            params.Delete = {Objects:[]};
            
            data.Contents.forEach(function(content) {
              params.Delete.Objects.push({Key: content.Key});
            });
        
            new S3(config).deleteObjects(params, function(err, data) {
              if (err) return callback(err);
              if (data.IsTruncated) {
                emptyS3Directory(bucket, callback);
              } else {
                callback("Deleted");
              }
            });
          });
    }

    const renameFile = async () => { //working fine
        var BUCKET_NAME = bucket;
        var OLD_KEY = 'test/188018266.pdf';
        var NEW_KEY = 'test/188018266-new.pdf';

        new S3(config).copyObject({
            Bucket: BUCKET_NAME, 
            CopySource: `/${OLD_KEY}`, 
            Key: NEW_KEY
        },() => {
            new S3(config).deleteObject({
                Bucket: BUCKET_NAME, 
                Key: OLD_KEY
            },(err,data) => {
                if(err){
                    console.log('bbb', err)
                } else {
                    console.log('bbb', data)
                }
            })
        })
    }

    const loadImage = async (myKey) => { // not working
        await new S3(config).getSignedUrl('getObject', {
            Bucket: bucket,
            Key: myKey,
            Expires: 60,
            ContentType: "image/jpeg"
        },(err, url) => {
            if(err) {
                console.log('bbb', err)
            } else {
                console.log("bbb",url)
            }
        })

    }

	return (
        <div>
		<div style={{display: "flex"}}>
			<input type="file" onChange={uploadFile} />
            <button onClick={deleteFile}>Delete File</button>
            <button onClick={() => emptyS3Directory("test/",(d) => console.log('bbb', d))}>Delete Folder</button>
            <button onClick={() => renameFile()}>Rename file</button>
            <button onClick={() => loadImage("test/bniHalfGreyCoat.jpg")}>Load Image</button>
		</div>
        {/* <img src={("test/bniHalfGreyCoat.jpg")} alt="123" /> */}
        </div>
	);
}

export default Gallery;
