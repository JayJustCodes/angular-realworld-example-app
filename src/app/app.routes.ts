import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { ItemDetailsComponent } from "./pages/item-details/item-details.component";

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
        title: "Home Page",
    },
    {
        path: "contact-page",
        component: ContactPageComponent,
        title: "Contact Page",
    },
    {
        path: "item-details/:id",
        component: ItemDetailsComponent,
        title: "Item Details",
    },
];
