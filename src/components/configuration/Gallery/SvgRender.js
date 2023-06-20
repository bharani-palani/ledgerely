import React, {useEffect, useState, useContext} from 'react';
import { FactoryMap } from './FactoryMap';
import AppContext from '../../../contexts/AppContext';
import {getServiceProvider} from './SignedUrl';

const SvgRender = props => {
    const [appData] = useContext(AppContext);
    const { unsignedUrl, className} = props;
    const [element, setElement] = useState('');
    
    const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
    const path = pieces.slice(1, pieces.length).join('/');
    const sp = getServiceProvider(unsignedUrl);
    const galleryFactory = FactoryMap(sp, appData)?.library?.fetchStream(path);

    useEffect(() => {
        if(galleryFactory) {
            galleryFactory
            .then(ele => {
                setElement(ele);
            })
            .catch((e) => {
                setElement(false);
            });
        } else {
            setElement(false);
        }
    });

    return element && (
        <div className={className} dangerouslySetInnerHTML={{__html: element}}></div>
    )
}

export default SvgRender;