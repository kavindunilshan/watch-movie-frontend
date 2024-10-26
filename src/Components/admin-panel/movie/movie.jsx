import React, {useContext, useEffect} from 'react';
import {SettingsContext} from "../settings-context.jsx";

function Movie(props) {
    const { setComponentData } = useContext(SettingsContext);

    useEffect(() => {
        setComponentData({"title": "Movie", "slogan": "Manage your Movies"});
    }, []);
    return (
        <div></div>
    );
}

export default Movie;