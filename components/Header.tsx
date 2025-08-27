import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar, MD3Colors, useTheme } from "react-native-paper";

const Header = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  const title = getHeaderTitle(options, route?.name);
  const theme = useTheme();

  return (
    <Appbar.Header
      style={{ elevation: 2, backgroundColor: theme.colors.background }}
    >
      {back ? (
        <Appbar.BackAction
          color={MD3Colors.primary40}
          onPress={navigation.goBack}
        />
      ) : null}
      <Appbar.Content
        title={title}
        color={MD3Colors.primary50}
        titleStyle={{ textTransform: "capitalize", fontWeight: "bold" }}
      />
      {options.headerRight
        ? options.headerRight({ tintColor: options.headerTintColor })
        : null}
    </Appbar.Header>
  );
};

export default Header;
