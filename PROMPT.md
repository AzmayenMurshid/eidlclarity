I have a custom-coded website built in Visual Studio Code with an embedded HubSpot form. The form includes hidden fields intended to capture UTM parameters (utm_source, utm_medium, utm_campaign), ad click IDs (like gclid, fbclid, msclkid), and the full original landing URL.

I need a robust, production-ready JavaScript implementation to handle tracking persistence and passing values into the form. Please write a complete script that implements the following logic:

1. **Capture & Persistence (`sessionStorage`):**
   - When a user lands on the site, check the current URL for standard UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`) and click IDs (`gclid`, `fbclid`, `msclkid`).
   - Store these values in `sessionStorage` so that if the user navigates across multiple internal pages (where UTM parameters might drop off the URL), the tracking data is not lost before they convert.
   - Capture and store the user's initial landing URL (`window.location.href`).

2. **HubSpot Form Integration & Field Population:**
   - Use the HubSpot v2 embed script (`//js.hsforms.net/forms/embed/v2.js`).
   - Implement the `onFormReady` callback function to target the rendered form.
   - Retrieve the stored values from `sessionStorage` and inject them into the corresponding hidden fields using their internal field names (`utm_source`, `utm_medium`, `utm_campaign`, `click_id`, and `original_url`).
   - Ensure you trigger the `.change()` method (or appropriate DOM/jQuery event handler compatible with HubSpot's form state) so HubSpot registers the input values and submits them properly to the CRM.

Please provide:
- The clean, full HTML and JavaScript implementation snippet.
- Explanations for how the `sessionStorage` fallback and the HubSpot `onFormReady` execution work together.
- Any best practices or edge cases to keep in mind (e.g., matching HubSpot internal field names).

Here are my hubspot form details (check .env for additional information if needed but do not use the file, just copy the information over):
- Portal ID: 44019641
- Form ID: 4cde914f-7695-4cae-9dd8-62273ef78ce8

SUCCESS CRITERIA:
- System is able to read Original URL with UTM Parameters
- Pass UTM Parameters, Click ID and original URL to HubSpot hidden fields if there are any.

If you want, I can next make this even more production-safe by:

adding a small sessionStorage guard for storage quota issues
making the HubSpot field names configurable
adding a hidden fallback for the original URL only when present