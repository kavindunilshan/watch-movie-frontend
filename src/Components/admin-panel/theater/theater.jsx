import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../admin-context";

function AdminTheater(props) {
    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({"title": "Theater", "slogan": "Manage your Theater data"});
    }, []);
    return (
        <div></div>
    );
}

export default AdminTheater;