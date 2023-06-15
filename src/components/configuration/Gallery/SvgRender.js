import React, {useEffect, useState, useContext} from 'react';
import { FactoryMap } from './FactoryMap';
import AppContext from '../../../contexts/AppContext';

const SvgRender = props => {
    const [appData] = useContext(AppContext);
    const { src, unsignedUrl, className} = props;
    const [element, setElement] = useState('');
    const galleryFactory = FactoryMap(appData);

    useEffect(() => {
        const pieces = unsignedUrl ? unsignedUrl.split('/') : ['/'];
        const path = pieces.slice(1, pieces.length).join('/');

        galleryFactory
        .fetchStream(path)
        .then(ele => {
            setElement(ele);
        })
        .catch((e) => {
            setElement(false)
        });
    },[src]);

    return element && (
        <div className={className} dangerouslySetInnerHTML={{__html: element}}></div>
    )
}

export default SvgRender;