import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { Suspense, lazy } from "react";

const ScrollToTop = lazy(() => import("../shared/components/ScrollToTop"));
const Layout = lazy(() => import("../layout"));

function MainRouter() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="spinner-container">
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          <ScrollToTop />
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default MainRouter;
