import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps { };


export function Button({ children, ...otherProps }: Props): React.JSX.Element {
  return (
    <Pressable {...otherProps}>
      {children}
    </Pressable>
  )
}
