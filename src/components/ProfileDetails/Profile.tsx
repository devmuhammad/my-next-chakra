import React, { useEffect, useState } from "react";
import { Heading, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import RecentPayments from "./RecentPays";
import { motion } from "framer-motion";


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
      <motion.div
          transition={{ duration: 2.5 }}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 120, 120, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        >
        <Image
          boxSize="100px"
          borderRadius="xl"
          objectFit="cover"
          src="/images/avatars/avatar-2.png"
          alt="profile Image"
        />
        </motion.div>

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
