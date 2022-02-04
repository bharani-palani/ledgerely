import React, { useState, useEffect, useContext } from 'react';
import UploadDropZone from "./Gallery/UploadDropZone";
import BreadCrumbs from "./Gallery/BreadCrumbs";
import GridData from "./Gallery/GridData";
import AwsFactory from "./Gallery/AwsFactory";
import ConfirmationModal from "./Gallery/ConfirmationModal";
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
    const [deleteFolderId, setDeleteFolderId] = useState("");
    const [gridData, setGridData] = useState([]);
    const userContext = useContext(UserContext);
    const [openModal, setOpenModal] = useState(false); // change to false

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
            // setFileFolders(mockFileData)
        })
        .catch(() => {
            userContext.renderToast({
                type: "error",
                icon: "fa fa-times-circle",
                message: "Unable to fetch file folders"
            });    
        });
    }

    const isFile = (pathname) => {
        return pathname.split('/').pop().indexOf('.') > -1;
    }

    useEffect(() => {
        const breads = [...breadCrumbs];
        if(breads.length > 0) {
            const link = isFile(breads.join("/")) ? breads.join("/") : `${breads.join("/")}/`;
            setDirectory(link);
            const IsDirectory = !isFile(breads.join("/"));
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
            .catch(() => {
                userContext.renderToast({
                    type: "error",
                    icon: "fa fa-times-circle",
                    message: "Unable to fetch file folders"
                });    
            });
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

    const onSelect = (selectedKeys) => {
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
        const newKey = uuidv4();
        const obj = {key: newKey, title: value, children: []};
        const bFileFolders = [...fileFolders];
        const newFolders = findAndAddFolder(key, obj, bFileFolders);
        setFileFolders(newFolders);
        onSelect([newKey]);
    }
    
    const findAndDeleteFolder = (key, node) => {
        if(Array.isArray(node)) {
            node.forEach((i,j) => {
                if(i.key === key) {
                    node.splice(j, 1);
                } else {
                    findAndDeleteFolder(key, i.children)
                }
            });
        }
        return node;
    }

    const onDeleteFolder = (id) => {
        setOpenModal(true);
        setDeleteFolderId(id)
    }
    
    const deleteFolderAction = () => {
        new AwsFactory(appData)
        .emptyS3Directory(directory, (res) => {
            if(res.status === "success") {
                userContext.renderToast({ message: `Folder successfully deleted` })
            } else {
                userContext.renderToast({
                    type: "error",
                    icon: "fa fa-times-circle",
                    message: "Unable to delete folder"
                });    
            }
        });
        const bFileFolders = [...fileFolders];
        const newFolders = findAndDeleteFolder(deleteFolderId, bFileFolders);
        setFileFolders(newFolders);
        setOpenModal(false);
        reset();
    }

    const checkFolderExistsInRoot = () => {

    }

    const reset = () => {
        setBreadCrumbs([]); 
        setDirectory(""); 
        setSelectedId("");
        setDeleteFolderId("");
        setGridData([]);
        setIsDirectory(false);
    }

	return (
        <div className='galleryContainer'>
            {openModal && (
                <ConfirmationModal
                    show={openModal}
                    confirmationString={`Are you sure to delete folder and all its contents?`}
                    onHide={() => {setOpenModal(false); setDeleteFolderId("");}}
                    size="md"
                    onYes={() => deleteFolderAction()}
                    animation={false}
                />
            )}
            <div className='row'>
                <div className='col-lg-3 col-md-4 leftPane'>
                    <h5 className='bucketName'>{appData.aws_s3_bucket}</h5>
                    <div className='listContainer'>
                    {
                        fileFolders.length > 0 &&
                            <Tree
                                treeData={fileFolders}
                                height={window.screen.height/2}
                                icon={Icon}
                                showLine={true}
                                checkable={false}
                                selectable={true}
                                onSelect={onSelect}
                                selectedKeys={[selectedId]}
                                defaultExpandAll={true}
                                key={selectedId}
                            >
                            </Tree>
                    }
                    </div>
                </div>
                <div className='col-lg-9 col-md-8 rightPane'>
                    <BreadCrumbs breadCrumbs={breadCrumbs} />                   
                    <UploadDropZone />
                    <GridData 
                        key={1}
                        data={gridData} 
                        directory={directory} 
                        selectedId={selectedId} 
                        onCreateFolder={(key, value) => onCreateFolder(key, value)} 
                        isDirectory={isDirectory}
                        onDeleteFolder={onDeleteFolder}
                    />
                </div>
            </div>
        </div>
	);
}

export default Gallery;
