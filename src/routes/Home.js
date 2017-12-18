import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

/*
Functional component example
*/

const Home = ({ data: { loading, allUsers } }) =>
    (loading ? null : allUsers.map(u =>
        <h1 key={u.id}>{u.username} : {u.email}
        </h1>))

const allUsersQuery = gql`
 {   
     allUsers {
        id
        username
        email        
    }
 }
`
export default graphql(allUsersQuery)(Home)