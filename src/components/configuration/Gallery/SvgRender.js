import React, {useEffect, useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SvgRender = props => {
    const {className, src, style, optionalAttr, placeholderSrc, alt} = props;
    const [source, setSource] = useState('');

    useEffect(() => {
        fetch(src)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], 'image', {type: 'image/svg+xml'});
            readFile(file);
        })
    },[src]);

    const readFile = (input) => {
        const fr = new FileReader();
        fr.readAsDataURL(input);
        fr.addEventListener('load', () => {
            const res = fr.result;
            setSource(res);
        })
    }

    return (<LazyLoadImage
        {...optionalAttr}
        placeholderSrc={placeholderSrc}
        className={className}
        src={source}
        alt={alt}
        key={1}
        style={style}
    />)
}

export default SvgRender;