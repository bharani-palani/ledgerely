import React, {useEffect, useState} from 'react';

const SvgRender = props => {
    const {className, src, style} = props;
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

    return (<img 
        className={className}
        src={source}
        alt={source}
        style={style}
    />)
}

export default SvgRender;