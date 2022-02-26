import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import Landing from './pages/landing';
import { setContext } from 'apollo-link-context';
import Signup from './pages/Signup';
import Users from './components/Users';
import Login from './pages/Login';
import IsAuthenticated from './components/IsAuthenticated';

function App() {

  const httpLink = new HttpLink({uri: 'http://localhost:4000'});
  const authLink = setContext(async(req, {headers}) => {
    const token = localStorage.getItem('token')

    return {
      ...headers,
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    }
  })

  const link = authLink.concat(httpLink as any)

  const client = new ApolloClient({
    link: (link as any),
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route element={<IsAuthenticated />}>
            <Route path='/users' element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
    
  );
}

export default App;

// function async(req: any, arg1: { headers: any; }): import("apollo-link-context").ContextSetter {
//   throw new Error('Function not implemented.');
// }

// function req(req: any, arg1: { headers: any; }): import("apollo-link-context").ContextSetter {
//   throw new Error('Function not implemented.');
// }

