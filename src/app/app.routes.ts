import { Routes } from "@angular/router";

import { TabsComponent } from "./components/tabs/tabs.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        component: TabsComponent,
        children: [
            {
                path: "dishes",
                loadComponent: () =>
                    import("./pages/dishes/dishes.page").then(
                        (m) => m.DishesPage
                    ),
            },
            {
                path: "products",
                loadComponent: () =>
                    import("./pages/products/products.page").then(
                        (m) => m.ProductsPage
                    ),
            },
            {
                path: "cart",
                loadComponent: () =>
                    import("./pages/cart/cart.page").then((m) => m.CartPage),
            },
            {
                path: "settings",
                loadComponent: () =>
                    import("./pages/settings/settings.page").then(
                        (m) => m.SettingsPage
                    ),
            },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: "dishes/:id",
        loadComponent: () =>
            import("./pages/dish/dish.page").then((m) => m.DishPage),
        canActivate: [AuthGuard],
    },
    {
        path: "prices-compare",
        loadComponent: () =>
            import("./pages/prices-compare/prices-compare.page").then(
                (m) => m.PricesComparePage
            ),
        canActivate: [AuthGuard],
    },
    {
        path: "login",
        loadComponent: () =>
            import("./pages/login/login.page").then((m) => m.LoginPage),
    },
    {
        path: "register",
        loadComponent: () =>
            import("./pages/register/register.page").then(
                (m) => m.RegisterPage
            ),
    },
    {
        path: "new-dish",
        loadComponent: () =>
            import("./pages/new-dish/new-dish.page").then((m) => m.NewDishPage),
    },
];
