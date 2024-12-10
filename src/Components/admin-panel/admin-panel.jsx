import React, {useContext, useEffect} from 'react';
import '../../Styles/admin/admin.css';
import {Outlet} from "react-router-dom";
import {NavigateNext} from "@mui/icons-material";
import {AdminContext} from "./admin-context";
import HeaderWithSlogan from "./header-slogan";
import AdminMenu from "./admin-menu";
import {useAuthContext} from "@asgardeo/auth-react";

function Admin() {

    const { componentData } = useContext(AdminContext);

    const { state, signIn, signOut } = useAuthContext();
    const [isAuthenticated, setIsAuthenticated] = React.useState(state?.isAuthenticated);

    return (
        <>
            {
                isAuthenticated &&
                <div className={'admin'}>


                    <div className={'admin-topics'}>
                        <HeaderWithSlogan title={'Admin'} slogan={'Manage your dashboard admin'}/>
                        <NavigateNext style={{color: '#ffd700', fontSize: '30px', margin: '0 20px 0 50px'}}/>
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