import React, { useState, useEffect, useContext } from 'react';
import UploadDropZone from "./Gallery/UploadDropZone";
import BreadCrumbs from "./Gallery/BreadCrumbs";
import GridData from "./Gallery/GridData";
import AwsFactory from "./Gallery/AwsFactory";
import AppContext from "../../contexts/AppContext";
import mockFileData from './Gallery/mockData';
import Tree, { TreeNode } from 'rc-tree';
import classNames from 'classnames';
import "rc-tree/assets/index.css"
import { UserContext } from "../../contexts/UserContext";
import { v4 as uuidv4 } from 'uuid';

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [fileFolders, setFileFolders] = useState([]); // mockFileData
    const [breadCrumbs, setBreadCrumbs] = useState([]);
    const [directory, setDirectory] = useState("");
    const [isDirectory, setIsDirectory] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [gridData, setGridData] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        initS3();
    },[]);

    const initS3 = () => {
        new AwsFactory(appData)
        .fetchFileFolder({Prefix: "", MaxKeys: 2000})
        .then(res => {
            const data = res.Contents;
            const result = tree(data)
            setFileFolders(result)
        })
        .catch(e => console.log('bbb', e));
    }

    useEffect(() => {
        const breads = [...breadCrumbs];
        if(breads.length > 0) {
            const link = breads.length > 1 ? breads.join("/") : `${breads[0]}/`
            const dir = (link.charAt(link.length - 4) === "." || link.charAt(link.length - 5) === ".") ? `${link.split("/").slice(0,-1).join("/")}/` : link
            setDirectory(dir);
            const IsDirectory = !(link.charAt(link.length - 4) === "." || link.charAt(link.length - 5) === ".") && breads[breads.length-1]
            setIsDirectory(IsDirectory)
            new AwsFactory(appData)
            .fetchFileFolder({Prefix: link, MaxKeys: 2000})
            .then(res => {
                const list = (res.Contents && res.Contents.length) ? res.Contents.map(cont => (
                    {
                        label: cont.Key,
                        url: cont.Key,
                        lastModified: cont.LastModified,
                        size: cont.Size,
                        tag: cont.ETag
                    }
                )) : [];
                setGridData(list)
            })
            .catch(e => console.log('bbb', e));
        }
    },[JSON.stringify(breadCrumbs)])

    const tree = (array) => {
        const result = [], o = { z: result };
        array.forEach((a,i) => {
            const pieces = a.Key.split("/");
            pieces
            .reduce((r, b) => {
                if (!r[b]) {
                    r[b] = { z: [] };
                    r.z.push({ 
                        key: uuidv4(), 
                        title: b, 
                        ...( pieces[pieces.length - 1] !== b  && { children: r[b].z })
                    });
                }
                return r[b];
            }, o);
        });
        return result;
    };

    const find = (node, key) => {
        if(node.key === key) {
            return []
        }
        if(Array.isArray(node.children)) {          
            for(var treeNode of node.children) {
                const childResult = find(treeNode, key)        
                if(Array.isArray(childResult)) {
                    return [ treeNode.title ].concat( childResult );
                }
            }
        }
    }

    const onSelect = (selectedKeys, info) => {
        if(selectedKeys[0]) {
            setBreadCrumbs(find({children: [...fileFolders]}, selectedKeys[0]));
            setSelectedId(selectedKeys[0])
        }
    };

    const Icon = (obj) => {
        const { data } = obj;
        return <i className={classNames('fa fa-folder icon', !data.children && 'fa fa-file icon')} />
    };

    const findAndAddFolder = (key, json, node) => {
        if(Array.isArray(node)) {
            node.forEach(i => {
                if(i.key === key) {
                    if(i.children) {
                        i.children = [...i.children, json]
                    }
                } else {
                    findAndAddFolder(key, json, i.children)
                }
            });
        }
        return node;
    }

    const onCreateFolder = (key, value) => {
        const obj = {key: uuidv4(), title: value, children: []};
        const bFileFolders = [...fileFolders];
        const newFolders = findAndAddFolder(key, obj, bFileFolders);
        setFileFolders(newFolders);
    }
    
	return (
        <div className='galleryContainer'>
            <div className='row'>
                <div className='col-lg-3 col-md-4 leftPane'>
                    <h5 className='bucketName'>{appData.aws_s3_bucket}</h5>
                    <div className='listContainer'>
                    {fileFolders.length > 0 && <Tree
                        icon={Icon}
                        className="myCls"
                        showLine
                        checkable={false}
                        selectable={true}
                        defaultExpandAll
                        onSelect={onSelect}
                        treeData={fileFolders}
                        >
                        </Tree>}
                    </div>
                </div>
                <div className='col-lg-9 col-md-8 rightPane'>
                    <BreadCrumbs breadCrumbs={breadCrumbs} />                   
                    <UploadDropZone />
                    <GridData 
                        data={gridData} 
                        directory={directory} 
                        selectedId={selectedId} 
                        onCreateFolder={(key, value) => onCreateFolder(key, value)} 
                        isDirectory={isDirectory}
                    />
                </div>
            </div>
        </div>
	);
}

export default Gallery;
