import { Component } from "@angular/core";
import { GoodsListComponent } from "../../shared/components/goods-list/goods-list.component";

@Component({
    selector: "app-home-page",
    standalone: true,
    imports: [GoodsListComponent],
    template: ` <app-goods-list class="w-screen flex justify-center mt-6"></app-goods-list> `,
})
export class HomePageComponent {}
