"use client";

import { SunIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Select, Text } from "@radix-ui/themes";
import {
  ThemeAccentColor,
  ThemeAppearance,
  useThemeContext,
} from "./ThemeProvider";

const themes = [
  { label: "Iris", value: "iris", colorCode: "#5a4fcf" },
  { label: "Indigo", value: "indigo", colorCode: "#4b0082" },
  { label: "Violet", value: "violet", colorCode: "#8a2be2" },
  { label: "Green", value: "green", colorCode: "#008000" },
  { label: "Grass", value: "grass", colorCode: "#7cfc00" },
  { label: "Cyan", value: "cyan", colorCode: "#00ffff" },
  { label: "Blue", value: "blue", colorCode: "#0000ff" },
  { label: "Brown", value: "brown", colorCode: "#a52a2a" },
  { label: "Crimson", value: "crimson", colorCode: "#dc143c" },
  { label: "Tomato", value: "tomato", colorCode: "#ff6347" },
  { label: "Teal", value: "teal", colorCode: "#008080" },
  { label: "Ruby", value: "ruby", colorCode: "#e0115f" },
  { label: "Red", value: "red", colorCode: "#ff0000" },
  { label: "Orange", value: "orange", colorCode: "#ffa500" },
  { label: "Jade", value: "jade", colorCode: "#00a86b" },
  { label: "Plum", value: "plum", colorCode: "#dda0dd" },
  { label: "Purple", value: "purple", colorCode: "#800080" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <Dialog.Root>
      <Dialog.Trigger className="!cursor-pointer">
        <SunIcon height="1.3rem" width="1.3rem" />
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Choose Theme</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Choose Mode and Color theme
        </Dialog.Description>

        <Flex gap="3">
          <Select.Root
            defaultValue={theme.mode}
            onValueChange={(mode: ThemeAppearance) => {
              setTheme((theme) => ({ ...theme, mode }));
            }}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Modes</Select.Label>
                <Select.Item value="light">Light Mode</Select.Item>
                <Select.Item value="dark">Dark Mode</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Select.Root
            defaultValue={theme.accent}
            onValueChange={(accent: ThemeAccentColor) => {
              setTheme((theme) => ({ ...theme, accent }));
            }}
          >
            <Select.Trigger />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Color Theme</Select.Label>
                {themes.map((theme) => (
                  <Select.Item key={theme.label} value={theme.value}>
                    <Flex align="center" gap="3" justify="between">
                      <Text>{theme.label}</Text>

                      <Box
                        width="4"
                        height="4"
                        style={{
                          backgroundColor: theme.colorCode,
                          borderRadius: "50%",
                        }}
                      ></Box>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ThemeSwitcher;
