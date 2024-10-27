import React, {useContext, useEffect} from 'react';
import {AdminContext} from "../admin-context.jsx";

function AdminShow(props) {
    const { setComponentData } = useContext(AdminContext);

    useEffect(() => {
        setComponentData({"title": "Show", "slogan": "Manage your Shows"});
    }, []);
    return (
        <div></div>
    );
}

export default AdminShow;