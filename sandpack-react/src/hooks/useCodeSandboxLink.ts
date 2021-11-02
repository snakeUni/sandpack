import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { getParameters } from "codesandbox-import-utils/lib/api/define";
import { useState, useEffect } from "react";

import type { SandboxEnvironment } from "../types";

import { useSandpack } from "./useSandpack";

const getFileParameters = (
  files: SandpackBundlerFiles,
  environment?: SandboxEnvironment
) => {
  type NormalizedFiles = Record<
    string,
    {
      content: string;
      isBinary: boolean;
    }
  >;

  const normalizedFiles = Object.keys(files).reduce((prev, next) => {
    const fileName = next.replace("/", "");
    const value = {
      content: files[next].code,
      isBinary: false,
    };

    return { ...prev, [fileName]: value };
  }, {} as NormalizedFiles);

  return getParameters({
    files: normalizedFiles,
    ...(environment ? { template: environment } : null),
  });
};

export const useCodeSandboxLink = (): string => {
  const [paramsValues, setParamsValues] = useState("");
  const { sandpack } = useSandpack();

  useEffect(
    function debounce() {
      const timer = setTimeout(() => {
        const params = getFileParameters(sandpack.files, sandpack.environment);

        setParamsValues(params);
      }, 600);

      return () => {
        clearTimeout(timer);
      };
    },
    [sandpack.environment, sandpack.files]
  );

  // Register the usage of the codesandbox link
  useEffect(function registerUsage() {
    sandpack.openInCSBRegisteredRef.current = true;
  }, []);

  return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${paramsValues}&query=file=${sandpack.activePath}%26from-sandpack=true`;
};
