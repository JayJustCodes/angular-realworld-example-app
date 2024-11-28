import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-item-details",
    standalone: true,
    imports: [],
    templateUrl: "./item-details.component.html",
    styleUrl: "./item-details.component.css",
})
export class ItemDetailsComponent {
    private itemId!: number;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        const idParam: string | null = this.route.snapshot.paramMap.get("id")!;
        if (idParam) {
            this.itemId = Number(idParam);
        }
        console.log("id", this.itemId);
    }
}
