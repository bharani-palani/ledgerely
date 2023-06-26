import apiInstance from '../../../services/apiServices';
import { baseUrl } from "../../../environment";
import * as EventEmitter from 'events'

export default class MediaFactory {
    constructor(contextData) {
        this.Bucket = "";
        this.config = {
            fileStorageAccessKey: contextData.fileStorageAccessKey
        };
    }
    getBuckeName() {
        return this.Bucket;
    }
    
    fetchFileFolder(object) {
        const getParams = new URLSearchParams(object).toString();
        return apiInstance
        .get(`/api/media/getList?X-Access-Key=${this.config.fileStorageAccessKey}&${getParams}`)
        .then(r => ({
            Contents: r.data.response.map(c => ({...c, LastModified: new Date(c.LastModified)}))
        }));
    }
    uploadFile = (target) => {
        const myEmitter = new EventEmitter();
        myEmitter.done = () => {
            const config = {
                onUploadProgress: (progressEvent) => {
                    const pObj = { 
                        loaded: progressEvent.loaded, 
                        total: progressEvent.total, 
                        Key: target.Key 
                    };
                    myEmitter.emit('httpUploadProgress', pObj);
                }
            };
            const formdata = new FormData();
            formdata.append('X-Access-Key', this.config.fileStorageAccessKey);
            formdata.append('file', target.Body);
            formdata.append('folder',target.Key.split("/").slice(0, -1).join("/"));
            return apiInstance.post(`/api/media/upload`, formdata, config)
        };
        return myEmitter;
    };
    renameFile = async object => {
        const getParams = new URLSearchParams({
            fromFileURL: object.oldKey,
            toFileURL: object.newKey,
            "X-Access-Key":  this.config.fileStorageAccessKey
        }).toString();
        return apiInstance.get(`/api/media/renameFile?${getParams}`);
    }
    renameFolder = async object => {
        const getParams = new URLSearchParams({
            fromFileURL: object.oldKey,
            toFileURL: object.newKey,
            "X-Access-Key":  this.config.fileStorageAccessKey
        }).toString();
        return apiInstance.get(`/api/media/renameFile?${getParams}`);
    }
    deleteFolder = async (folder, callback) => {
        const getParams = new URLSearchParams({
            fileURL: folder,
            "X-Access-Key":  this.config.fileStorageAccessKey
        }).toString();
        apiInstance.get(`/api/media/deleteFile?${getParams}`)
        .then((r) => {
            return callback({ status: 'success' });
        })
        .catch(() => {
            return callback({ status: 'fail' });
        });

    }
    isUrlInternal = (unsignedUrl) => {
        const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
        const serviceProvider = pieces[0];
        return serviceProvider !== "https:";
    };
    
    getSignedUrl = async (Key, downloadable = "0") => {
        if(this.isUrlInternal(Key)) {
            const path = Key.split("/").slice(1, Key.length).join('/');
            const pieces = Key ? Key.split('/') : ['/'];
            const extension = pieces[pieces.length - 1].split('.').pop();

            const getParams = new URLSearchParams({
                fileURL: path,
                "X-Access-Key": this.config.fileStorageAccessKey,
                downloadable
            }).toString();
            const url = `${baseUrl()}/api/media/render?${getParams}`;
            return {
                url,
                path,
                extension
            };
        } else {
            return {
                url: Key,
                path: '',
                extension: ''
            };
        }
    };
    
    downloadToBrowser = route => {
        const pieces = route.split('/');
        const file = pieces[pieces.length - 1];
        this.getSignedUrl(route, "1").then(object => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', object.url);
          link.setAttribute('download', file);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    };

    fetchStream = async (Key) => {
        const getParams = new URLSearchParams({
            fileURL: Key,
            "X-Access-Key": this.config.fileStorageAccessKey
        }).toString();
        const url = `${baseUrl()}/api/media/render?${getParams}`;
        return fetch(url)
            .then(async res => {
                const reader = res.body.pipeThrough(new TextDecoderStream('utf-8')).getReader();
                const array = [];
                while(true) {
                    const {value, done} = await reader.read();
                    if(done) break;
                    array.push(value);
                }
                const ele = array.join("");
                return ele;
            });
    };
    
}