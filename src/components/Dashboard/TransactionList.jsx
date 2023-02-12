import {
  Heading,
  Spacer,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Badge,
  Td,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getTransactions } from '../../services/paynowApiService';

const TransactionList = refreshId => {
  const [transactions, setTransactions] = useState([]);

  const getTransactionList = async () => {
    try {
      const transactions = await getTransactions();
      setTransactions(transactions);
    } catch (e) {
      console.log(e, e.response);
    }
  };
  useEffect(() => getTransactionList, [refreshId]);
  return (
    <>
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
              List of all transaction that affect your wallet
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Reference</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Created Date</Th>
                <Th>Created Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map(t => (
                <Tr>
                  <Td textTransform={'capitalize'}>{t.id}</Td>
                  <Td textTransform={'capitalize'}>{t.purpose}</Td>
                  <Td textTransform={'capitalize'} isNumeric>
                    {t.amount}.00
                  </Td>
                  <Td textTransform={'capitalize'}>
                    <Badge
                      colorScheme={
                        t.status === 'failed'
                          ? 'red'
                          : t.status === 'completed' || t.status === 'comleted'
                          ? 'green'
                          : 'blue'
                      }
                    >
                      {t.status}
                    </Badge>
                  </Td>
                  <Td isNumeric>
                    {new Date(t.created_at).toLocaleDateString()}
                  </Td>
                  <Td isNumeric>
                    {new Date(t.created_at).toLocaleTimeString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Reference</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Created Date</Th>
                <Th>Created Time</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TransactionList;
