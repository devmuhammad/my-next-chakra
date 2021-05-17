import { useColorMode, IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      position="fixed"
      top="1rem"
      right="1rem"
      zIndex="modal"
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
    />
    
  )
}
