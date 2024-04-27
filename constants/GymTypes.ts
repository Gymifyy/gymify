import { Href } from "expo-router";

export enum EquipmentStatusEnum {
  // Ordered
  ORDERED,
  // Not ordered at all
  NOT_REQUESTED,
  // Requested to be ordered
  REQUESTED,
  // Replaced with new one
  REPLACED,
}

export enum EquipmentTypeEnum {
  // Just ordered, new
  NEW,
  // Good condition, used
  GOOD,
  // Bad condition, weared down
  BAD,
  // Unusable condition
  Unusable,
}

export type GymCardProps = {
  id: string,
  title: string,
  quality?: string,
  description: string,
  rating: number,
  image?: string,
  localImage: boolean,
  location: string,
  total_members: number,
  href: Href<string>,
}

export type EquipmentsType = {
  id: string,
  name: string,
  description: string,
  quantity: Number,
  quality: EquipmentTypeEnum,
  status: EquipmentStatusEnum,
}

export type CourseType = {
  id: string,
  name: string,
  description: string,
  members: Number,
  duration: number,
  type: string,
  pirce: string,
  gym: string,
  coach: string,
}

export type GymType = {
  id: string,
  name: string,
  description: string,
  members: Number,
  trainers: Number,
  managers: Number,
  equipments: Array<EquipmentsType>,
  orderedEquipments: Array<EquipmentsType & { status: "SHIPPED" | "ORDERED" | "TO BE ORDERED" }>,
}


