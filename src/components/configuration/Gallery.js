import React, { useState, useEffect, useContext } from 'react';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, S3, GetObjectCommand  } from '@aws-sdk/client-s3';
import AppContext from "../../contexts/AppContext";
import {getSignedUrl } from '@aws-sdk/s3-request-presigner';

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [url, setUrl] = useState("");
    const [fileFolders, setFileFolders] = useState(
        {
            nodes: [
            {
                id:1,
                label: "A"
            },
            {
                id:2,
                label: "B",
                nodes: [
                    {id:3, label: "a"},
                    {id:4, label: "b", nodes: [
                        {id:5, label: "1", isFile: true},
                        {id:6, label: "2", isFile: true}
                    ]},
                    {id:7, label: "c"}
                ]
            },
            {
                id:8,
                label: "C",
            },
        ]
    })
    const [accessKeyId, secretAccessKey, bucket, region] = [
        appData.aws_s3_access_key_id, 
        appData.aws_s3_secret_access_key, 
        appData.aws_s3_bucket, 
        appData.aws_s3_region
    ];
    const [breadCrumbs, setBreadCrumbs] = useState([bucket]);
     const config = {
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    };
   useEffect(() => {
        // fetch();
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
            if (err) console.log(err, err.stack); 
            else     console.log(data);          
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

    const find = (node, id) => {
        if(node.id === id) {
            return []
        }
        if(Array.isArray(node.nodes)) {          
            for(var treeNode of node.nodes) {
                const childResult = find(treeNode, id)        
                if(Array.isArray(childResult)) {
                    return [ treeNode.label ].concat( childResult );
                }
            }
        }
    }


    const RecursiveFileFolder = ({structure}) => {              
        return (
            <ul className='ul'>
              {structure.map((s,i) => {
                return <React.Fragment key={i}>
                    <li className='li' onClick={() => setBreadCrumbs(find({...fileFolders}, s.id))  }>
                        <i className={`fa fa-${s.isFile ? "file" : "folder"} icon`} />{s.label}
                    </li>
                    {s.nodes && s.nodes.length > 0 && <li className='li'><RecursiveFileFolder structure={s.nodes} /></li> }
                  </React.Fragment>
                }
            )}
          </ul>
        )
      }


	return (

        <div className='galleryContainer'>
            <div className='row'>
                <div className='col-md-3 leftPane'>
                    <h5 className='bucketName'>Bucket Files & Folders</h5>
                    <div className='listContainer'>
                        <RecursiveFileFolder structure={fileFolders.nodes} />
                    </div>
                </div>
                <div className='col-md-9 rightPane'>
                    <div className='row header'>
                        <div className='breadCrumb'>
                            {breadCrumbs.map((b,i) => (
                                <React.Fragment key={i}>
                                    <button className='breadButton'>{b}</button>
                                    {i !== breadCrumbs.length - 1 && <i className='fa fa-angle-right breadIcon' />}
                                </React.Fragment>
                                )
                            )}
                        </div>
                    </div>
                    <div className='dropZone text-center'>
                        DropZone
                    </div>
                    <div className='row tableGrid'>
                        <div className='col-md-10'>File name</div>
                        <div className='col-md-2 text-right'>
                            <i className='fa fa-list viewButtons' />
                            <i className='fa fa-table viewButtons' />
                        </div>

                    </div>
                </div>
            </div>
        </div>
	);
}

export default Gallery;
