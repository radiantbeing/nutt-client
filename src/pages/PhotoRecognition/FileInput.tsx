import {
  FormControl,
  Input,
  Image,
  FormLabel,
  Icon,
  Button,
  Spacer,
  Text,
  Center,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DETECTED_FOODS } from "../../store/reducers/DetectedFoodsReducer";
import { DETECTING_IMAGE } from "../../store/reducers/DetectingImage";

export default function FileInput() {
  const dispatch = useDispatch();
  const [imgFile, setImgFile] = useState<null | string | ArrayBuffer>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files?.length > 0
    ) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    }
  };

  return (
    <>
      <form>
        <FormControl>
          <FormLabel
            width="full"
            borderRadius="lg"
            padding={4}
            backgroundColor="gray.100"
            fontWeight="semibold"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
          >
            <Icon as={MdOutlineFileUpload} /> 이미지 업로드
          </FormLabel>
          <Input
            type="file"
            ref={imgRef}
            onChange={saveImgFile}
            display="none"
          />
          <Center
            padding={2}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius="lg"
          >
            {!imgFile ? (
              <VStack paddingTop={8} paddingBottom={8} spacing={4}>
                <Spinner />
                <Text>업로드 대기 중</Text>
              </VStack>
            ) : (
              <Image src={imgFile as string} />
            )}
          </Center>
        </FormControl>
      </form>
      <Spacer />
      <Button
        type="submit"
        colorScheme="green"
        size="lg"
        onClick={() => {
          const formData = new FormData();
          formData.append("image", imgFile as string);

          dispatch({
            type: DETECTING_IMAGE,
            payload: { image: imgFile as string },
          });

          axios({
            method: "post",
            url: `${process.env.REACT_APP_PHOTO_DETECTION_URL}/predict`,
            data: {
              file: imgFile,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((res) => {
            const { data } = res;
            dispatch({
              type: DETECTED_FOODS,
              payload: data,
            });
            navigate("/analysis");
          });
        }}
      >
        전송
      </Button>
    </>
  );
}
