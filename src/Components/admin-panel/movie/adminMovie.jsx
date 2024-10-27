import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../admin-context";

function AdminMovie(props) {
    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({"title": "Movie", "slogan": "Manage your Movies"});
    }, []);
    return (
        <div></div>
    );
}

export default AdminMovie;