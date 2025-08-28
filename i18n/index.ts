import { useSettings } from "@/store/useSettings";
import * as Localization from "expo-localization";
import { useMemo } from "react";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

type Dict = Record<string, string>;

function format(template: string, params?: Record<string, any>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    params[k] !== undefined && params[k] !== null ? String(params[k]) : ""
  );
}

export function useI18n() {
  const { language } = useSettings();
  const device = Localization.getLocales?.()[0]?.languageCode?.toLowerCase?.() ?? "en";
  const effective = language ?? device;
  const dict: Dict = effective.startsWith("ar") ? (ar as Dict) : (en as Dict);
  const t = useMemo(
    () => (key: string, params?: Record<string, any>): string => {
      const v = dict[key];
      if (typeof v !== "string") return key;
      return format(v, params);
    },
    [dict]
  );
  const isArabic = effective.startsWith("ar");
  return { t, isArabic };
}
