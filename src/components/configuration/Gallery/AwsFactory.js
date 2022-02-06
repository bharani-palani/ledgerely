import { S3Client, S3, GetObjectCommand  } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {getSignedUrl } from '@aws-sdk/s3-request-presigner';


export default class AwsFactory {
    constructor(contextData){
        this.Bucket = contextData.aws_s3_bucket;
        this.config = {
            region: contextData.aws_s3_region,
            credentials: {
                accessKeyId: contextData.aws_s3_access_key_id,
                secretAccessKey: contextData.aws_s3_secret_access_key
            }
        }
        this.self = this;
    }
    fetchFileFolder(rest) { 
        const params = {
            Bucket: this.Bucket, 
            ...(Object.keys(rest).length > 0 && {...rest})
        };
        const promise = new S3(this.config).listObjects(params)
        return promise;
    }

    uploadFile(f) { // should do multipart upload
		var file = f.target.files[0];
		const target = { Bucket: this.Bucket, Key: `test2/${file.name}`, Body: file };
		try {
			const instance = new Upload({
				client: new S3Client(this.config),
				leavePartsOnError: false,
				params: target,
                Metadata: {
                    metadata1: "image/svg+xml"
                }
			});

			instance.on('httpUploadProgress', (progress) => {
				console.log(progress);
			});

			instance.done();
            alert('uploaded')
		} catch (e) {
			console.log(e);
		}
	};
    deleteFile = async (rest) => {
        const params = {
            Bucket: this.Bucket, 
            ...(Object.keys(rest).length > 0 && {...rest})
        };
        const promise = new S3(this.config).deleteObject(params);
        return promise;
    }

    emptyS3Directory = async (folder, callback) => {
        let params = {
            Bucket: this.Bucket,
            Prefix: folder
        };

        new S3(this.config).listObjects(params, (err, data) => {
            if (err) {return callback({status: "fail"})}
            if (data.Contents.length === 0) {callback({status: "success"})}
        
            params = {Bucket: this.Bucket};
            params.Delete = {Objects:[]};
            
            data.Contents.forEach((content) => {
              params.Delete.Objects.push({Key: content.Key});
            });
        
            new S3(this.config).deleteObjects(params, (err, data) => {
              if (err) {return callback({status: "fail"})}
              if (data.IsTruncated) {
                this.self.emptyS3Directory(this.Bucket, callback);
              } else {
                callback({status: "success"});
              }
            });
          });
    }

    renameFile = async (object) => { //working fine
        var BUCKET_NAME = this.Bucket;
        return new S3(this.config).copyObject({
            Bucket: BUCKET_NAME, 
            CopySource: `${BUCKET_NAME}/${object.oldKey}`, 
            Key: object.newKey
        },() => {
            new S3(this.config).deleteObject({
                Bucket: BUCKET_NAME, 
                Key: object.oldKey
            })
        })
    }


    loadImage = async (Key, expiresIn=300) => {
        const params = {
            Bucket: this.Bucket,
            Key,
            expiresIn
        };
        const client = new S3Client(this.config);
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(client, command, { expiresIn });
        return url;
    }
}