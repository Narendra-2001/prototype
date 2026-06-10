export interface SiteCoordinate {
  lat: number
  lng: number
}

export const SITE_COORDINATES: Record<string, SiteCoordinate> = {
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  hyderabad: { lat: 17.385, lng: 78.4867 },
  delhi: { lat: 28.6139, lng: 77.209 },
  chennai: { lat: 13.0827, lng: 80.2707 },
}

const SITE_SEARCH_LABELS: Record<string, string> = {
  bengaluru: "Bengaluru, Karnataka",
  hyderabad: "Hyderabad, Telangana",
  delhi: "Delhi, India",
  chennai: "Chennai, Tamil Nadu",
}

export function getSiteSearchLabel(siteId: string) {
  return SITE_SEARCH_LABELS[siteId] ?? siteId
}

const CITY_SPREAD: Record<string, { lat: number; lng: number }[]> = {
  bengaluru: [
    { lat: 0, lng: 0 },
    { lat: 0.028, lng: 0.018 },
    { lat: -0.022, lng: 0.032 },
    { lat: 0.015, lng: -0.026 },
    { lat: -0.035, lng: -0.012 },
    { lat: 0.042, lng: -0.008 },
    { lat: -0.008, lng: 0.045 },
    { lat: 0.018, lng: 0.038 },
    { lat: -0.03, lng: 0.022 },
    { lat: 0.035, lng: 0.012 },
  ],
  hyderabad: [
    { lat: 0, lng: 0 },
    { lat: 0.02, lng: 0.015 },
    { lat: -0.018, lng: 0.025 },
    { lat: 0.012, lng: -0.02 },
    { lat: -0.025, lng: -0.01 },
    { lat: 0.03, lng: 0.008 },
  ],
  delhi: [
    { lat: 0, lng: 0 },
    { lat: 0.022, lng: 0.014 },
    { lat: -0.02, lng: 0.028 },
    { lat: 0.016, lng: -0.022 },
    { lat: -0.028, lng: -0.015 },
    { lat: 0.025, lng: 0.02 },
  ],
  chennai: [
    { lat: 0, lng: 0 },
    { lat: 0.02, lng: 0.016 },
    { lat: -0.018, lng: 0.024 },
    { lat: 0.014, lng: -0.02 },
    { lat: -0.024, lng: -0.012 },
    { lat: 0.026, lng: 0.01 },
  ],
}

export function getSiteCoordinate(siteId: string): SiteCoordinate {
  return SITE_COORDINATES[siteId] ?? { lat: 20.5937, lng: 78.9629 }
}

import { differenceInCalendarDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export const DEFAULT_SEARCH_NIGHTS = 2

/** Nights between check-in and check-out (Airbnb-style). */
export function getSearchNights(
  range: DateRange | undefined,
  fallback = DEFAULT_SEARCH_NIGHTS
): number {
  if (!range?.from || !range?.to) return fallback
  return Math.max(1, differenceInCalendarDays(range.to, range.from))
}

/** Total stay price shown on cards and map pins (Airbnb-style). */
export function getStayTotalPrice(pricePerNight: number, nights = DEFAULT_SEARCH_NIGHTS) {
  return pricePerNight * nights
}

/** Airbnb-style full price label e.g. ₹2,511 */
export function formatMapPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export interface SpreadMapListing {
  id: string
  siteId: string
  lat: number
  lng: number
  price: number
}

export function buildSpreadMapListings(
  sites: { id: string; basePrice: number }[]
): SpreadMapListing[] {
  const listings: SpreadMapListing[] = []

  for (const site of sites) {
    const base = getSiteCoordinate(site.id)
    const spread = CITY_SPREAD[site.id] ?? [{ lat: 0, lng: 0 }]

    spread.forEach((offset, index) => {
      const priceBump = [0, 311, 823, 423, 111, 567, 234, 891, 156, 678][index % 10]
      listings.push({
        id: `${site.id}-${index}`,
        siteId: site.id,
        lat: base.lat + offset.lat,
        lng: base.lng + offset.lng,
        price: site.basePrice + priceBump,
      })
    })
  }

  return listings
}
