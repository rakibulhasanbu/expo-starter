import { router, type Href } from "expo-router";

function safeBack(fallbackHref: Href) {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace(fallbackHref);
  }
}

export { safeBack };
