import {
  Text,
  VStack,
  HStack,
  Button,
  Heading,
  Spacer,
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
  Link,
  Badge,
} from '@chakra-ui/react';
import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import { MdSettings, MdCheckCircle } from 'react-icons/md';
import { GiBanknote, GiBank } from 'react-icons/gi';
import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/context';
import { Navigate } from 'react-router-dom';
import { getBanks, createBankAccount } from '../../services/paynowApiService';
import BankAccounts from './BankAccounts';
import GettingStarted from './GettingStarted';
import Naira from './Naira';
import ActionRow from './ActionRow';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const { user, setUser } = useContext(userContext);
  const [addAccoutOpen, setAddAccountOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [refreshTransId, setRefreshTransId] = useState(1);

  const refreshTrans = () => {
    setRefreshTransId(refreshTrans + 1);
  };

  const getBankList = async () => {
    try {
      const banks = await getBanks();
      setBanks(banks);
    } catch (e) {
      console.log(e, e.response);
    }
  };
  useEffect(() => {
    getBankList();
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  const formatCurrency = amount => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  if (!user.username) return <Navigate to="/signin" />;
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
          Hello {user.username} 👋
        </Text>
        <Text fontSize={16}>Welcome to your Paynow dashboard</Text>
      </VStack>
      <HStack>
        <Naira />
        <Text fontSize={100}>{formatCurrency(user.wallet.balance)}</Text>
      </HStack>
      <Divider />
      <Box
        css={{
          paddingTop: '20px',
        }}
      >
        <ActionRow refreshTrans={refreshTrans} />
      </Box>

      <Box>
        <HStack mt={10} css={{ display: 'flex', alignItems: 'flex-start' }}>
          <VStack>
            <GettingStarted />
            <BankAccounts banks={banks} />
          </VStack>
          <Spacer w={10} />
          <TransactionList refreshId={refreshTransId} />
        </HStack>

        <Spacer h={15} />
      </Box>
    </VStack>
  );
};

export default Dashboard;
