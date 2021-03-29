import React, { Suspense, lazy } from "react";
import "./css/app.css";
import "./css/bootstrap.min.css";
import SplashScreen from "./components/SplashScreen"
const AppRouter = lazy(() => import("./routes/AppRouter"))

class App extends React.Component {
  state = {};

  render() {
    return (
      <Suspense fallback={<SplashScreen />}>
        <AppRouter />
      </Suspense>
    );
  }
}

export default App;
