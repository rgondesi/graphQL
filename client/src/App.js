import React, { Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


//Components
import BookList from './components/BookList';


//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {

  render() {
    return (

      <ApolloProvider client={client}>

      <div id="main">
        <h1> My First React Book Reading List</h1>
        <BookList/>
      </div>

      </ApolloProvider>
    );
  } 

}


export default App;
