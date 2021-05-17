import { useEffect, useState } from 'react'
import {
  GridItem,
  useColorModeValue,
} from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Main } from '../components/Main'
import ApplicationForm from 'components/Form/Form'
import { HandBg } from 'components/HandBg'
import Profile from 'components/ProfileDetails/Profile'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { fetchAllPlans, fetchAppConfigs } from 'store/actions'

const Index = () => {
  const grdBG = useColorModeValue("white", "brand_purple.300");
  const grd2BG = useColorModeValue("brand_purple.800", "brand_purple.300");
  const grd2Col = useColorModeValue("gray.100", "gray.900");
  const grd1Col = useColorModeValue("gray.700", "gray.900")
  const [agentDet, setAgentDet] = useState({
    agentname: 'Moh Olawale',
    transactions: 0,
    totalAmount: 0,
    recentTx:[
      // {
      //   tx_ref: 'ffe0cd5-13fe-805c-fee4-a604e856a0',
      //   transaction_date: new Date(1621260808501),
      //   amount: 22000,
      //   status:'SUCCESS'
      // }
    ]
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppConfigs());
    dispatch(fetchAllPlans());

    return () => {};
  }, []);
  
  return (
    <Container height="100vh">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Main>
        <GridItem
          colSpan={{lg:3, sm:3}}
          h="full"
          bg={grdBG} 
          color={grd1Col}
          zIndex="overlay"
          p="5"
          px={{lg:"10", sm:'5'}}
          borderRadius="2xl"
        >
          <ApplicationForm setAgentDetail={setAgentDet} />
        </GridItem>

        <GridItem 
          colSpan={{lg:2, sm:3}}
          h="full" 
          color={grd2Col}
          bg={grd2BG} 
          zIndex="overlay"
          p="5" 
          borderRadius="2xl">
          <Profile agentDetails={agentDet} />
        </GridItem>
        <HandBg />
        <DarkModeSwitch />
      </Main>
      </motion.div>
    </Container>
  );
}

export default Index
