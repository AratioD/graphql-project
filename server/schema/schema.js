const graphql = require('graphql')
var _ = require('lodash');

// const {NoUnusedVariablesRule, GraphQLSchema} = require("graphql");
// const {GraphQLInt} = require("graphql");
// const {GraphQLInputObjectType, lexicographicSortSchema} = require("graphql");

//dummy data
var userData = [
    {id: "1", name: 'Bond', age: 36, phone: "+2312323", photo: true, profession: "agent"},
    {id: "13", name: 'Anna', age: 26, phone: "+12345678", photo: false, profession: "teacher"},
    {id: "211", name: 'Bella', age: 16, phone: "+358444455544", photo: true, profession: "developer"},
    {id: "19", name: 'Gina', age: 26, phone: "+388999", photo: false, profession: "actress"},
    {id: "150", name: 'Georgina', age: 36, phone: "+9988555", photo: false, profession: "nurse"}
]

var hobbiesData = [
    {id: "1", title: "coding", description: "using computers to make the world better place to live"},
    {id: "2", title: "Rowing", description: "Sweat and feel better before eating donouts"},
    {id: "3", title: "Swimming", description: "Get in the water and learn to become the water"},
    {id: "4", title: "Fencing", description: "A hobby for fency people"},
    {id: "5", title: "Hiking", description: "Wear hiking boots and explore the world"}
]

var postsData = [
    {id: '1', comment: 'Building a Mind'},
    {id: '2', comment: 'GraphQL is Amazing'},
    {id: '3', comment: 'How to Change the world'}
]
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLBoolean
} = graphql

//create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        phone: {type: GraphQLString},
        photo: {type: GraphQLBoolean},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Hobby description',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

// Post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},

            resolve(parent, args) {
                return _.find(userData, {id: args.id})
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                //return some data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})