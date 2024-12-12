import { WarningService } from "../../core/services/warning.service";

export abstract class OnWarning {
    constructor(protected warningService: OnWarningSetter) {
        warningService.setImplementer(this);
    }

    abstract onWarningTrue(): void;

}


export abstract class OnWarningSetter {

    implementer!: OnWarning;

    notifyToImplementer(): void {
        if (this.implementer) {
            this.implementer.onWarningTrue();
        }
    }

    setImplementer(implementer: OnWarning): void {
        this.implementer = implementer;
    }


}

