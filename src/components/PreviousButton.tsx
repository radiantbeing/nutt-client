import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PreviousButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <IconButton
      aria-label="Go to previous page."
      icon={<ChevronLeftIcon />}
      backgroundColor="transparent"
      onClick={handleClick}
    />
  );
}
