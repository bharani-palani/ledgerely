import apiInstance from '../../../services/apiServices';
import { baseUrl } from "../../../environment";

export default class MediaFactory {
    constructor(contextData) {
        this.Bucket = contextData.web;
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
        return {
            on: (_, callback) => {                
                const obj = {
                    loaded: 0, total: 0, Key: target.Key
                }
                callback(obj);
            },
            done: () => {
                const formdata = new FormData();
                formdata.append('X-Access-Key', this.config.fileStorageAccessKey);
                formdata.append('file', target.Body);
                formdata.append('folder',target.Key.split("/").slice(0, -1).join("/"));
                return apiInstance.post(`/api/media/upload`, formdata)
            }
        }
    }
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
    getSignedUrl = async (Key, _expiry, _bucket) => {
        const getParams = new URLSearchParams({
            fileURL: Key,
            "X-Access-Key":  this.config.fileStorageAccessKey
        }).toString();
        const url = `${baseUrl()}/api/media/render?${getParams}`;
        return url;
    };
    
    downloadToBrowser = route => {
        const pieces = route.split('/');
        const file = pieces[pieces.length - 1];
        const path = route.split('/').slice(1, route.split('/').length).join('/');
        this.getSignedUrl(path).then(url => {
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', url);
          link.setAttribute('download', file);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      };
    
}