import React, { Component } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const Home = ()=>(
    <Query
        query={gql`
        {
            allUsers{
                _id
                username
            }
        }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
                <ul> { data.allUsers.map(({ _id, username }) => (
                        <li key={_id}>{username}</li>
                    ))}
                </ul>
            )
        }}
    </Query>
);

export default Home;