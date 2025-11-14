import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "auto" }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // top pe le jao on route change
    window.scrollTo({ top: 0, left: 0, behavior });
    // agar tum history/forward/restore chahte ho to use history.scrollRestoration
  }, [pathname, behavior]);
  return null;
}
