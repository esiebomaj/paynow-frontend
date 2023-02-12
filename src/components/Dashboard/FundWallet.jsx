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
import { getBanks, fundWalletInit } from '../../services/paynowApiService';
import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';

function FundWalletModal({ children, refreshTrans, banks = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, refreshUser } = React.useContext(userContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const toast = useToast();
  let [searchParams, setSearchParams] = useSearchParams();

  const trRef = searchParams.get('reference');
  if (trRef) {
    refreshTrans();
    setSearchParams({});
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(data);
      const res = await fundWalletInit({ ...data, wallet_id: user.wallet.id });
      toast({
        title: 'Success',
        description: 'Wallet Fund initiated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      window.location.replace(res.authorization_url);
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
      <Text onClick={onOpen}>{children}</Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Top up your Paynow wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                onChange={e =>
                  setData({
                    ...data,
                    amount: e.target.value,
                  })
                }
                ref={initialRef}
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
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FundWalletModal;
