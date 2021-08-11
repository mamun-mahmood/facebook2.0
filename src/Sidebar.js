import { ChatOutlined, EmojiFlags, LocalHospital, PeopleOutline, Storefront, VideoLibrary } from '@material-ui/icons';
import React from 'react';
import './Sidebar.css'
import SidebarRow from './SidebarRow';
import { useStateValue } from './StateProvider';
const Sidebar = () => {
    const [{user}, ] = useStateValue();
    return (
        <div className="sidebar">
            <SidebarRow src={user.photoURL} title={user.displayName} />
            <SidebarRow Icon={LocalHospital} title="COVID-19 Information center" />
            <SidebarRow Icon={EmojiFlags} title='Pages' />
            <SidebarRow Icon={PeopleOutline} title='Friends' />
            <SidebarRow Icon={ChatOutlined} title='Messenger' />
            <SidebarRow Icon={Storefront} title='Marketplace' />
            <SidebarRow Icon={VideoLibrary} title='Videos' />
        </div>
    );
};

export default Sidebar;