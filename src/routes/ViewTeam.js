import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'

import Header from '../components/Header'
import Messages from '../components/Messages'
import SendMessage from '../components/SendMessage'
import AppLayout from '../components/AppLayout'
import Sidebar from '../containers/Sidebar'

import { allTeamsQuery } from '../graphql/team'

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
    if (loading) {
        return null
    }

    const teamIdx = teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0
    const team = allTeams[teamIdx]
    const channelIdx = channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0
    const channel = team.channels[channelIdx]


    console.log('id', channelId)
    console.log('idx', channelIdx)
    console.log('channel', channel)
    return (
    <AppLayout>
        <Sidebar
            teams={allTeams.map(t => ({
                id: t.id,
                name: t.name,
                letter: t.name.charAt(0).toUpperCase(),
            }))}
            team={team}
        />
        <Header channelName={channel.name} />
        <Messages channelId={channel.id}>
            <ul className="message-list">
                <li />
                <li />
            </ul>
        </Messages>
        <SendMessage channelName={channel.name} />
    </AppLayout>)
}
ViewTeam.propTypes = {
    data: PropTypes.any,
    match: PropTypes.any.isRequired
}

export default graphql(allTeamsQuery)(ViewTeam)