import React, { useEffect, useReducer, useState } from "react";
import {
  FormControl,
  FormLabel,
  Text,
  FormHelperText,
  Input,
  HStack,
  Heading,
  Stack,
  InputLeftElement,
  InputGroup,
  Select,
  Button,
  Image,
} from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react"
import { useSelector } from 'react-redux'
import { isEmailValid } from "helpers";
import { RootState } from "store/reducers";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { FWConfig } from 'config'
import uuid from 'react-uuid';
import { UpdateAgentPayments } from "store/actions/payments";
import { useDispatch } from 'react-redux'
import { useRef } from "react";

interface PayDetails {
      customer: string,
      learner: string,
      phone: string,
      email: string,
      grade_group: any,
      subscription: any,
      agent: string
}

export const ApplicationForm = (props: any) => {
  const dispatch = useDispatch()
  const {setAgentDetail} = props

  const [title] = useState("Telesales Payment Portal");
  const [isLoading, setLoading] = useState(false)
  const [formError, setError] = useState('Invalid Input !')
  const [hasInvalid, setHasErr] = useState(false)
  const [grades, setGrades] = useState([])
  const [plans, setPlans] = useState([])
  const allGrades = useSelector((state: RootState) => state.defaults.allGradesNgn) 
  const allPlans = useSelector((state: RootState) => state.defaults.allPlansNgn)
  const agentDetails = useSelector((state: RootState) => state.payments.agentDetails)
  const [profileDet, setProfile] = useState(agentDetails)
  const fw = FWConfig 
  const [paymentDetails, setDetails] = useState<PayDetails>({
      customer: '',
      learner: '',
      phone: '',
      email: '',
      grade_group:{},
      subscription: {},
      agent: ''
  })
  const toast = useToast()
  const clearRef = useRef<HTMLInputElement>()

  useEffect(() => {
      setGrades(allGrades)
      setPlans(allPlans)
      
      return () => {
          
      }
  }, [allGrades,allPlans])

  useEffect(() => {
      setProfile(agentDetails)
      return () => {
          
      }
  }, [agentDetails])

  const showPaymentSuccessful = () => {
    toast({
        title: "Payment Successful",
        description: "Subscription has been activated !",
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: 'left-accent',
        position:'top-left'
      })
  }

  const showPaymentFailed = () => {
    toast({
        title: "Payment Failed",
        description: "Subscription could not be activated !",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: 'left-accent',
        position:'top-left'
      })
  }

  const clearInputs = () => {
    clearRef.current!.value = ''

    // setDetails({
    //     customer: '',
    //     learner: '',
    //     phone: '',
    //     email: '',
    //     grade_group:{},
    //     subscription: {},
    //     agent: '' 
    // })
  }

  const handleInputChange = (e:any) => {
    setHasErr(false)
    
    let targValue = e.target.value
    if (e.target.name === 'phone'){
       return setDetails({ ...paymentDetails, [e.target.name]:'+234'+e.target.value})
    }
    setDetails({
        ...paymentDetails, [e.target.name]: targValue
    })
  }

  const handleSelectChange = (e:any) => {
    setHasErr(false)
    setDetails({
        ...paymentDetails, [e.target.name]: JSON.parse(e.target.value)
    })
    
  }

  const isInputValid = () =>{
      let valid = false
      if (paymentDetails.customer === '') {
          setError('Enter customer name');
          setHasErr(true); return !!valid
        }
      if (paymentDetails.phone === '' ) {
          setError('Enter valid phone number');
          setHasErr(true); return !!valid
        }
      if (paymentDetails.email === '' || !isEmailValid(paymentDetails.email)) {
          setError('Enter valid email');
          setHasErr(true); return !!valid
        }
      if (paymentDetails.agent === '' ) {
          setError('Enter agent name');
          setHasErr(true); return !!valid
        }
      if (!paymentDetails.grade_group ) {
          setError('Select a grade');
          setHasErr(true); return !!valid
        }
      if (!paymentDetails.subscription ) {
          setError('Select a subscription');
          setHasErr(true); return !!valid
        }
      valid = true
      return !!valid
  }

  const handleFlutterPayment = useFlutterwave(fw);


  const handleSubmit = () => {
    setHasErr(false)
    
    const inputValid = isInputValid()
    if(!inputValid) return;

      setLoading(true)
        fw.amount = paymentDetails.subscription['amount_ngn']
        fw.customer.name = paymentDetails.customer;
        fw.customer.email = paymentDetails.email;
        fw.customer.phonenumber = paymentDetails.phone;
        fw.tx_ref = uuid()
        fw.customizations.title = paymentDetails.subscription['display_name']+' plan'

        handleFlutterPayment({
            callback: async(response) => {
                if (response.status === 'successful'){
                  closePaymentModal();
                  let agentDet = profileDet;
                  
                  const nwTx = {
                    tx_ref: response.transaction_id,
                    transaction_date: new Date(Date.now()),
                    amount: response.amount,
                    status:'SUCCESS'
                  }
                  agentDet.recentTx.push(nwTx)
                  agentDet.transactions = agentDet.recentTx.length
                  const successfulDetails = agentDet.recentTx.filter((item:any)=> item.status === 'SUCCESS')
                  agentDet.totalAmount =  successfulDetails.reduce((sum: number, item: any) => {
                    return sum + item.amount
                    }, 0)
                  dispatch(UpdateAgentPayments(agentDet))
                  setAgentDetail(agentDet)
                  setLoading(false)
                  showPaymentSuccessful()
                //   clearInputs()
                // transaction_id,tx_ref,amount,currency, send to backend for verification
                // const transactionVerified = await completeTransaction({
                //   tx_ref: response.tx_ref,
                //   fw_id: response.transaction_id, 
                //   authToken:props.authToken}).then(resp => resp);
                
                // setConfirmed(false);
                // if (transactionVerified.status === 'success'){
                // }
                }else {
                    closePaymentModal();
                    let agentDet = profileDet;
                    const nwTx = {
                      tx_ref: response.transaction_id,
                      transaction_date: new Date(Date.now()),
                      amount: response.amount,
                      status:'FAILED'
                    }
                    agentDet.recentTx.push(nwTx)
                    agentDet.transactions = agentDet.recentTx.length
                    dispatch(UpdateAgentPayments(agentDet))
                    setAgentDetail(agentDet)
                    setLoading(false)
                    showPaymentFailed()
                }
                    
            },
            onClose: () => {
              setLoading(false)
              closePaymentModal();
            },
          });
  }

  return (
    <Stack spacing={5}>
      <HStack spacing={5}>
        <div>
          <Image
            boxSize="100px"
            objectFit="cover"
            src="/images/logo-purple-150x150.png"
            alt="uLesson Logo"
          />
        </div>
        <Heading fontSize="2xl" pb={5}>
          {title}
        </Heading>
      </HStack>
      <FormControl id="customer-name" isRequired>
        <FormLabel>Customer Name</FormLabel>
        <Input
          focusBorderColor="brand_purple.700"
          placeholder="Kola Alao"
          name="customer"
        //   ref={clearRef}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="learner-name">
          <FormLabel>Learner Name</FormLabel>
          <Input
            focusBorderColor="brand_purple.700"
            placeholder="If different"
            name="learner"
            onChange={handleInputChange}
          />
        </FormControl>
      <HStack spacing={5}>
        <FormControl id="email">
          <FormLabel>E-mail</FormLabel>
          <Input
            focusBorderColor="brand_purple.700"
            placeholder="test@test.com"
            name="email"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="phone" isRequired>
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <InputLeftElement
              
              pointerEvents="none"
              children={<PhoneIcon color="gray.400" />}
            />
            <Input type="tel"
            focusBorderColor="brand_purple.700"
            maxLength={10}
            name="phone"
            placeholder="8080808080" 
            onChange={handleInputChange}/>
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack spacing={5}>
        <FormControl id="grade-group" isRequired>
          <Select
            placeholder="Grade group"
            onChange={handleSelectChange}
            //   bg="brand_purple.100"
            name="grade_group"
            focusBorderColor="brand_purple.700"
          >
            {grades.map((grade:any) => (
            <option key={grade.id} value={JSON.stringify(grade)}>
                {grade.display_name}
            </option>))}
            
          </Select>
        </FormControl>
        <FormControl id="subscription" isRequired>
        <Select
          placeholder="Subscription"
          onChange={handleSelectChange}
          name="subscription"
          focusBorderColor="brand_purple.700"
        >
           {plans.map((plan:any) => (
            <option key={plan.id} value={JSON.stringify(plan)}>
                {plan.display_name}
            </option>))}
        </Select>
        </FormControl>
      </HStack>

      <FormControl id="agent" isRequired>
        <FormLabel>Agent Name</FormLabel>
        <Input
          focusBorderColor="brand_purple.700"
          placeholder="Moh Olawale"
          name="agent"
          onChange={handleInputChange}
        />
      </FormControl>
      {hasInvalid && <Text fontSize='xs' color='red.500'>{formError}</Text>}
      
      <HStack pt="5" float="right" justifyContent="flex-end">
        <Button colorScheme="brand_purple" size="md"
        isLoading={isLoading}
        loadingText="Processing"
        spinnerPlacement="start"
        onClick={handleSubmit}>
          Process
        </Button>
      </HStack>
    </Stack>
  );
};

export default ApplicationForm;
