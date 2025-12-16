// src/config/geography.ts
//
// Purpose
// -------
// Central place for geography codes and display labels.
// Security + correctness: API can validate geo codes and ensure we ONLY allow Australian scopes.

export type GeoCode = "AUS" | "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";

export const GEO: Record<GeoCode, { code: GeoCode; name: string }> = {
  AUS: { code: "AUS", name: "Australia" },
  NSW: { code: "NSW", name: "New South Wales" },
  VIC: { code: "VIC", name: "Victoria" },
  QLD: { code: "QLD", name: "Queensland" },
  SA: { code: "SA", name: "South Australia" },
  WA: { code: "WA", name: "Western Australia" },
  TAS: { code: "TAS", name: "Tasmania" },
  NT: { code: "NT", name: "Northern Territory" },
  ACT: { code: "ACT", name: "Australian Capital Territory" },
};

export const GEO_CODES = Object.keys(GEO) as GeoCode[];
