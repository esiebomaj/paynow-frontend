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
} from '@chakra-ui/react';
import { AtSignIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { login } from '../../services/paynowApiService';
import { useContext } from 'react';
import userContext from '../../context/context';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const toast = useToast();
  const { user, setUser } = useContext(userContext);
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  function showToast(title, msg, status) {
    toast({
      title: title,
      description: msg,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await login(data);
      console.log(res);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      setUser(res.user);
    } catch (e) {
      const err = e.response.data;
      for (let key in err) {
        setErrors({ ...errors, key: err[key] });
        showToast(key, err[key], 'error');
      }
    }
    setIsLoading(false);
  };

  const handleChange = e => {
    console.log(e);
    console.log(e, e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (user.username) return <Navigate to="/" />;
  return (
    <VStack spacing={20}>
      <Heading as="h3" size="lg">
        Sign into your PayNow Dashboard here
      </Heading>
      <form>
        <Card>
          <CardBody>
            <Stack spacing={5}>
              <Spacer />
              <InputGroup alignItems={'center'}>
                <InputLeftElement
                  top={1}
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  isInvalid={errors.username}
                  value={data.username}
                  onChange={handleChange}
                  size="lg"
                  placeholder="Paynow Tag"
                  name="username"
                />
              </InputGroup>

              <HStack>
                <PinInput
                  isInvalid={errors.password}
                  mask
                  size="lg"
                  value={data.password}
                  onChange={val => setData({ ...data, password: val })}
                  name="password"
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>

              <Spacer />
              <Button
                isLoading={isloading}
                loadingText="Verifying your credentials ..."
                onClick={handleLogin}
                colorScheme="blue"
                variant="outline"
                rightIcon={<ArrowForwardIcon />}
              >
                Login
              </Button>
              <Flex>
                <Spacer />
                <Text fontSize={14}>
                  Don't have an account?
                  <Link color="lightblue"> Join here</Link>
                </Text>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </form>
    </VStack>
  );
};

export default LoginPage;
