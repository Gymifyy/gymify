import { FlatList, StyleSheet, View } from "react-native";
import { Loader } from "../skeleton";

export function LoadingFlatList({ length }: { length: number }) {


  function renderLoadingItem({ item, index }: { item: number, index: number }) {
    return (
      <View style={{ paddingVertical: 6, alignItems: 'center', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Loader colorMode="light" width={"85%"} height={88} />
      </View>
    )
  }
  function renderItemLayout(_: any, index: number) {
    return { length: 360, offset: 84 * index, index };
  }
  function renderLoadingKey(index: number) { return `__${index}__${Math.random() * 1000}` };
  return (
    <FlatList
      data={new Array(length).fill(0)}
      style={styles.gymsList}
      getItemLayout={renderItemLayout}
      keyExtractor={renderLoadingKey}
      renderItem={renderLoadingItem}
    />
  );
}
const styles = StyleSheet.create({
  gymsList: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
});
