export type UTMValues = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  utm_id: string;
  page_url: string;
  page_path: string;
  referrer: string;
};

export function parseUtmParams(): UTMValues {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
      utm_id: "",
      page_url: "",
      page_path: "",
      referrer: "",
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    utm_id: params.get("utm_id") || "",
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer: document.referrer || "",
  };
}

export function getHubspotUtmFields() {
  const values = parseUtmParams();

  return [
    ["page_url", values.page_url],
    ["page_path", values.page_path],
    ["referrer", values.referrer],
    ["utm_source", values.utm_source],
    ["utm_medium", values.utm_medium],
    ["utm_campaign", values.utm_campaign],
    ["utm_term", values.utm_term],
    ["utm_content", values.utm_content],
    ["utm_id", values.utm_id],
  ] as const;
}
