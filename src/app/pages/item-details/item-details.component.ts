import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-item-details",
    standalone: true,
    imports: [],
    templateUrl: "./item-details.component.html",
    styleUrl: "./item-details.component.css",
})
export class ItemDetailsComponent {
    private itemId!: String;
    itemDetails: any;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
    ) {}

    public ngOnInit(): void {
        const idParam: string | null = this.route.snapshot.paramMap.get("id")!;
        if (idParam) {
            this.itemId = idParam;
        }
        this.fetchItemDetails();
    }

    private fetchItemDetails(): void {
        this.http.get(`http://localhost:3000/item/${this.itemId}`).subscribe((data: any) => {
            this.itemDetails = data;
            console.log("data", data);
        });
    }
}
