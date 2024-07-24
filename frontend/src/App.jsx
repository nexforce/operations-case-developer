import styles from "./styles/App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";

// PAGES
import Home from "./pages/Home";

// HOOKS
import useMobileDetect from "./hooks/useMobileDetect";

// CONTEXT
import CartContextProvider from "./context/CartContext";

const App = () => {
    const device = useMobileDetect();

    return (
        <Router>
            <CartContextProvider>
                <div className={clsx(device.type === "mobile" && styles.paddingForMobile, styles.container)}>
                    <main className={styles.main}>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                        </Switch>
                    </main>
                </div>
                {device.type === "mobile" && <MobileBottomNav />}
            </CartContextProvider>
        </Router>
    );
};

export default App;
