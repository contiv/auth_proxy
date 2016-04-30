/**
 * Created by vjain3 on 4/29/16.
 */
angular.module('contiv.utils', [])
    .factory('CRUDHelperService', function () {
            function startLoader(controller) {
                controller.showLoader = true;
            }

            function stopLoader(controller) {
                controller.showLoader = false;
            }

            function showServerError(controller, message) {
                controller.showServerError = true;
                controller.serverErrorMessage = message;
            }

            function hideServerError(controller) {
                controller.showServerError = false;
            }

            return {
                startLoader: startLoader,
                stopLoader: stopLoader,
                showServerError: showServerError,
                hideServerError: hideServerError
            }
        }
    );
