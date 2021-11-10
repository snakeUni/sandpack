import { Box, Resources, SandpackLogo, Text } from "../common";
import { Install } from "../common/Install";

export const Banner: React.FC = () => {
  return (
    <Box
      css={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "48px",
      }}
    >
      <Box
        css={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Box css={{ width: "60px", "@bp1": { width: "100px" } }}>
          <SandpackLogo theme="light" />
        </Box>
        <Text
          as="h1"
          css={{
            fontWeight: "$semiBold",
            fontSize: "36px",
            lineHeight: "100%",
            textAlign: "center",
            letterSpacing: "-0.05em",

            "@bp1": {
              fontSize: "72px",
            },

            "@bp2": {
              fontSize: "96px",
              maxWidth: "58%",
            }
          }}
        >
          Get started with Sandpack.
        </Text>
      </Box>
      <Install />
      <Resources />
    </Box>
  );
};