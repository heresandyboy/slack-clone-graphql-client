import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react' 
import { Link } from 'react-router-dom'

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`

const paddingLeft = 'padding-left: 10px'

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`

const SideBarListHeader = styled.li`${paddingLeft};`

const PushLeft = styled.div`${paddingLeft};`

const Green = styled.span`color: #38978d;`

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')
Bubble.propTypes = {
    on: PropTypes.bool
}

const channel = ({ id, name }, teamId) => 
<Link key={`link-channel-${id}`} to={`/view-team/${teamId}/${id}`}>
<SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
</Link>
channel.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
}

const user = ({ id, name }) => (
    <SideBarListItem key={`user-${id}`}>
        <Bubble /> {name}
    </SideBarListItem>
)
user.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string
}

const Channels = ({
  teamName, username, teamId, channels, users, onAddChannelClick
}) => (
        <ChannelWrapper>
            <PushLeft>
                <TeamNameHeader>{teamName}</TeamNameHeader>
                {username}
            </PushLeft>
            <div>
                <SideBarList>
                    <SideBarListHeader>Channels <Icon onClick={onAddChannelClick} name="add circle"></Icon></SideBarListHeader>
                    {channels.map((c) => channel(c, teamId))}
                </SideBarList>
            </div>
            <div>
                <SideBarList>
                    <SideBarListHeader>Direct Messages</SideBarListHeader>
                    {users.map(user)}
                </SideBarList>
            </div>
        </ChannelWrapper>
    )
Channels.propTypes = {
    teamName: PropTypes.string,
    username: PropTypes.string,
    teamId: PropTypes.number,
    channels: PropTypes.array,
    users: PropTypes.array,
    onAddChannelClick: PropTypes.func
}


export default Channels