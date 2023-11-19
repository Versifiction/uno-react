import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home"));
const Game = lazy(() => import("./pages/Game"));
const Error = lazy(() => import("./pages/Error"));

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route element={<Error />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
