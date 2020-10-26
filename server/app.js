const express  = require('express');
const { graphqlHTTP } = require('express-graphql'); // One end point
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MongoUser:Awesome99@cluster0.v8g2t.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to the Database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,() =>  {
    console.log('Now listening requests on port 4000')
});