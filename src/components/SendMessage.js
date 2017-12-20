import React from 'react'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'
import PropTypes  from 'prop-types'

const SendMessageStyle = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`

const SendMessage = ({ channelName }) => (
  <SendMessageStyle>
    <Input fluid placeholder={`Message #${channelName}`} />
  </SendMessageStyle>
)
SendMessage.propTypes = {
  channelName: PropTypes.string
}

export default SendMessage