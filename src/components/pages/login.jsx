import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from 'components/redux/auth/authSlice';
import { selectAuthError } from 'components/redux/auth/authSelectors';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectAuthError);
  return (
    <>
      {isError ? (
        alert(isError)
      ) : (
        <Flex bg="gray.100" align="center" justify="center">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                dispatch(loginThunk(values));
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        placeholder="example@mail.com"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        autoComplete="off"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full">
                      Login
                    </Button>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        </Flex>
      )}
    </>
  );
};
export default Login;
