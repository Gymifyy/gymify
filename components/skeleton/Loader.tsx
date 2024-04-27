import { MotiSkeletonProps } from 'moti/build/skeleton/types'
import { Skeleton } from 'moti/skeleton'

export function Loader(props: Partial<MotiSkeletonProps>) {
  return (<Skeleton {...props}>{props.children}</Skeleton>);
}
