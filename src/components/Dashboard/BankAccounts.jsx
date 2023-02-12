import {
  Text,
  Button,
  Heading,
  Divider,
  ListIcon,
  List,
  Box,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Badge,
} from '@chakra-ui/react';
import { GiBanknote, GiBank } from 'react-icons/gi';
import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/context';
import { getBanks, createBankAccount } from '../../services/paynowApiService';
import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';

function AddBankModal({ banks = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const { user, refreshUser } = React.useContext(userContext);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(data);
      await createBankAccount(data);
      refreshUser();
      onClose();
      toast({
        title: 'Success',
        description: 'Bank Account Successfully Added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      console.log(e.response);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <ListItem cursor={'pointer'} onClick={onOpen}>
        <ListIcon as={PlusSquareIcon} color="green.500" />
        <Badge>Add new bank account</Badge>
      </ListItem>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Bank</FormLabel>
              <Select
                onChange={b => {
                  console.log(b.target.value);
                  const bank = banks.find(a => a.code === b.target.value);
                  setData({
                    ...data,
                    bank_name: bank.name,
                    bank_code: bank.code,
                    currency: bank.currency,
                  });
                }}
                placeholder="Select Bank"
              >
                {banks.map(b => (
                  <option value={b.code}>{b.name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Account Number</FormLabel>
              <Input
                onChange={e =>
                  setData({
                    ...data,
                    account_number: e.target.value,
                  })
                }
                ref={initialRef}
                placeholder="1293029123"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Account Name</FormLabel>
              <Input
                onChange={e =>
                  setData({
                    ...data,
                    account_name: e.target.value,
                  })
                }
                placeholder="John Doe"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const BankAccounts = ({ banks }) => {
  const { user, setUser } = useContext(userContext);

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      w={'100%'}
      p={5}
      borderTopRadius="md"
    >
      <List
        spacing={3}
        css={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Heading as="h4" size="md">
          Your Bank Accounts
        </Heading>
        <Divider />
        {user.bank_accounts.map(b => (
          <ListItem
            css={{
              textAlign: 'left',
            }}
          >
            <Text fontSize={18}>
              <ListIcon as={GiBank} color="green.500" /> {b.bank_name}
            </Text>
            <Text fontSize={16}>{b.account_number}</Text>
            <Text fontSize={16}>{b.account_name}</Text>
            <Divider />
          </ListItem>
        ))}
        <AddBankModal banks={banks} />
      </List>
    </Box>
  );
};

export default BankAccounts;
