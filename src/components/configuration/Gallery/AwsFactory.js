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
    }
    fetchFileFolder(rest) { 
        var params = {
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
    deleteFile = async () => { // working good
        var params = {  Bucket: this.Bucket, Key: 'test' };
        new S3(this.config).deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack); 
            else     console.log(data); alert('deleted');
        }); 
    }

    emptyS3Directory = async (folder, callback) => { // working fine
        let params = {
            Bucket: this.Bucket,
            Prefix: folder
        };

        new S3(this.config).listObjects(params, function(err, data) {
            if (err) return callback(err);
        
            if (data.Contents.length === 0) callback("folder empty");
        
            params = {Bucket: this.Bucket};
            params.Delete = {Objects:[]};
            
            data.Contents.forEach(function(content) {
              params.Delete.Objects.push({Key: content.Key});
            });
        
            new S3(this.config).deleteObjects(params, function(err, data) {
              if (err) return callback(err);
              if (data.IsTruncated) {
                this.emptyS3Directory(this.Bucket, callback);
              } else {
                callback("Deleted");
                alert("emptied")
              }
            });
          });
    }

    renameFile = async () => { //working fine
        var BUCKET_NAME = this.Bucket;
        var OLD_KEY = 'test/188018266.pdf';
        var NEW_KEY = 'test/188018266-new.pdf';

        new S3(this.config).copyObject({
            Bucket: BUCKET_NAME, 
            CopySource: `/${OLD_KEY}`, 
            Key: NEW_KEY
        },() => {
            new S3(this.config).deleteObject({
                Bucket: BUCKET_NAME, 
                Key: OLD_KEY
            },(err,data) => {
                if(err){
                    console.log('bbb', err)
                } else {
                    console.log('bbb', data)
                    alert('updated file')
                }
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