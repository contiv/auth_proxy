/**
 * Created by vjain3 on 10/6/16.
 */
import { UpgradeAdapter } from '@angular/upgrade';
import { AppModule } from './app.module';
import { NetworksModel } from "./components/models/networksmodel";
import { OrganizationsModel } from "./components/models/organizationsmodel";
import { ServicelbsModel } from "./components/models/servicelbsmodel";
import { StoragePoliciesModel } from "./components/models/storagepoliciesmodel";
import { PoliciesModel } from "./components/models/policiesmodel";
import { VolumesModel } from "./components/models/volumesmodel";
import { ApplicationGroupsModel } from "./components/models/applicationgroupsmodel";
import { NodesModel } from "./components/models/nodesmodel";
import { RulesModel } from "./components/models/rulesmodel";
import { NetprofilesModel } from "./components/models/netprofilesmodel";
import { CRUDHelperService } from "./components/utils/crudhelperservice";
import { InspectService } from "./components/utils/inspectservice";
import { NetworkService } from "./components/utils/networkservice";
import { VolumeSettingService } from "./components/utils/volumesettingservice";
import { NodesService } from "./components/utils/nodesservice";
import { DashboardComponent } from "./dashboard/dashboardctrl";

let upgradeAdapter = new UpgradeAdapter(AppModule);

angular.module('contiv.models')
    .factory('NetworksModel', upgradeAdapter.downgradeNg2Provider(NetworksModel));
angular.module('contiv.models')
    .factory('OrganizationsModel', upgradeAdapter.downgradeNg2Provider(OrganizationsModel));
angular.module('contiv.models')
    .factory('ServicelbsModel', upgradeAdapter.downgradeNg2Provider(ServicelbsModel));
angular.module('contiv.models')
    .factory('StoragePoliciesModel', upgradeAdapter.downgradeNg2Provider(StoragePoliciesModel));
angular.module('contiv.models')
    .factory('PoliciesModel', upgradeAdapter.downgradeNg2Provider(PoliciesModel));
angular.module('contiv.models')
    .factory('VolumesModel', upgradeAdapter.downgradeNg2Provider(VolumesModel));
angular.module('contiv.models')
    .factory('ApplicationGroupsModel', upgradeAdapter.downgradeNg2Provider(ApplicationGroupsModel));
angular.module('contiv.models')
    .factory('NodesModel', upgradeAdapter.downgradeNg2Provider(NodesModel));
angular.module('contiv.models')
    .factory('RulesModel', upgradeAdapter.downgradeNg2Provider(RulesModel));
angular.module('contiv.models')
    .factory('NetprofilesModel', upgradeAdapter.downgradeNg2Provider(NetprofilesModel));
angular.module('contiv.utils')
    .factory('CRUDHelperService', upgradeAdapter.downgradeNg2Provider(CRUDHelperService));
angular.module("contiv.utils")
    .factory("InspectService", upgradeAdapter.downgradeNg2Provider(InspectService));
angular.module('contiv.utils')
    .factory('NetworkService', upgradeAdapter.downgradeNg2Provider(NetworkService));
angular.module('contiv.utils')
    .factory('VolumeSettingService', upgradeAdapter.downgradeNg2Provider(VolumeSettingService));
angular.module('contiv.utils')
    .factory('NodesService', upgradeAdapter.downgradeNg2Provider(NodesService));
angular.module('contiv.dashboard')
    .directive(
        'dashboard',
        upgradeAdapter.downgradeNg2Component(DashboardComponent) as angular.IDirectiveFactory
    );
upgradeAdapter.bootstrap(document.documentElement, ['contivApp']);
