import ProtectedRoute from "./route/ProtectedRoute";
import { RouteInterface, routes } from "./route";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const renderRoutes = (routes: RouteInterface) => {
    const Component = routes.component;

    const element = routes.isProtected ? (
      <ProtectedRoute layout={routes.layout}>
        <Component />
      </ProtectedRoute>
    ) : (
      <Component />
    );
    return <Route key={routes.path} path={routes.path} element={element} />;
  };

  return (
    <BrowserRouter>
      <Routes>{routes.map(renderRoutes)}</Routes>
    </BrowserRouter>
  );
}

export default App;
