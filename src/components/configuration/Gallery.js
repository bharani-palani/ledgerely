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

function Gallery(props) {
    const [appData] = useContext(AppContext);
    const [fileFolders, setFileFolders] = useState([]); // mockFileData
    const [breadCrumbs, setBreadCrumbs] = useState([]);
    const list = Array(12).fill().map((a,i) => ({
       label: `File name ${i+1}`,
       url: "https://s3.ap-south-1.amazonaws.com/bharani.tech/avatar/20191006_161009.jpg",
       lastModified: new Date(),
       size: 1121323
    }))
    const [gridData, setGridData] = useState(list);

    useEffect(() => {
       new AwsFactory(appData)
        .fetchFileFolder({Prefix: "", MaxKeys: 2000})
        .then(res => {
            const data = res.Contents;
            const result = tree(data)
            console.log('bbb',result);
            setFileFolders(result)
            // console.log('bbb', nest)
        })
        .catch(e => console.log('bbb', e));
    },[])

    const tree = (array) => {
        const result = [], o = { z: result };
        array.forEach((a,i) => {
            const pieces = a.Key.split("/");
            pieces
            .reduce((r, b) => {
                if (!r[b]) {
                    r[b] = { z: [] };
                    r.z.push({ 
                        key: `${Math.random()}`, 
                        title: b, 
                        // children: r[b].z
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

        setBreadCrumbs(find({children: [...fileFolders]}, selectedKeys[0]));
    };

    const Icon = (obj) => {
        const { data } = obj;
        return <i className={classNames('fa fa-folder icon', !data.children && 'fa fa-file icon')} />
    };

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
                    <GridData data={gridData} />
                </div>
            </div>
        </div>
	);
}

export default Gallery;
