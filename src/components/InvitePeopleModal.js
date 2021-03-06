import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Modal } from 'semantic-ui-react'
import { withFormik } from 'formik'
import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'

import normalizeErrors from '../normalizeErrors'

const InvitePeopleModal = ({
    open,
    onClose,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    touched,
    errors,
}) => (
        <Modal open={open} onClose={onClose}>
            <Modal.Header>Add People to your Team</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            fluid
                            placeholder="User's email"
                        />
                    </Form.Field>
                    {touched.email && errors.email ? errors.email[0] : null}
                    <Form.Group widths="equal">
                        <Button disabled={isSubmitting} fluid onClick={onClose}>
                            Cancel
          </Button>
                        <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
                            Add User
          </Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    )
InvitePeopleModal.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    values: PropTypes.any,
    handleChange: PropTypes.any,
    handleBlur: PropTypes.any,
    handleSubmit: PropTypes.any,
    isSubmitting: PropTypes.any,
    touched: PropTypes.any,
    errors: PropTypes.any,
}

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`

export default compose(
    graphql(addTeamMemberMutation),
    withFormik({
        mapPropsToValues: () => ({ email: '' }),
        handleSubmit: async ( 
            values,
            { props: { onClose, teamId, mutate }, setSubmitting, setErrors },
        ) => {
            const response = await mutate({
                variables: { teamId, email: values.email },
            })
            const { ok, errors } = response.data.addTeamMember
            if (ok) {
                onClose()
                setSubmitting(false)
            } else {
                setSubmitting(false)
                setErrors(normalizeErrors(errors))
            }
        },
    }),
)(InvitePeopleModal)