import styles from "./styles/App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import clsx from "clsx";

// PAGES
import Home from "./pages/Home";
import Category from "./pages/Category";

// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

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
                    <Header />
                    <main className={styles.main}>
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/category/:slug">
                                <Category />
                            </Route>
                        </Switch>
                    </main>
                    <Footer />
                </div>
                {device.type === "mobile" && <MobileBottomNav />}
            </CartContextProvider>
        </Router>
    );

};

export default App;
