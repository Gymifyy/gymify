
import { Text as DefaultText } from 'react-native';
import { TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
