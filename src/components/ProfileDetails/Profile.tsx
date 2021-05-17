import React, { useEffect, useReducer, useState } from "react";
import { Heading, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import RecentPayments from "./RecentPays";
import { RootState } from "store/reducers";
import { useSelector } from 'react-redux'

interface ProfileDetail {
        agentname: string,
        transactions: number,
        totalAmount: number,
        recentTx:[]
}

const Profile = (props: any) => {
    const headCol = useColorModeValue("brand_purple.200", "brand_purple.100");
    // const agentDetails = useSelector((state: RootState) => state.payments.agentDetails )
    const { agentDetails } = props
    const [profileDetail, setDetail] = useState<ProfileDetail>(agentDetails);
  useEffect(() => {
      setDetail(agentDetails)
      return () => {
          
      }
  }, [agentDetails,profileDetail])
  return (
    <>
      <HStack spacing={5} py={3} alignItems="center">
        <Image
          boxSize="100px"
          borderRadius="xl"
          objectFit="cover"
          src="/images/avatars/avatar-2.png"
          alt="profile Image"
        />

        <VStack spacing={1} alignItems="flex-start">
          <Heading fontSize="xl">{profileDetail.agentname}</Heading>
          <Text fontSize="sm" color={headCol}>
            {profileDetail.transactions} transactions
          </Text>
          <Text fontSize="sm" color={headCol}>
            {"₦" + profileDetail.totalAmount.toLocaleString()} processed
          </Text>
        </VStack>
      </HStack>
      <RecentPayments recentTx={profileDetail.recentTx} />
    </>
  );
};

export default Profile;
