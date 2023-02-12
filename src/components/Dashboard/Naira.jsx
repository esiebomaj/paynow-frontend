import { VStack, Text } from '@chakra-ui/react';
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

export default Naira;
