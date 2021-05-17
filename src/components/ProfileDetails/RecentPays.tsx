import React, { useEffect, useState } from "react";
import { VStack, Text, Button,Image, Heading, HStack, Flex, useColorModeValue } from "@chakra-ui/react";

interface PayDetails {
  tx_ref: string,
  transaction_date: Date,
  amount: string;
  status: string;
}

const RecentPayments = (props: any) => {
  const { recentTx } = props
  const headCol = useColorModeValue("brand_purple.200", "brand_purple.100");
  const [payments, setPayments] = useState(recentTx);
  useEffect(() => {
    setPayments(recentTx)
    return () => {
      
    }
  }, [recentTx])

  return (
    <Flex pl="2" direction='column'>
      <Text color={headCol} fontSize="sm">
        RECENT TRANSACTIONS
      </Text>
      <VStack h="full" w="full" pt="3" bg="transparent" spacing={3}>
        {payments.length >= 1 ? payments.map((payment: PayDetails) => (
          <HStack key={payment.tx_ref} w="full" bg="brand_purple.400"  justifyContent='space-between' p="2" borderRadius='lg'>
            <div>
              <Heading color="white" fontSize="md">
                {payment.tx_ref}
              </Heading>
              <Text color="brand_purple.100" fontSize="sm">
                {payment.transaction_date.toDateString()}
              </Text>
            </div>

            <div>
              <Heading color="white" fontSize="md">
                {"₦" + payment.amount}
              </Heading>
              {payment.status === 'SUCCESS' ? 
                <Button colorScheme="green" size="xs">
                    {payment.status}
                </Button>
                : <Button colorScheme="red" size="xs">
                    {payment.status}
              </Button>
              }
            </div>
          </HStack>
        ))
      : <>
      <Image src="/images/NoCreditCard.png" boxSize="200"/>
      <Heading fontSize="md" color="brand_purple.200"> No recent transaction</Heading>
      </>}
      </VStack>
    </Flex>
  );
};

export default RecentPayments;
