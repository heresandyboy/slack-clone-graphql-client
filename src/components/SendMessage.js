import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'


const SendMessageStyle = styled.div`
grid-column: 3;
padding: 20px;
`


const ENTER_KEY = 13

const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <SendMessageStyle>
    <Input
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e)
        }
      }}
      onChange={handleChange}
      onBlur={handleBlur}
      name="message"
      value={values.message}
      fluid
      placeholder={`Message #${channelName}`}
    />
  </SendMessageStyle>
)
SendMessage.propTypes = {
  channelName: PropTypes.string,
  values: PropTypes.any,
  handleChange: PropTypes.any,
  handleBlur: PropTypes.any,
  handleSubmit: PropTypes.any,
  isSubmitting: PropTypes.any
}

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false)
        return
      }

      await mutate({
        variables: { channelId, text: values.message },
      })
      resetForm(false)
    },
  }),
)(SendMessage)