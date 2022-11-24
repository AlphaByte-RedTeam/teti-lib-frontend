import { Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlinePhoto, HiTrash } from "react-icons/hi2";
import { RenderIf } from "./RenderIf";
import { useFileUpload } from "use-file-upload";
import { uploadImage } from "@/utils/services/imagekit/uploadImage";

export function ImageUpload({ setIsImageLoading, setImageUrl }) {
  const [_, selectImage] = useFileUpload();
  const [image, setImage] = useState(null);

  const removeImageHandler = () => {
    setImage(null);
    setImageUrl(null);
    setIsImageLoading(true);
  };

  return (
    <VStack justifyContent="center" w="full" h="full">
      <RenderIf when={!image}>
        <Center
          border={1}
          borderStyle="dashed"
          borderRadius="2xl"
          borderColor="gray.500"
          w="full"
          h="full"
          cursor="pointer"
          minH="240px"
          onClick={() => {
            // Single File Upload accepts only images
            setIsImageLoading(true);
            selectImage({ accept: "image/*" }, (image) => {
              setImage(image);
              uploadImage(image.file).then((url) => {
                setImageUrl(url);
                console.log("image uploaded with url:", url);
                setIsImageLoading(false);
              });
            });
          }}
        >
          <VStack spacing={-2}>
            <HiOutlinePhoto style={{ height: "120px", width: "100%" }} />
            <Text>
              Click to <strong>Select Image</strong>
            </Text>
          </VStack>
        </Center>
      </RenderIf>

      <RenderIf when={image}>
        <Image
          src={image?.source}
          rounded="md"
          border={1}
          borderStyle="solid"
          borderColor="gray.200"
        ></Image>
        <Button
          leftIcon={<HiTrash />}
          onClick={removeImageHandler}
          size="sm"
          colorScheme="red"
          variant="outline"
        >
          Clear Image
        </Button>
      </RenderIf>
    </VStack>
  );
}
