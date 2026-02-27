import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { HowItWorks } from "./pages/HowItWorks";
import { Upload } from "./pages/Upload";
import { Arena } from "./pages/Arena";
import { Daily } from "./pages/Daily";
import { Share } from "./pages/Share";
import { Rules } from "./pages/Rules";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/how",
    Component: HowItWorks,
  },
  {
    path: "/upload",
    Component: Upload,
  },
  {
    path: "/arena/:id",
    Component: Arena,
  },
  {
    path: "/daily",
    Component: Daily,
  },
  {
    path: "/share/:roastId",
    Component: Share,
  },
  {
    path: "/rules",
    Component: Rules,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
