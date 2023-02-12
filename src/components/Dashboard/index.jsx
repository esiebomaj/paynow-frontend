import {
  Text,
  Link,
  VStack,
  Input,
  Stack,
  PinInput,
  PinInputField,
  HStack,
  InputLeftElement,
  InputGroup,
  Button,
  Heading,
  Spacer,
  Flex,
  CardBody,
  Card,
  useToast,
  Image,
  Divider,
  ListIcon,
  List,
  Box,
  ListItem,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  Icon,
} from '@chakra-ui/react';
import { AtSignIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import { MdSettings, MdCheckCircle } from 'react-icons/md';
import { GiBanknote, GiBank } from 'react-icons/gi';

const Naira = () => {
  return (
    <VStack position={'relative'}>
      <Text color={'grey'} fontSize={80}>
        N
      </Text>
      <div
        style={{
          background: 'grey',
          width: '100%',
          top: '45%',
          position: 'absolute',
          height: '4px',
        }}
      ></div>
      <div
        style={{
          background: 'grey',
          width: '100%',
          top: '54%',
          position: 'absolute',
          height: '4px',
        }}
      ></div>
    </VStack>
  );
};

const Dashboard = () => {
  return (
    <VStack
      css={{
        top: 0,
        position: 'absolute',
        width: '90%',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      spacing={0}
      alignContent="flex-start"
    >
      <VStack
        justifySelf="flex-start"
        css={{
          marginTop: '50px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
        }}
      >
        <Text fontSize={28} fontWeight={64}>
          Hello Jeremiah 👋
        </Text>
        <Text fontSize={16}>Welcome to your Paynow dashboard</Text>
      </VStack>
      <HStack>
        <Naira />
        <Text fontSize={100}>10000.00</Text>
      </HStack>
      <Divider />
      <Box
        css={{
          paddingTop: '20px',
        }}
      >
        <HStack>
          <Button
            leftIcon={<Icon as={FaPiggyBank} />}
            colorScheme="blue"
            variant="solid"
            size="lg"
            width={200}
            height={50}
            fontSize={16}
          >
            Recieve money
          </Button>
          <Spacer width={30} />
          <Button
            leftIcon={<Icon as={GiBanknote} />}
            colorScheme="teal"
            variant="solid"
            size="lg"
            width={300}
            height={70}
            fontSize={20}
          >
            Fund Wallet
          </Button>
          <Spacer width={50} />
          <Button
            leftIcon={<Icon as={GiBank} />}
            colorScheme="red"
            variant="solid"
            width={300}
            height={70}
            fontSize={20}
          >
            Withdraw
          </Button>
          <Spacer width={30} />
          <Button
            leftIcon={<Icon as={FaDollarSign} />}
            colorScheme="purple"
            variant="solid"
            width={200}
            height={50}
            fontSize={16}
          >
            Send Money
          </Button>
        </HStack>
      </Box>

      <Box>
        <HStack mt={10} css={{ display: 'flex', alignItems: 'flex-start' }}>
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
                Verify you phone number
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Add your bank account number
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
          <Spacer />
          <Spacer />
          <Spacer />
          <Box border="1px" borderColor="gray.200" p={5} borderTopRadius="md">
            <TableContainer
              css={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Heading as="h4" size="md" mb={4}>
                Transactions{' '}
              </Heading>
              <Spacer />
              <Spacer />
              <Spacer />
              <Table variant="striped" colorScheme="teal">
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>10000</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                    <Td isNumeric>30000</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                    <Td isNumeric>9000</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                    <Td isNumeric>9000</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                    <Td isNumeric>9000</Td>
                  </Tr>
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </HStack>
      </Box>
    </VStack>
  );
};

export default Dashboard;
