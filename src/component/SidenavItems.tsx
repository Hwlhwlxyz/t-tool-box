import { Flex, Text, Link, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export interface SidenavItem {
  icon: any;
  label: string;
  to: string;
}

export interface SidenavItemsProps {
  navItems: SidenavItem[];
  mode?: "semi" | "over";
}

export function SidenavItems({ navItems }: SidenavItemsProps) {
  const sidebarItemInOverMode = (item: SidenavItem, index: number) => (
    <Stack spacing="24px" key={index}>
      <Link
        // display="block"
        as={NavLink}
        to={item.to}
        _focus={{ bg: "gray.100" }}
        _hover={{
          bg: "gray.200",
        }}
        bg={"blue.100"}
        _activeLink={{ bg: "orange.500", color: "white" }}
        w="90px"
        borderRadius="md"
        display={"flex"}
      >
        <Flex alignItems="center" p={2}>
          {/* <Icon boxSize="5" as={item.icon} /> */}
          <Text ml={2}>{item.label}</Text>
        </Flex>
      </Link>
    </Stack>
  );
  return (
    <Stack
      direction={{ base: "row", md: "column" }}
      float={{ base: "none", md: "left" }}
      spacing={3}
    >
      {navItems.map((item, index) => sidebarItemInOverMode(item, index))}
    </Stack>
  );
}

export default SidenavItems;
