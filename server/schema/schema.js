const graphql = require('graphql');

const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
     } = graphql;



/*

//dummy data
var books = [
    {name: 'Best Book', genre: 'Action', id: '1', authorId:'1'},
    {name: 'Better Book', genre: 'Fantacy', id: '2', authorId:'2'},
    {name: 'Great Book', genre: 'Fiction', id: '3',  authorId:'3'}
];

//dummy data
var author = [
    {name: 'Best Book', age: 111, id: '1'},
    {name: 'Better Book', age: 123, id: '2'},
    {name: 'Great Book', age: 124, id: '3'}
];

*/

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent, args) {
                console.log(parent);
                //return _.find(author, {id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
});



const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:() => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type:new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId: parent.id})
                return Book.find({authorId:parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //Code to get the data from db/other source
                console.log(typeof(args.id))
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(author, {id:args.id});
                return Author.findById(args.id);
            }

        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                //return books;
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parents, args) {
                //return author;
                return Author.find({});
            }

        }
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutaion',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                age: {type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
            return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name: {type:new GraphQLNonNull(GraphQLString)},
                genre: {type:new GraphQLNonNull(GraphQLString)},
                authorId: {type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
            return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery, 
    mutation:Mutation
});