import { useClasser } from "@code-hike/classer";
import * as React from "react";

import { useSandpackTheme } from "../hooks/useSandpackTheme";
import { CSBIcon } from "../icons";
import { isDarkColor } from "../utils/stringUtils";

import { BareCodeSandboxButton } from "./BareCodeSandboxButton";

export const OpenInCodeSandboxButton: React.FC = () => {
  const { theme } = useSandpackTheme();
  const c = useClasser("sp");

  const csbIconClass = isDarkColor(theme.palette.defaultBackground)
    ? "csb-icon-dark"
    : "csb-icon-light";

  return (
    <BareCodeSandboxButton
      className={c("button", "icon-standalone", csbIconClass)}
    >
      <CSBIcon />
    </BareCodeSandboxButton>
  );
};
