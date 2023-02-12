import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { ColorModeSwitcher } from './components/shared/ColorModeSwitcher';
import userContext from './context/context';
import { getUser } from './services/paynowApiService';

function App() {
  const [user, setUser] = useState({});
  const refreshUser = async () => {
    const user = await getUser();
    setUser(user);
  };

  if (localStorage.getItem('access_token') && !user.username) {
    refreshUser();
  }

  return (
    <userContext.Provider value={{ user, setUser, refreshUser }}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={10}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route index path="join" element={<Signup />} />
                <Route path="signin" element={<Login />} />
              </Routes>
            </Grid>
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </userContext.Provider>
  );
}

export default App;
