import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Navbar() {
  const [display, setDisplay] = useState("none");
  const navigate = useNavigate();

  return (
    <Box as="header" bg="blackAlpha.50">
      <Container as="nav" maxW="8xl">
        <HStack justifyContent="space-between" py={2}>
          <div>
            <Button
              colorScheme="teal"
              variant="link"
              onClick={() => navigate("/")}
            >
              <Text fontWeight="bold" pr={1} fontSize="xl">
                TETI
              </Text>
              <Text fontWeight="normal" pr={1} fontSize="xl">
                LIBRARY
              </Text>
            </Button>
            <Button
              colorScheme="teal"
              variant="link"
              p={4}
              display={{ base: "none", md: "inline-block" }}
              onClick={() => navigate("/my/books")}
            >
              My Books
            </Button>
          </div>

          <HStack>
            <Button
              colorScheme="teal"
              variant="solid"
              p={4}
              display={{ base: "none", md: "flex" }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>

            <IconButton
              aria-label="Open Menu"
              colorScheme="teal"
              size="md"
              mr={2}
              icon={<HamburgerIcon />}
              display={{ base: "flex", md: "none" }}
              onClick={() => setDisplay("flex")}
            />
          </HStack>
        </HStack>
      </Container>

      <Flex
        w="100vw"
        bgColor="whiteAlpha.800"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={8}
            aria-labels="Close Menu"
            size="md"
            icon={<CloseIcon />}
            onClick={() => setDisplay("none")}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Button
            colorScheme="teal"
            variant="link"
            p={4}
            onClick={() => navigate("/my/books")}
          >
            My Books
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            p={4}
            mt={2}
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
