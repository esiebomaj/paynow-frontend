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
import { sendMoney } from '../../services/paynowApiService';
import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';

function SendMoneyModal({ children, refreshTrans, banks = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, refreshUser } = React.useContext(userContext);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = React.useRef(null);
  const toast = useToast();

  const handleInputChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await sendMoney({ ...data, sender_id: user.pk });
      toast({
        title: 'Success',
        description: `${data.amount} Sent successfully to @${data.recipient_username}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      refreshTrans();
      refreshUser();
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
            <FormControl mt={4}>
              <FormLabel>Reciever's Paynow tag</FormLabel>
              <Input
                name="recipient_username"
                onChange={handleInputChange}
                placeholder="@Paynow"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                name="amount"
                onChange={handleInputChange}
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
              Send
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SendMoneyModal;
