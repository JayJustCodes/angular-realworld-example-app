import { Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";

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
];
