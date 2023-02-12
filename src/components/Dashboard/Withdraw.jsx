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
import { useSearchParams } from 'react-router-dom';
import { GiBanknote, GiBank } from 'react-icons/gi';
import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/context';
import { withdrawFromWallet } from '../../services/paynowApiService';
import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';

function WithdrawModal({ children, refreshTrans, banks = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, refreshUser } = React.useContext(userContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await withdrawFromWallet({ ...data, user_id: user.pk });
      toast({
        title: 'Success',
        description: 'Wallet Withdraw initiated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refreshTrans();
      onClose();
    } catch (e) {
      console.log(e?.response);
      toast({
        title: 'Something went wrong',
        description: e?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <Text onClick={onOpen}>{children}</Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Top up your Paynow wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Bank Account</FormLabel>
              <Select
                ref={initialRef}
                onChange={b => {
                  console.log(b.target.value);
                  const bank = banks.find(a => a.code === b.target.value);
                  setData({
                    ...data,
                    bank_account_id: b.target.value,
                  });
                }}
                placeholder="Select Bank Account"
              >
                {user.bank_accounts.map(b => (
                  <option value={b.id}>
                    {b.bank_name.slice(0, 15)}../
                    {b.account_name.slice(0, 15)}../
                    {b.account_number.slice(0, 15)}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                onChange={e =>
                  setData({
                    ...data,
                    amount: e.target.value,
                  })
                }
                placeholder="10,000.00"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Withdraw
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WithdrawModal;
