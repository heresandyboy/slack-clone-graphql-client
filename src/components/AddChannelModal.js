import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Modal } from 'semantic-ui-react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import findIndex from 'lodash/findIndex'

import { allTeamsQuery } from '../graphql/team'

const AddChannelModal = ({
    open,
    onClose,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
}) => (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add Channel</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            fluid
                            placeholder="Channel name"
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Button disabled={isSubmitting} fluid onClick={onClose}>
                            Cancel
                        </Button>
                        <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
                            Create Channel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    )
AddChannelModal.propTypes = {
    teamId: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    key: PropTypes.any,
    values: PropTypes.any, // From Formik HOC (Higher order componenet)
    handleChange: PropTypes.any,  // Formik
    handleBlur: PropTypes.any,  // Formik
    handleSubmit: PropTypes.any,  // Formik
    isSubmitting: PropTypes.any  // Formik, set by setSubmitting()
}

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
        ok
        channel {
            id
            name            
        }
        errors {
          path
          message
        }
      }
  }
`
const channelOptomisticResponse = (values) => {
    return {
        createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
                __typename: 'Channel',
                id: -1,
                name: values.name,
            },
            errors: null
        }
    }
}

const onUpdate = (teamId, store, { data: { createChannel } }) => {
    const { ok, channel, errors } = createChannel
    if (!ok) {
        console.log(errors)
        return
    }

    const data = store.readQuery({ query: allTeamsQuery })
    const teamIdx = findIndex(data.allTeams, ['id', teamId])

    data.allTeams[teamIdx].channels.push(channel)
    store.writeQuery({ query: allTeamsQuery, data })
}

const onHandleSubmit = async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
    await mutate({
        variables: { teamId, name: values.name },
        optimisticResponse: channelOptomisticResponse(values),
        update: (store, { data: { createChannel } }) => {
            onUpdate(teamId, store, { data: { createChannel } })
        }
    })
    onClose() // Formik func - close form
    setSubmitting(false)
}


export default compose(
    graphql(createChannelMutation), // 'mutate' func passed in by GraphQL
    withFormik({
        mapPropsToValues: () => ({ name: '' }), // setSubmitting from Formik HOC - sets isSubmitting prop
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
            onHandleSubmit(values, { props: { onClose, teamId, mutate }, setSubmitting })
        },
    }),
)(AddChannelModal)