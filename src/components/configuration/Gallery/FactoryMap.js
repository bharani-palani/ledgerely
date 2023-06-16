import AwsFactory from './AwsFactory';
import MediaFactory from './MediaFactory';

const FactoryMap = (appData) => {
    switch(appData['fileStorageType']) {
    case 'AWSS3':
        return {
            library: new AwsFactory(appData),
            routePrefixKey: "awss3"
        };
        break;
    case 'SELF':
        return {
            library: new MediaFactory(appData),
            routePrefixKey: "self"
        };
        break;
    default:
        return null;
    }
}

export { FactoryMap, AwsFactory, MediaFactory };