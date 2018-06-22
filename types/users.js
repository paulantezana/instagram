module.exports = `
    type User{
        _id: ID!
        username: String!
        password: String!
        fullname: String!
        email: String!
        thumbnail: String,
    }

    type Error {
        path: String!
        message: String!
    }

    type Response {
        success: Boolean!
        errors: [Error]
    }

    type Query{
        allUsers: [User]!
        getUser(_id: ID!): User!
    }
    
    type Mutation{
        createUser(username: String!, password: String!, fullname:  String!, email:  String!): Response!
    }
`;