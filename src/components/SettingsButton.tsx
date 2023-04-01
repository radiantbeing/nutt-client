import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export default function PreviousButton() {
  return (
    <IconButton
      aria-label="Go to settings page."
      icon={<SettingsIcon />}
      backgroundColor="transparent"
    />
  );
}
