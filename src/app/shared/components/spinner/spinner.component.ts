import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingState } from "../../models/loading-state.model";
import { LoadingService } from "../../services/loading.service";

@Component({
    selector: "app-spinner",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="spinner-overlay" *ngIf="loadingStateValue?.status == 'loading'">
            <div class="spinner"></div>
        </div>
    `,
    styleUrl: "./spinner.component.css",
})
export class SpinnerComponent implements OnInit {
    private loadingState: LoadingState | null = null;

    constructor(private loadingService: LoadingService) {}

    private setLoadingState(state: LoadingState): void {
        this.loadingState = state;
    }

    public get loadingStateValue(): LoadingState | null {
        return this.loadingState;
    }

    public ngOnInit(): void {
        this.loadingService.getLoading().subscribe((state: LoadingState) => {
            this.setLoadingState(state);
        });
    }
}
