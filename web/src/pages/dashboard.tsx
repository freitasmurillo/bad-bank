import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import Navbar from "../components/NavBar";
import { useBankAccountQuery } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorsMap";

const Index = () => {
  const [{ data }] = useBankAccountQuery({
    variables: { bankAccountId: "62a7a8e8fa28e56fb2d4df3d" },
  });

  const [, setTabIndex] = React.useState(0);

  return (
    <>
      <Navbar></Navbar>
      <Container height="100vh">
        <Hero title="Check out your Bank Acc Info" />
        <Main>
          <Flex bg="white.100" align="center" justify="center" h="100vh">
            <Box bg="white" rounded="md" w="100vh" h="40vh">
              <Tabs
                isFitted
                size="lg"
                align="center"
                variant="enclosed"
                defaultIndex={1}
              >
                <TabList>
                  <Tab>New Operation</Tab>
                  <Tab>Statments</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Formik
                      initialValues={{}}
                      onSubmit={async (values, { setErrors }) => {
                        console.log({values})
                        // const { error } = await login(values);

                        // if (error?.graphQLErrors) {
                        //   setErrors(toErrorMap(error.graphQLErrors));
                        //   return;
                        // }

                        setTabIndex(1);
                      }}
                    >
                      {({ isSubmitting, handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                          <VStack spacing={4} align="flex-start">
                            <FormControl>
                              <FormLabel htmlFor="operationType">
                                Operation
                              </FormLabel>
                              <Field
                                as={Select}
                                id="operationType"
                                name="operationType"
                                type="operationType"
                                placeholder='Select the desired operation type' 
                              >
                                <option value='deposit'>Deposit</option>
                                <option value='withdraw'>WithDraw</option>
                              </Field>
                            </FormControl>
                            <FormControl>
                              <FormLabel htmlFor="amount">Amount</FormLabel>
                              <AddIcon />
                              <MinusIcon />
                              <Field
                                as={Input}
                                id="amount"
                                name="amount"
                                type="number"
                                variant="filled"
                              />
                            </FormControl>
                            <Button
                              type="submit"
                              isLoading={isSubmitting}
                              colorScheme="purple"
                              width="full"
                            >
                              Make new operation
                            </Button>
                          </VStack>
                        </form>
                      )}
                    </Formik>
                  </TabPanel>
                  <TabPanel>
                    <TableContainer>
                      <Table variant="striped" colorScheme="green" size="lg">
                        <Thead>
                          <Tr>
                            <Th scope="col">Transaction Id</Th>
                            <Th scope="col">Transaction Type</Th>
                            <Th scope="col">Amount</Th>
                            <Th scope="col">Description</Th>
                            <Th scope="col">Balance</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {!data?.bankAccount
                            ? null
                            : data?.bankAccount.statments.map(
                                ({
                                  id = "a",
                                  operationType,
                                  amount,
                                  description,
                                }: any) => (
                                  <Tr key={id}>
                                    <Td>{id + 1}</Td>
                                    <Td>{operationType}</Td>
                                    <Td>{amount}</Td>
                                    <Td>{description}</Td>
                                    <Td>user.balance?</Td>
                                  </Tr>
                                )
                              )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>
        </Main>
        <DarkModeSwitch />
      </Container>
    </>
  );
};

export default Index;
