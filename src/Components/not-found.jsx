import React, {useState} from 'react'
import useLogger from './useLogger';

const NotFound = (props) => {
    const [path, setPath] = useState(props);

    useLogger(path);

    return (<div>Page Not Found</div>);
}
 
export default NotFound;