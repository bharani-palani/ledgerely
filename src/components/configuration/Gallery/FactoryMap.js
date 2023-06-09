import AwsFactory from './AwsFactory';
import MediaFactory from './MediaFactory';

const FactoryMap = (appData) => {
    switch(appData['fileStorageType']) {
    case 'AWSS3':
        return new AwsFactory(appData);
        break;
    case 'SELF':
        return new MediaFactory(appData);
        break;
    default:
        return null;
    }
}

export { FactoryMap, AwsFactory, MediaFactory };