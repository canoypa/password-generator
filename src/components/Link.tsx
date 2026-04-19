import { Link as MuiLink } from "@mui/material";
import type { FC, HTMLAttributeAnchorTarget, ReactNode } from "react";

type LinkProps = {
  href: string;
  target?: HTMLAttributeAnchorTarget;
  children?: ReactNode;
};
export const Link: FC<LinkProps> = ({ href, target, children }) => {
  return (
    <MuiLink component="a" href={href} target={target} underline="hover">
      {children}
    </MuiLink>
  );
};
