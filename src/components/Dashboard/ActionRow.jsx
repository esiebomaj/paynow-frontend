import { HStack, Button, Spacer, Icon } from '@chakra-ui/react';

import { AtSignIcon, ArrowForwardIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { FaDollarSign, FaPiggyBank } from 'react-icons/fa';
import { MdSettings, MdCheckCircle } from 'react-icons/md';
import { GiBanknote, GiBank } from 'react-icons/gi';
import FundWalletModal from './FundWallet';
import WithdrawModal from './Withdraw';
import SendMoneyModal from './SendMoney';

const ActionRow = ({ refreshTrans }) => {
  return (
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
      <FundWalletModal refreshTrans={refreshTrans}>
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
      </FundWalletModal>
      <Spacer width={50} />
      <WithdrawModal refreshTrans={refreshTrans}>
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
      </WithdrawModal>
      <Spacer width={30} />
      <SendMoneyModal refreshTrans={refreshTrans}>
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
      </SendMoneyModal>
    </HStack>
  );
};

export default ActionRow;
