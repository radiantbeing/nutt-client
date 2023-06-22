import { useToast } from "@chakra-ui/react";

const useErrorToast = () => {
  const toast = useToast();
  const showErrorToast = (errorCode: string, errorMessage: string) => {
    if (!toast.isActive(errorCode)) {
      toast({
        id: errorCode,
        position: "top",
        title: errorCode,
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return showErrorToast;
};

export default useErrorToast;
