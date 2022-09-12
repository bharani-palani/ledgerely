import React, { useState, useEffect } from 'react';
import axios from "axios";
import { rapidApiKey } from "../../environment";
// import moment from 'moment';

const Boogle = props => {
    const [q, setQ] = useState('covid%20cases%20in%20india');
    const [result, setResult] = useState([]);

    useEffect(() => {
        q && handleSearch();
    }, []);

    const onQueryChange = (value) => {
        const query = encodeURIComponent(value);
        setQ(query);
    }
    const handleSearch = () => {
        setResult([]);
        // const url = `http://api.mediastack.com/v1/news?access_key=${newsApiToken}&keywords=${q}&languages=en`;
        const url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${q}`;
        const options = {
            headers: {
                'X-User-Agent': 'desktop',
                'X-Proxy-Location': 'IN',
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
        }
        axios.get(url, options)
            .then(res => {
                setResult(res.data.results)
            })
    }
    return (
        <div>
            {/* {JSON.stringify({ q })} */}
            <div className="text-center my-2 font-monospace" style={{ fontSize: '5rem' }}>
                <span className='text-primary'>B</span>
                <span className='text-danger'>o</span>
                <span className='text-danger'>o</span>
                <span className='icon-bni'>g</span>
                <span className='text-info'>l</span>
                <span className='text-warning'>e</span>
            </div>
            <div className='row'>
                <div className='col-sm-6 offset-sm-3'>
                    <div className="input-group input-group-lg mb-2">
                        <input type="text" onKeyPress={e => e.key === 'Enter' && handleSearch()} onChange={e => onQueryChange(e.target.value)} className="form-control" placeholder="Search here.." aria-label="Search here" aria-describedby="boogle-sizing-lg" id="boogle-sizing-lg" />
                        <button onClick={() => handleSearch()} className="btn btn-primary" type="button">
                            {result.length < 1 ? <i className="fa fa-circle-o-notch fa-spin" /> : <i className='fa fa-search' />}
                        </button>
                    </div>
                    <div className="text-muted my-2 small">About {result.length} results for {decodeURIComponent(q)}</div>
                </div>
            </div>
            {result.length > 0 && <div className='resultGrid'>
                {result.map((res, i) => (
                    <div key={i} className='mb-3 row'>
                        {/* <img className='col-sm-2 img-fluid rounded pb-3' src={res.urlToImage} /> */}
                        <div className="col-sm-12">
                            <a className='link-primary h5 d-block' href={res.link} rel="noreferrer" target="_blank">{res.title}</a>
                            <p dangerouslySetInnerHTML={{ __html: res.description }} />
                            {/* <div><span className="badge bg-secondary"><i className='fa fa-clock-o' /> {moment(res.published_at).format('Do MMM YYYY hh:mm A')}</span></div> */}
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Boogle;