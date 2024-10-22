import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { RiAccountCircleLine } from "react-icons/ri";
import Brand from "../../ui/Brand";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Home",
    "Men",
    "Women",
    "Sports",
    "About",
    "Contact",
    // "Dashboard",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      className="bg-transparent p-1 z-[1]"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Brand logo={logo} className="flex ml-4 sm:ml-0 items-center justify-center"/>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex sm:ml-14 gap-5 text-primaryColor font-medium lg:flex lg:gap-8"
        // justify="center"
      >
        <NavbarItem>
          <Link
            to="/"
            className="text-textColor lg:text-[1.1rem] opacity-[.9] hover:opacity-[1] cursor-pointer"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            to="/products"
            aria-current="page"
            className="text-textColor lg:text-[1.1rem] opacity-[.9] hover:opacity-[1] cursor-pointer"
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-textColor lg:text-[1.1rem] opacity-[.9] hover:opacity-[1] cursor-pointer"
            to="/contact"
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="lg:flex lg:gap-5">
        <NavbarItem className="lg:flex ml-10 mr-1 items-center">
          <Link to="/search">
          <IoSearch
            strokeWidth={2}
            className="text-textColor opacity-[.9] hover:opacity-[1] cursor-pointer text-3xl font-semibold"
          />
          </Link>
        </NavbarItem>
        {isAuthenticated && (
          <NavbarItem className="hidden lg:flex ml-1 mr-1 items-center">
           <Link to="/cart">
           <LocalMallRoundedIcon
              strokeWidth={1}
              className="text-textColor opacity-[.9] hover:opacity-[1] cursor-pointer text-3xl font-bold"
              fontSize="28px"
            />
           </Link>
          </NavbarItem>
        )}
        {isAuthenticated && (
          <NavbarItem className="hidden lg:flex ml-1 mr-1 items-center">
           <Link to="/account">
           <RiAccountCircleLine
              strokeWidth={0.5}
              className="text-textColor opacity-[.9] hover:opacity-[1] cursor-pointer text-3xl font-semibold"
            />
           </Link>
          </NavbarItem>
        )}
        {/* <NavbarItem className="hidden lg:flex">    color={"#727472"}
          <Link to="/login" className='text-white bg-primaryColor rounded-xl text-center py-2 px-4 font-medium hover:bg-[#FFD700]'>Login</Link>
        </NavbarItem> */}

        {!isAuthenticated && (
          <NavbarItem>
            <Link
              to="/login"
              className="bg-accentColor rounded-xl text-center py-2 px-4 text-white font-medium hover:bg-[#FF3C00]"
            >
              Login
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              to="/"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
