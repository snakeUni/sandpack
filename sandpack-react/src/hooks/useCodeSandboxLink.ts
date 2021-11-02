import type { SandpackBundlerFiles } from "@codesandbox/sandpack-client";
import { getParameters } from "codesandbox-import-utils/lib/api/define";
import { useState, useEffect, useCallback } from "react";

import type { SandboxEnvironment } from "../types";

import { useSandpack } from "./useSandpack";
const CSB_URL = "https://codesandbox.io/api/v1/sandboxes/define";

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

export const useCodeSandboxLink = (
  linkRef: HTMLAnchorElement | null
): string => {
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

  const createForm = useCallback(
    (event) => {
      if (!linkRef) return;

      event.preventDefault();

      const form = document.createElement("form");
      form.method = "POST";
      form.target = "_blank";
      form.action = CSB_URL;

      const parametersInput = document.createElement("input");
      parametersInput.type = "hidden";
      parametersInput.name = "parameters";
      parametersInput.value = paramsValues;

      form.append(parametersInput);
      linkRef.append(form);

      form.submit();
      form.remove();
    },
    [linkRef, paramsValues]
  );

  useEffect(() => {
    if (!linkRef) return;

    linkRef.addEventListener("click", createForm);

    return () => {
      linkRef.removeEventListener("click", createForm);
    };
  }, [createForm, linkRef]);

  return `${CSB_URL}?parameters=${paramsValues}&query=file=${sandpack.activePath}%26from-sandpack=true`;
};
