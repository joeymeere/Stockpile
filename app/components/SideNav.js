import React from 'react';
import Link from "next/link";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStockpile } from './Context';


const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.orange[2]
        : theme.colors.orange[1],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.orange[2]
          : theme.colors.orange[1],
    },
  },

  //hover colors

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.colors.orange[1],
      }).background,
      color: theme.colors.orange[1],
    },
  },
}));

const NavItem = ({ icon, label, onClick, route, active }) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={250}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })} 
        style={{
          backgroundColor: active ? theme.fn.variant({
            variant: "light",
            color: theme.colors.orange[1],
          }).background : '',
        }}
      >
        <Image
          src={`/side_nav/${icon ?? route}.svg`}
          alt=""
          width={50}
          height={50}
        />
      </UnstyledButton>
    </Tooltip>
  );
};

function NavbarLink({ icon, label, route, active }) {
  return (
    <Link
      href={{
        pathname: `/${route}`,
      }}
    >
      
        <NavItem icon={icon} label={label} route={route} active={active} />
      
    </Link>
  );
}

const navItems = [
  {
    label: "Explore",
    route: "explore",
  },
  {
    label: "Dashboard",
    route: "dashboard",
  },
  {
    label: "Create a Fundraiser",
    route: "create",
  },
  {
    label: "About",
    route: "about",
  },
];

const SideNav = () => {
  const router = useRouter();
  const { publicKey, initialized, setInitialized } = useStockpile();
  const { setVisible } = useWalletModal();
  const { connected, disconnect } = useWallet();

  const links = navItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={router.pathname.includes(link.route)}
    />
  ));

  const connectWallet = () => {
    setVisible(true)
  };

  const disconnectWallet = () => {
    disconnect();
    setInitialized(false);
  };

  return (
    <>
      <div className="max-w-xs fixed">
        <Navbar width={{ base: 80 }} p="md">
          <Center>
            <Image src="/logo.svg" alt="Stockpile" width={45} height={45} />
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={4}>
              {links}
              {initialized ? (
                 <Link
                    href={{
                      pathname: `/user`,
                    }}
                  >
                    <NavItem
                    label="Manage User"
                    icon="user"
                    route="user"
                    />
                </Link>
              ) : (
                <div></div>
              )}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
            {connected ? (
                 <NavItem
                 label="Disconnect Wallet"
                 icon="disconnect"
                 onClick={() => disconnectWallet()}
                 />
            ) : (
                <NavItem
                label="Connect Wallet"
                icon="wallet"
                onClick={()=> connectWallet()}
                />
            )}
            </Stack>
          </Navbar.Section>
        </Navbar>
      </div>
    </>
  );
};

export default SideNav;
