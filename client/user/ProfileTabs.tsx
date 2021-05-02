import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useState } from 'react'

const ProfileTabs = ({user, posts, removePostUpdate}) => {
    const [tab, setTab] = useState<string>('0')

    const handleChangeTab = () => {

    }

    return (
        <div>
            <TabContext value={tab}>
                <AppBar position="static">
                    <TabList onChange={handleChangeTab} aria-label="simple tabs example">
                        <Tab label="Post" value="1" />
                        <Tab label="Following" value="2" />
                        <Tab label="Followers" value="3" />
                    </TabList>
                </AppBar>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </div>
    )
};

export default ProfileTabs
