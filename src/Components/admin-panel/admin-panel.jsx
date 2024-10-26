import React, {useContext, useEffect} from 'react';
import '/src/styles/admin/admin.css';
import {Outlet} from "react-router-dom";
import {NavigateNext} from "@mui/icons-material";
import {AdminContext} from "./settings-context";
import HeaderWithSlogan from "./header-slogan";
import AdminMenu from "./settings-menu";

function Admin() {

    const { componentData } = useContext(AdminContext);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <>
            {
                isAuthenticated &&
                <div className={'admin'}>


                    <div className={'admin-topics'}>
                        <HeaderWithSlogan title={'Admin'} slogan={'Manage your dashboard admin'}/>
                        <NavigateNext style={{color: '#6c757d', margin: '0 20px 0 50px'}}/>
                        <HeaderWithSlogan
                            isSubTopic={true}
                            title={componentData.title}
                            slogan={componentData.slogan}
                            titleStyle={{fontWeight: '600', fontStyle: 'italic', fontSize: '1.7em',}}
                        />
                    </div>

                    <hr className={'admin-header-separator'}/>


                    <div className="admin-sub-container">
                        <div className="admin-left">
                            <AdminMenu/>
                        </div>
                        <div className="admin-right">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Admin;