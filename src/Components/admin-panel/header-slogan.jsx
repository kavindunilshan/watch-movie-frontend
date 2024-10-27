import React from 'react';
import '../../Styles/admin/header-slogan.css';

function HeaderWithSlogan({title, slogan, isSubTopic, titleStyle}) {
    return (
        <div className={'admin-header'}>
            <div className={'admin-header-title'} style={titleStyle || {}}>{title}</div>
            <div className={'admin-header-slogan'} style={isSubTopic ? {fontSize: '0.8em', fontStyle: 'italic'} : {}}>{slogan}</div>
        </div>
    );
}

export default HeaderWithSlogan;