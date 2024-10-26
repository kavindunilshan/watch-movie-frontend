import React, {useContext, useEffect} from 'react';
import {SettingsContext} from "../settings-context.jsx";

function Movie(props) {
    const { setComponentData } = useContext(SettingsContext);

    useEffect(() => {
        setComponentData({"title": "Theater", "slogan": "Manage your Theater data"});
    }, []);
    return (
        <div></div>
    );
}

export default Movie;