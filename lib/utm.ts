export type TrackingValues = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_id: string;
  click_id: string;
  original_url: string;
  page_url: string;
  page_path: string;
  referrer: string;
};

export const TRACKING_STORAGE_KEY = "eidlclarity_tracking";

const CLICK_ID_KEYS = ["gclid", "fbclid", "msclkid", "dclid", "twclid"];

export function parseUtmParams(): TrackingValues {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      utm_id: "",
      click_id: "",
      original_url: "",
      page_url: "",
      page_path: "",
      referrer: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const clickId = CLICK_ID_KEYS.map((key) => params.get(key)).find(Boolean) || "";

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    utm_id: params.get("utm_id") || "",
    click_id: clickId,
    original_url: window.location.href,
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer || "",
  };
}

export function persistTrackingSnapshot(): TrackingValues {
  if (typeof window === "undefined") {
    return parseUtmParams();
  }

  const params = parseUtmParams();
  const previous = safeReadTracking();

  const next: TrackingValues = {
    utm_source: params.utm_source || previous.utm_source || "",
    utm_medium: params.utm_medium || previous.utm_medium || "",
    utm_campaign: params.utm_campaign || previous.utm_campaign || "",
    utm_term: params.utm_term || previous.utm_term || "",
    utm_content: params.utm_content || previous.utm_content || "",
    utm_id: params.utm_id || previous.utm_id || "",
    click_id: params.click_id || previous.click_id || "",
    original_url: previous.original_url || params.original_url || "",
    page_url: params.page_url,
    page_path: params.page_path,
    referrer: params.referrer,
  };

  window.sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function safeReadTracking(): Partial<TrackingValues> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.sessionStorage.getItem(TRACKING_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<TrackingValues>) : {};
  } catch {
    return {};
  }
}

export function getHubspotUtmFields() {
  const values = persistTrackingSnapshot();

  return [
    ["utm_source", values.utm_source],
    ["utm_medium", values.utm_medium],
    ["utm_campaign", values.utm_campaign],
    ["utm_term", values.utm_term],
    ["utm_content", values.utm_content],
    ["utm_id", values.utm_id],
    ["click_id", values.click_id],
    ["original_url", values.original_url],
    ["page_url", values.page_url],
    ["page_path", values.page_path],
    ["referrer", values.referrer],
  ] as const;
}
