import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganizationsModel} from "../../models/organizationsmodel";
import {CRUDHelperService} from "../../utils/crudhelperservice";

export enum DisplayType {
    modal,
    component
}

@Component({
    selector: "tenantcreate",
    templateUrl: "./tenantcreate.html"
})

export class TenantCreateComponent {
    public tenantCreateForm: FormGroup;
    public showLoader = false;
    public showServerError: boolean;
    public serverErrorMessage: string;
    @Input('displayType') displayType: DisplayType;
    @Output('created') created: EventEmitter<any>;
    @Output('canceled') canceled: EventEmitter<any>;
    public DisplayType = DisplayType;
    constructor(private formBuilder: FormBuilder,
                private organizationsModel: OrganizationsModel,
                private crudhelperService: CRUDHelperService) {
        this.created = new EventEmitter<any>();
        this.canceled = new EventEmitter<any>();
        this.tenantCreateForm = this.formBuilder.group({
            tenantName: ['', Validators.required]
        })
    }

    cancel() {
        this.canceled.emit(true);
    }

    create() {
        if (this.tenantCreateForm.valid) {
            this.showLoader = true;
            const tenantObj = {
                key: this.tenantCreateForm.get('tenantName').value,
                tenantName: this.tenantCreateForm.get('tenantName').value
            };
            this.organizationsModel.create(tenantObj, undefined)
                .then((result: any) => {
                    this.showLoader = false;
                    this.crudhelperService.showNotification("Tenant Created", result.key);
                    this.tenantCreateForm.reset();
                    this.created.emit(true);
                }, (error) => {
                    this.showLoader = false;
                    this.crudhelperService.showServerError("Tenant: Create failed", error);
                });
        }
    }
}