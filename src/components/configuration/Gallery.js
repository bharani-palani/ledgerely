import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import UploadDropZone from "./Gallery/UploadDropZone";
import GridData from "./Gallery/GridData";
import { S3Client, S3, GetObjectCommand  } from '@aws-sdk/client-s3';
import AppContext from "../../contexts/AppContext";
import {getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mockFileData from './Gallery/mockData';
import Tree, { TreeNode } from 'rc-tree';
import classNames from 'classnames';
import "rc-tree/assets/index.css"

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [url, setUrl] = useState("");
    const [fileFolders, setFileFolders] = useState(mockFileData);
    const [accessKeyId, secretAccessKey, bucket, region] = [
        appData.aws_s3_access_key_id, 
        appData.aws_s3_secret_access_key, 
        appData.aws_s3_bucket, 
        appData.aws_s3_region
    ];
    const list = Array(12).fill().map((a,i) => ({
       label: `File name ${i+1}`,
       url: "https://s3.ap-south-1.amazonaws.com/bharani.tech/avatar/20191006_161009.jpg",
       lastModified: new Date(),
       size: 1121323
    }))
    const [gridData, setGridData] = useState(list);
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
            MaxKeys: 2000
        };
        new S3(config).listObjects(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); 
            } else {
                console.log('bbb', data);
                // console.log(JSON.stringify(data.Contents));   
            }       
        }); 
    }

	const uploadFile = (f) => { // working good
		var file = f.target.files[0];
		const target = { Bucket: bucket, Key: `test2/${file.name}`, Body: file };
		try {
			const instance = new Upload({
				client: new S3Client(config),
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

    const deleteFile = async () => { // working good
        var params = {  Bucket: bucket, Key: 'test' };
        new S3(config).deleteObject(params, (err, data) => {
            if (err) console.log(err, err.stack); 
            else     console.log(data); alert('deleted');
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
                alert("emptied")
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
                    alert('updated file')
                }
            })
        })
    }

    const loadImage = async (myKey) => { // not working
        const params = {
            Bucket: bucket,
            Key: myKey,
        };

        const client = new S3Client(config);
        const command = new GetObjectCommand(params);
        const url = await getSignedUrl(client, command, { expiresIn: 60 });
        console.log('bbb', url)
        setUrl(url)
    }

    const check = ()=> {
        return (
        <>
            <div style={{display: "flex"}}>
                <input type="file" onChange={uploadFile} />
                <button onClick={deleteFile}>Delete File</button>
                <button onClick={() => emptyS3Directory("test/",(d) => console.log('bbb', d))}>Delete Folder</button>
                <button onClick={() => renameFile()}>Rename file</button>
                <button onClick={() => loadImage("test/bniHalfGreyCoat.jpg")}>Load Image</button> 
                {/* 
                    jpg, png, gif working fine. 
                    SVG manully need to set meta tag
                    mp4 working fine.
                */}
            </div>
            {url  && <img src={url} alt="123" />}
            {url && <video className="hidden-print" autoPlay loop muted>
                <source src={url} type="video/mp4" />
            </video>}
            </>
        );
    }

    const find = (node, key) => {
        if(node.key === key) {
            return []
        }
        if(Array.isArray(node.children)) {          
            for(var treeNode of node.children) {
                const childResult = find(treeNode, key)        
                if(Array.isArray(childResult)) {
                    debugger;
                    return [ treeNode.title ].concat( childResult );
                }
            }
        }
    }

    const onSelect = (selectedKeys, info) => {

        console.log('bbb', find(fileFolders, selectedKeys[0])); // not working
    };

    const Icon = (obj) => {
        const { data } = obj;
        return <i className={classNames('fa fa-folder icon', !data.children && 'fa fa-file icon')} />
    };

	return (

        <div className='galleryContainer'>
            <div className='row'>
                <div className='col-md-3 leftPane'>
                    <h5 className='bucketName'>{bucket}</h5>
                    <div className='listContainer'>
                    <Tree
                        icon={Icon}
                        className="myCls"
                        showLine
                        checkable={false}
                        selectable={true}
                        defaultExpandAll
                        onSelect={onSelect}
                        treeData={fileFolders}
                        >
                        </Tree>
                    </div>
                </div>
                <div className='col-md-9 rightPane'>
                    <div className='row header'>
                        <div className='breadCrumb'>
                            <button  title={''} className='breadButton'>Bread crumbs</button>
                        </div>
                    </div>                    
                    <UploadDropZone />
                    <GridData data={gridData} />
                </div>
            </div>
        </div>
	);
}

export default Gallery;
