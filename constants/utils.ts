import { Tables } from "@/types/database.types";

export function isKey<T extends object>(
  x: T,
  k: PropertyKey
): k is keyof T {
  return k in x;
}
// define local constants for frequently used functions
const asin = Math.asin
const cos = Math.cos
const sin = Math.sin
const PI_180 = Math.PI / 180

function hav(x: number) {
  const s = sin(x / 2)
  return s * s
}

function relativeHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const aLatRad = lat1 * PI_180
  const bLatRad = lat2 * PI_180
  const aLngRad = lon1 * PI_180
  const bLngRad = lon2 * PI_180

  const ht = hav(bLatRad - aLatRad) + cos(aLatRad) * cos(bLatRad) * hav(bLngRad - aLngRad)
  // since we're only interested in relative differences,
  // there is no need to multiply by earth radius or to sqrt the squared differences
  return asin(ht)
}
/**
 *  Sort List based on location. Closest is first.
 *  @param list The list with locations. 
 *  @param currentLocation The current location.
 *  */
export function sortBasedOnLocation(list: Tables<"gyms">[], currentLocation: { latitude: number, longitude: number }, setList?: (value: Tables<"gyms">[]) => void) {

  list.sort((a, b) => {
    const aLoc = JSON.parse(JSON.parse(a.location)) as { latitude: number, longitude: number };
    const bLoc = JSON.parse(JSON.parse(b.location)) as { latitude: number, longitude: number };
    return relativeHaversineDistance(aLoc.latitude, aLoc.longitude, currentLocation.latitude, currentLocation.longitude) - relativeHaversineDistance(bLoc.latitude, bLoc.longitude, currentLocation.latitude, currentLocation.longitude)
  })
  if (setList) {
    setList(list);
    return;
  }
  return list;
}
