import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoadingState } from "../models/loading-state.model";

@Injectable({
    providedIn: "root",
})
export class LoadingService {
    private readonly loadingSubject: BehaviorSubject<LoadingState> = new BehaviorSubject<LoadingState>({
        status: "idle",
    });

    private updateState(newState: LoadingState): void {
        this.loadingSubject.next(newState);
    }

    public getLoading(): BehaviorSubject<LoadingState> {
        return this.loadingSubject;
    }

    public setLoading(): void {
        this.updateState({ status: "loading" });
    }

    public setSuccess(data?: any): void {
        this.updateState({ status: "success", data });
    }

    public setError(message: string): void {
        this.updateState({ status: "error", message });
    }

    public reset(): void {
        this.updateState({ status: "idle" });
    }
}
