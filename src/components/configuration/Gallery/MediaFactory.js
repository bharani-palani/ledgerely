import apiInstance from '../../../services/apiServices';

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
        const prefix = new URLSearchParams(object).toString();
        return apiInstance
        .get(`/api/media/getList?X-Access-Key=${this.config.fileStorageAccessKey}&${prefix}`)
        .then(r => ({
            Contents: r.data.response.map(c => ({...c, LastModified: new Date(c.LastModified)}))
        }));
    }
}