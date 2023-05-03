import { IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { FiMoreVertical } from "react-icons/fi";

type MoreMenuButtonProps = {
  isMoreMenuVisible?: boolean;
};

const MoreMenuButton: FC<MoreMenuButtonProps> = ({ isMoreMenuVisible }) => {
  if (!isMoreMenuVisible) return null;
  return (
    <IconButton
      aria-label="Go to settings page."
      icon={<FiMoreVertical />}
      backgroundColor="transparent"
    />
  );
};
export default MoreMenuButton;
