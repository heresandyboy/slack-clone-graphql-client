import React, { Component } from 'react'
import PropTypes from 'prop-types'
import decode from 'jwt-decode'

import Channels from '../components/Channels'
import Teams from '../components/Teams'
import AddChannelModal from '../components/AddChannelModal'

class Sidebar extends Component {
  state = {
    openAddChannelModal: false,
  };

  handleCloseAddChannelModal = () => {
    this.setState({ openAddChannelModal: false })
  };

  handleAddChannelClick = () => {
    this.setState({ openAddChannelModal: true })
  };

  render() {
    const { teams, team } = this.props  
 
    let username = ''
    try {
      const token = localStorage.getItem('token')
      const { user } = decode(token)
      // eslint-disable-next-line prefer-destructuring
      username = user.username
    } catch (err) {
      console.log(err)
    }

    return [
      <Teams
        key="team-sidebar"
        teams={teams}
      />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseAddChannelModal}
        open={this.state.openAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
    ]
  }
}
Sidebar.propTypes = {
  teams: PropTypes.array,
  team: PropTypes.object
}

export default Sidebar