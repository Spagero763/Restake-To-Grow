"use client";

import { useState } from "react";
import { Rocket, Wallet, ChevronDown, LogOut, Network, Loader2, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppContext } from "@/contexts/app-context";
import { cn } from "@/lib/utils";

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground",
      className
    )}>
      {children}
    </Link>
  );
};


export function AppHeader() {
  const { isMock, setIsMock } = useAppContext();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const userAddress = "0x1234...AbCd";
  const currentNetwork = "Ethereum";

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const WalletButton = () => {
    if (isConnecting) {
      return (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </Button>
      );
    }

    if (isConnected) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Wallet className="mr-2 h-4 w-4" />
              <span>{userAddress}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Network className="mr-2 h-4 w-4" />
              <span>{currentNetwork}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDisconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button onClick={handleConnect}>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  };

  const navLinks = (
    <>
      <NavLink href="/" className="text-lg md:text-sm">Dashboard</NavLink>
      <NavLink href="/proposals" className="text-lg md:text-sm">Proposals</NavLink>
      <NavLink href="/docs" className="text-lg md:text-sm">Docs</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex h-16 items-center">
        <div className="flex items-center gap-6 md:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold md:text-xl">RestakeToGrow</h1>
          </Link>
        </div>

        <nav className="hidden md:flex justify-center items-center gap-6">
          {navLinks}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden items-center space-x-2 md:flex">
            <Switch
              id="dev-mode"
              checked={isMock}
              onCheckedChange={setIsMock}
            />
            <Label htmlFor="dev-mode">Dev Mode</Label>
          </div>
          <div className="hidden md:block">
            <WalletButton />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  <h1 className="text-xl font-bold">RestakeToGrow</h1>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks}
                </nav>
                <div className="border-t pt-6 space-y-6">
                  <WalletButton />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dev-mode-mobile">Dev Mode</Label>
                    <Switch
                      id="dev-mode-mobile"
                      checked={isMock}
                      onCheckedChange={setIsMock}
                    />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
