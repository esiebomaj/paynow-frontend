import { Heading, ListIcon, List, Box, ListItem } from '@chakra-ui/react';
import { MdSettings, MdCheckCircle } from 'react-icons/md';

const GettingStarted = () => {
  return (
    <Box border="1px" borderColor="gray.200" p={5} borderTopRadius="md">
      <List
        spacing={3}
        css={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Heading as="h4" size="md">
          Getting Started
        </Heading>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Verify your phone number
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Add your Bank Account
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          start recieving money
        </ListItem>
        <ListItem>
          <ListIcon as={MdSettings} color="green.500" />
          Withdraw your money to your bank
        </ListItem>
      </List>
    </Box>
  );
};

export default GettingStarted;
