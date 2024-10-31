import { Component } from "@angular/core";
import { HeaderComponent } from "./shared/components/header/header.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [HeaderComponent],
    template: ` <app-header></app-header> `,
})
export class AppComponent {}
