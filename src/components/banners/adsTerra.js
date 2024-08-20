import { useEffect, useRef } from 'react';

export const AdBanner1 = (props) => {
    const { key } = props
    const banner = useRef();
    const atOptions = {
        key: 'fb7df892da300bdf6b2a479d1012292e',
        format: 'iframe',
        height: 50,
        width: 50,
        params: {},
    };

    useEffect(() => {
        if (banner.current && !banner.current.firstChild) {
            const conf = document.createElement('script');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

            banner.current.append(conf);
            banner.current.append(script);
        }
    }, [banner]);

    return <div key={key} className="ads1" ref={banner}></div>;
}


export const AdBanner2 = (props) => {
    const { key } = props
    const obj1 = useRef();
    const atOptions = {
        key: 'd267dc037daaa6d98d3d448e4a341443',
        format: 'iframe',
        height: 300,
        width: 250,
        params: {},
    };

    useEffect(() => {
        if (obj1.current && !obj1.current.firstChild) {
            const conf = document.createElement('script');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

            obj1.current.append(conf);
            obj1.current.append(script);
        }
    }, [obj1]);

    return <div key={key} className="ads2" ref={obj1}></div>;
}

export const LinkDireto = () => {
    return <a href='https://www.profitablegatecpm.com/qkj60ip0?key=a5662dc2471697995dab99abf1f5e420'>Teste</a>
}