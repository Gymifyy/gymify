import { Link as L, LinkProps } from 'expo-router';

interface Props extends LinkProps<string> { };

export function Link(props: Props): React.JSX.Element {
  return (
    <L {...props}>
      {props.children}
    </L>
  )
}
