/**
 * Created by vjain3 on 10/6/16.
 */
import { AppModule } from './app.module';
import { upgradeAdapter } from "./upgradeadapter";
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
import { NodesService } from "./components/utils/nodesservice";
import { ErrorMessageComponent } from "./components/directives/errormessagedirective";
import { DashboardComponent } from "./dashboard/dashboardctrl";
import { IsolationPolicyCreateComponent } from "./network_policies/isolationpolicycreatectrl";
import { IsolationPolicyDetailsComponent } from "./network_policies/isolationpolicydetailsctrl";
import { BandwidthPolicyCreateComponent } from "./network_policies/bandwidthpolicycreatectrl";
import { BandwidthPolicyDetailsComponent } from "./network_policies/bandwidthpolicydetailsctrl";
import { ApplicationGroupCreateComponent } from "./applicationgroups/applicationgroupcreatectrl";
import { ApplicationGroupDetailsComponent } from "./applicationgroups/applicationgroupdetailsctrl";
import { NetworkSettingsComponent } from "./settings/networksettingctrl";
import { VolumeSettingsComponent } from "./settings/volumesettingctrl";

import {
    CtvTableComponent, CtvThComponent, CtvSearchComponent,
    CtvTpaginationComponent
} from "./components/directives/tabledirective";
import {NetworkListComponent} from "./networks/networklistctrl";
import {AppGrouplistComponent} from "./applicationgroups/applicationgrouplistctrl";
import {IsolationListComponent} from "./network_policies/isolationpolicylistctrl";
import {BandwidthListComponent} from "./network_policies/bandwidthpolicylistctrl";
import {NetworkStatComponent} from "./networks/networkstatsctrl";
import {CtvAccordionComponent} from "./components/directives/accordiondirective";
import {ServicelbListComponent} from "./service_lbs/servicelblistctrl";
import {ServicelbStatComponent} from "./service_lbs/servicelbstatsctrl";
import {VolumeListComponent} from "./volumes/volumelistctrl";
import {VolumeSettingService} from "./components/utils/volumesettingservice";
import {NetworkService} from "./components/utils/networkservice";
import {StoragepolicyListComponent} from "./storage_policies/storagepolicylistctrl";
import {OrganizationListComponent} from "./organizations/organizationlistctrl";
import {NetworkInfoComponent} from "./networks/networkinfoctrl";
import {NetworkdetailsComponent} from "./networks/networkdetailsctrl";
import {CtvCollapsibleComponent} from "./components/directives/collapsibledirective";
import {VolumeDetailsComponent} from "./volumes/volumedetailsctrl";
import {VolumeService} from "./volumes/volumeservice";
import {CtvNamevalueComponent} from "./components/directives/namevaluedirective";

upgradeAdapter.upgradeNg1Provider('$state');
upgradeAdapter.upgradeNg1Provider('$stateParams');

angular.module('contiv.models')
    .factory('NetworksModel', upgradeAdapter.downgradeNg2Provider(NetworksModel))
    .factory('OrganizationsModel', upgradeAdapter.downgradeNg2Provider(OrganizationsModel))
    .factory('ServicelbsModel', upgradeAdapter.downgradeNg2Provider(ServicelbsModel))
    .factory('StoragePoliciesModel', upgradeAdapter.downgradeNg2Provider(StoragePoliciesModel))
    .factory('PoliciesModel', upgradeAdapter.downgradeNg2Provider(PoliciesModel))
    .factory('VolumesModel', upgradeAdapter.downgradeNg2Provider(VolumesModel))
    .factory('ApplicationGroupsModel', upgradeAdapter.downgradeNg2Provider(ApplicationGroupsModel))
    .factory('NodesModel', upgradeAdapter.downgradeNg2Provider(NodesModel))
    .factory('RulesModel', upgradeAdapter.downgradeNg2Provider(RulesModel))
    .factory('NetprofilesModel', upgradeAdapter.downgradeNg2Provider(NetprofilesModel));

angular.module('contiv.settings')
    .directive('networksetting', upgradeAdapter.downgradeNg2Component(NetworkSettingsComponent) as angular.IDirectiveFactory)
    .directive('volumesetting', upgradeAdapter.downgradeNg2Component(VolumeSettingsComponent) as angular.IDirectiveFactory);

angular.module('contiv.utils')
    .factory('CRUDHelperService', upgradeAdapter.downgradeNg2Provider(CRUDHelperService))
    .factory("InspectService", upgradeAdapter.downgradeNg2Provider(InspectService))
    .factory('NetworkService', upgradeAdapter.downgradeNg2Provider(NetworkService))
    .factory('VolumeSettingService', upgradeAdapter.downgradeNg2Provider(VolumeSettingService))
    .factory('NodesService', upgradeAdapter.downgradeNg2Provider(NodesService));

