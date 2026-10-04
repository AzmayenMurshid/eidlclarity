# Context & Tech Stack
- **Project:** Custom-coded website built in Visual Studio Code.
- **Deployment Platform:** Vercel.
- **Form Integration:** HubSpot embedded form (v2 embed script: `//js.hsforms.net/forms/embed/v2.js`).
- **Objective:** Capture UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`), ad click IDs (`gclid`, `fbclid`, `msclkid`), and the full original landing URL, persist them across page navigation using `sessionStorage`, and dynamically pass them into HubSpot form hidden fields on submission.

# The Problem
The tracking and form population script works perfectly in my local development environment (`localhost`), but **breaks upon deployment to Vercel**. 

This is likely due to Vercel's Edge network serving assets too quickly (causing race conditions where `hbspt` isn't defined yet), framework hydration/DOM re-mounting issues, or script execution order differences between local dev servers and production builds.

# Requirements for the Fix
Please provide a robust, production-ready implementation that handles Vercel production environments safely. Specifically, ensure the code accounts for:
1. **Safe Script Loading & Timing:** Checking if the HubSpot global object (`window.hbspt`) is fully loaded before attempting form creation, or handling asynchronous script loading properly so it doesn't fail on fast production CDNs.
2. **Framework/DOM Lifecycle Safety:** Ensuring that if the site uses a modern frontend framework (like React, Next.js, or vanilla JS with dynamic rendering), the form container and initialization logic won't throw null reference errors (`Cannot read properties of null`) during hydration or page transitions.
3. **Robust `sessionStorage` Fallback & Injection:** 
   - Capturing UTMs, click IDs, and `window.location.href` on landing.
   - Storing them in `sessionStorage` so multi-page navigation doesn't drop the tracking data.
   - Using HubSpot's `onFormReady` callback to populate the hidden fields and triggering `.change()` so HubSpot registers the values.

Please provide:
- The corrected, production-safe script/component code.
- Explanations of why it failed on Vercel (e.g., timing/hydration race conditions) and how your code prevents it.
- Instructions on where to place the script in the project structure.