import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { Suspense, lazy } from "react";

const ScrollToTop = lazy(() => import("../shared/components/ScrollToTop"));
const Layout = lazy(() => import("../layout"));
const PageError = lazy(() => import("../views/PageError"));
const Home = lazy(() => import("../views/Home"));
const TicketManagement = lazy(() => import("../views/TicketManagement"));
const TicketChecking = lazy(() => import("../views/TicketChecking"));
const EventPackageChecking = lazy(
  () => import("../views/TicketChecking/EventPackageChecking")
);
const ServicePack = lazy(() => import("../views/ServicePack"));

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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/home" element={<Home />} />
            <Route path="/ticket-management" element={<TicketManagement />} />
            <Route path="/ticket-check" element={<TicketChecking />} />
            <Route
              path="/ticket-check/event-package"
              element={<EventPackageChecking />}
            />
            <Route path="/service-pack" element={<ServicePack />} />
          </Route>
          <Route path="*" element={<PageError />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default MainRouter;
