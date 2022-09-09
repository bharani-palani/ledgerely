import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { newsApiToken } from "../../environment";
import moment from 'moment';

const Boogle = props => {
    const [q, setQ] = useState('covid');
    const [result, setResult] = useState([]);

    useEffect(() => {
        q && handleSearch();
    }, []);

    const onQueryChange = (value) => {
        const query = encodeURIComponent(value);
        setQ(query);
    }
    const handleSearch = () => {
        axios.get(`http://api.mediastack.com/v1/news?access_key=${newsApiToken}&keywords=${q}&languages=en`)
            .then(res => {
                setResult(res.data.data)
            })
    }
    return (
        <div>
            {/* {JSON.stringify({ q })} */}
            <div className="text-center my-2 font-monospace" style={{ fontSize: '5rem' }}>
                <span className='text-primary'>B</span>
                <span className='text-danger'>o</span>
                <span className='text-danger'>o</span>
                <span className='text-success'>g</span>
                <span className='text-info'>l</span>
                <span className='text-warning'>e</span>
            </div>
            <div className="input-group input-group-lg mb-2">
                <input type="text" onKeyPress={e => e.key === 'Enter' && handleSearch()} onChange={e => onQueryChange(e.target.value)} className="form-control" placeholder="Search here.." aria-label="Search here" aria-describedby="boogle-sizing-lg" id="boogle-sizing-lg" />
                <button onClick={() => handleSearch()} className="btn btn-primary" type="button"><i className='fa fa-search' /></button>
            </div>
            <div className="text-muted my-2 small">About {result.length} results for {decodeURIComponent(q)}</div>
            {result.length > 0 && <div className='resultGrid'>
                {result.map((res, i) => (
                    <div key={i} className='mb-3 row'>
                        {/* <img className='col-sm-2 img-fluid rounded pb-3' src={res.urlToImage} /> */}
                        <div className="col-sm-10">
                            <a className='link-primary h5 d-block' href={res.url} rel="noreferrer" target="_blank">{res.title}</a>
                            <p dangerouslySetInnerHTML={{ __html: res.description }} />
                            <div><span className="badge bg-secondary"><i className='fa fa-clock-o' /> {moment(res.published_at).format('Do MMM YYYY hh:mm A')}</span></div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

Boogle.propTypes = {
    property: PropTypes.value
};
Boogle.defaultProps = {};

export default Boogle;