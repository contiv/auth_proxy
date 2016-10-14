/**
 * Created by vjain3 on 4/29/16.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CRUDHelperService {

    startLoader(controller) {
        controller.showLoader = true;
    }

    stopLoader(controller) {
        controller.showLoader = false;
    }

    showServerError(controller, message) {
        controller.showServerError = true;
        controller.serverErrorMessage = message;
    }

    hideServerError(controller) {
        controller.showServerError = false;
    }
}