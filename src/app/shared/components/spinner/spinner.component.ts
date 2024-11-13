import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingService } from "../../services/loading.service";

@Component({
    selector: "app-spinner",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="spinner-overlay" *ngIf="isLoading">
            <div class="spinner"></div>
        </div>
    `,
    styleUrl: "./spinner.component.css",
})
export class SpinnerComponent implements OnInit {
    isLoading = false;

    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.loadingService.loading$.subscribe((loading) => {
            console.log('Spinner state:', loading);
            this.isLoading = loading;
        });
    }
}
