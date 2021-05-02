import { AppBar, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { useState } from 'react'
import PostList from '../post/PostList';
import FollowGrid from './FollowGrid';
import { PostT, UserT } from './types';

type ProfileTabsProps = {
    user: UserT
    posts: PostT[]
    removePostUpdate: (val: PostT) => void
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({user, posts, removePostUpdate}) => {
    const [tab, setTab] = useState<string>('1')

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
        setTab(newValue)
    }

    return (
        <div>
            <TabContext value={tab}>
                <AppBar position="static">
                    <TabList
                        onChange={handleChangeTab}
                        aria-label="simple tabs example"
                        variant="fullWidth"
                    >
                        <Tab label="Post" value="1" />
                        <Tab label="Following" value="2" />
                        <Tab label="Followers" value="3" />
                    </TabList>
                </AppBar>
                <TabPanel value="1"><PostList removeUpdate={removePostUpdate} posts={posts} /></TabPanel>
                <TabPanel value="2"><FollowGrid people={user.following} /></TabPanel>
                <TabPanel value="3"><FollowGrid people={user.followers} /></TabPanel>
            </TabContext>
        </div>
    )
};

export default ProfileTabs