angular.module('contiv.dashboard')
    .directive('dashboard', upgradeAdapter.downgradeNg2Component(DashboardComponent) as angular.IDirectiveFactory);

angular.module('contiv.networkpolicies')
    .directive('isolationpolicycreate', upgradeAdapter.downgradeNg2Component(IsolationPolicyCreateComponent) as angular.IDirectiveFactory)
    .directive('bandwidthpolicycreate', upgradeAdapter.downgradeNg2Component(BandwidthPolicyCreateComponent) as angular.IDirectiveFactory)
    .directive('isolationpolicylist', upgradeAdapter.downgradeNg2Component(IsolationListComponent) as angular.IDirectiveFactory)
    .directive('bandwidthpolicylist', upgradeAdapter.downgradeNg2Component(BandwidthListComponent) as angular.IDirectiveFactory)
    .directive('isolationpolicydetails', upgradeAdapter.downgradeNg2Component(IsolationPolicyDetailsComponent) as angular.IDirectiveFactory)
    .directive('bandwidthpolicydetails', upgradeAdapter.downgradeNg2Component(BandwidthPolicyDetailsComponent) as angular.IDirectiveFactory);

angular.module("contiv.directives")
    .directive("ctvError", upgradeAdapter.downgradeNg2Component(ErrorMessageComponent) as angular.IDirectiveFactory)
    .directive('ctvTable', upgradeAdapter.downgradeNg2Component(CtvTableComponent) as angular.IDirectiveFactory)
    .directive('ctvTh', upgradeAdapter.downgradeNg2Component(CtvThComponent) as angular.IDirectiveFactory)
    .directive('ctvSearch', upgradeAdapter.downgradeNg2Component(CtvSearchComponent) as angular.IDirectiveFactory)
    .directive('ctvTpagination', upgradeAdapter.downgradeNg2Component(CtvTpaginationComponent) as angular.IDirectiveFactory)
    .directive('ctvAccordion', upgradeAdapter.downgradeNg2Component(CtvAccordionComponent) as angular.IDirectiveFactory)
    .directive('ctvCollapsible', upgradeAdapter.downgradeNg2Component(CtvCollapsibleComponent) as angular.IDirectiveFactory)
    .directive('ctvNamevalue', upgradeAdapter.downgradeNg2Component(CtvNamevalueComponent) as angular.IDirectiveFactory)


angular.module('contiv.networks')
    .directive('networkList', upgradeAdapter.downgradeNg2Component(NetworkListComponent) as angular.IDirectiveFactory)
    .directive('networkStat', upgradeAdapter.downgradeNg2Component(NetworkStatComponent) as angular.IDirectiveFactory)
    .directive('networkInfo', upgradeAdapter.downgradeNg2Component(NetworkInfoComponent) as angular.IDirectiveFactory)
    .directive('networkdetails', upgradeAdapter.downgradeNg2Component(NetworkdetailsComponent) as angular.IDirectiveFactory);

angular.module('contiv.applicationgroups')
    .directive('applicationGrouplist', upgradeAdapter.downgradeNg2Component(AppGrouplistComponent) as angular.IDirectiveFactory)
    .directive('applicationgroupcreate', upgradeAdapter.downgradeNg2Component(ApplicationGroupCreateComponent) as angular.IDirectiveFactory)
    .directive('applicationgroupdetails', upgradeAdapter.downgradeNg2Component(ApplicationGroupDetailsComponent) as angular.IDirectiveFactory);

angular.module('contiv.servicelbs')
    .directive('servicelbList', upgradeAdapter.downgradeNg2Component(ServicelbListComponent) as angular.IDirectiveFactory)
    .directive('servicelbstat', upgradeAdapter.downgradeNg2Component(ServicelbStatComponent) as angular.IDirectiveFactory);

angular.module('contiv.volumes')
    .directive('volumelist', upgradeAdapter.downgradeNg2Component(VolumeListComponent) as angular.IDirectiveFactory)
    .directive('volumedetails', upgradeAdapter.downgradeNg2Component(VolumeDetailsComponent) as angular.IDirectiveFactory)
    .factory('VolumeService',upgradeAdapter.downgradeNg2Provider(VolumeService));

angular.module('contiv.storagepolicies')
    .directive('storagepolicylist', upgradeAdapter.downgradeNg2Component(StoragepolicyListComponent) as angular.IDirectiveFactory);

angular.module('contiv.organizations')
    .directive('organizationlist', upgradeAdapter.downgradeNg2Component(OrganizationListComponent) as angular.IDirectiveFactory)

upgradeAdapter.bootstrap(document.documentElement, ['contivApp']);
