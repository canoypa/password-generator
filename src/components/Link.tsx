import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { FC, HTMLAttributeAnchorTarget, ReactNode } from "react";

type LinkProps = {
  href: string;
  target?: HTMLAttributeAnchorTarget;
  children?: ReactNode;
};
export const Link: FC<LinkProps> = ({ href, target, children }) => {
  return (
    <NextLink href={href} passHref>
      <MuiLink target={target} underline="hover">
        {children}
      </MuiLink>
    </NextLink>
  );
};
