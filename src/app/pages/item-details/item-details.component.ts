import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ItemDetailsService } from "../../shared/services";
import { type ItemDetails } from "../../shared/models";

@Component({
    selector: "app-item-details",
    standalone: true,
    imports: [],
    templateUrl: "./item-details.component.html",
    styleUrl: "./item-details.component.css",
})
export class ItemDetailsComponent {
    private itemId!: string;
    private itemDetails: ItemDetails | null = null;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly itemDetailsService: ItemDetailsService,
    ) {}

    public ngOnInit(): void {
        const idParam: string | null = this.route.snapshot.paramMap.get("id");
        if (idParam) {
            this.setItemId(idParam);
        }
        this.fetchItemDetails();
    }

    private fetchItemDetails(): void {
        this.itemDetailsService.fetchDetails(this.itemId).subscribe((data: ItemDetails) => {
            this.setItemDetails(data);
            console.log("item details", this.itemDetails);
        });
    }

    public setItemDetails(details: ItemDetails): void {
        this.itemDetails = details;
    }

    public setItemId(id: string): void {
        this.itemId = id;
    }
}
