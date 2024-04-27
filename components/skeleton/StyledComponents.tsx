
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { TextProps, ViewProps, useThemeColor } from './Themed';

export function MonoText(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
