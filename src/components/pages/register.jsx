import { Formik, Field, Form } from 'formik';
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
import { registerThunk } from 'components/redux/auth/authSlice';
import { selectAuthError } from 'components/redux/auth/authSelectors';
import ErrorComponent from 'components/onError/onError';

const SigninSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Registration = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectAuthError);
  return (
    <main>
      {isError ? (
        <ErrorComponent />
      ) : (
        <Flex bg="gray.100" align="center" justify="center">
          <Box bg="white" p={6} rounded="md" w={64}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              validationSchema={SigninSchema}
              onSubmit={(values, { resetForm }) => {
                dispatch(registerThunk(values));
                resetForm();
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="flex-start">
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        type="text"
                        variant="filled"
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        placeholder="example@mail.com"
                      />
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
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      )}
    </main>
  );
};
export default Registration;
