import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import Sidebar from '../containers/Sidebar'

const ViewTeam = ({ match: { params } }) => (
    <AppLayout>
        <Sidebar currentTeamId={params.teamId} />
        <Header channelName="general" />
        <Messages>
            <ul className="message-list">
                <li />
                <li />
            </ul>
        </Messages>
        <SendMessage channelName="general" />
    </AppLayout>
)
ViewTeam.propTypes = {
    match: PropTypes.any.isRequired
}

export default ViewTeam