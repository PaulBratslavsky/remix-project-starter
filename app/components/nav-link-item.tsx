import { cn } from "~/lib/utils";
import { NavLink } from "@remix-run/react";

function activeClassName({ isActive }: { isActive: boolean }) {
  return isActive ? "text-foreground" : "text-muted-foreground";
}

const linkStyle =
  "flex cursor-pointer items-center text-lg font-medium transition-colors hover:text-foreground sm:text-sm";

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  isExternal?: boolean;
}
export function NavLinkItem(props: Readonly<NavLinkItemProps>) {
  const { to, children, isExternal = false } = props;
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(linkStyle, activeClassName({ isActive }))}
      prefetch="intent"
      target={isExternal ? "_blank" : "_self"}
    >
      {children}
    </NavLink>
  );
}
