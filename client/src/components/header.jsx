import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Menu, LogOut, HousePlug, ShoppingCart, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black sticky top-0 w-full text-white z-50">
      {/* Left: Logo */}
      <div
        className=" flex  gap-2 text-xl font-bold cursor-pointer"
        onClick={() => navigate("/shop/home")}
      >
        <HousePlug className="h-6 w-6" /> Ecommerce
      </div>

      {/* Center: Menu Items (visible on medium+ screens) */}
      <div className="hidden md:flex space-x-3 absolute left-1/2 transform -translate-x-1/2">
        <Button variant="ghost" className="!mr-0">
          Home
        </Button>
        <Button
          variant="ghost"
          className="!mr-0 cursor-pointer"
          onClick={() => navigate("/shop/listing")}
        >
          Products
        </Button>
        <Button variant="ghost" className="!mr-0">
          Men
        </Button>
        <Button variant="ghost" className="!mr-0">
          Women
        </Button>
        <Button variant="ghost" className="!mr-0">
          Kids
        </Button>
        <Button variant="ghost" className="!mr-0">
          Footwear
        </Button>
        <Button variant="ghost" className="!mr-0">
          Accessories
        </Button>
        <Button variant="ghost" className="!mr-0">
          Search
        </Button>
      </div>

      {/* Right side: Logout (desktop) and Hamburger (mobile) */}
      <div className="flex items-center gap-4">
        {/* Logout button for desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ShoppingCart />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token"), navigate("/");
                }}
              >
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader />
              <div className="flex flex-col space-y-4 mt-4">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Home
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Gallery
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  About
                </Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Services
                </Button>
              </div>
              <SheetFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 w-full"
                  onClick={() => {
                    localStorage.removeItem("token"), navigate("/");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
