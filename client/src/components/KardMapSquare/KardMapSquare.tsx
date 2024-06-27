import { Box, Image, Badge, Flex } from "@chakra-ui/react";

function KardMapSquare({ id, img, model, name, priceArea }) {
  return (
    <>
      <Box
        key={`${model}-${id}`}
        maxW="450"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mb="4"
        maxHeight="175px"
      >
        <Flex>
          <Image src={img} alt="Card image" boxSize="174px" objectFit="cover" />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {model}
              </Badge>
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              whiteSpace="normal"
              wordWrap="break-word"
              wordBreak="break-word"
              maxWidth="200px"
            >
              {name}
            </Box>
            <Box>
              {priceArea} руб/м.кв
              <Box as="span" color="gray.600" fontSize="sm"></Box>
            </Box>

            <Box d="flex" mt="2" alignItems="center"></Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default KardMapSquare;
