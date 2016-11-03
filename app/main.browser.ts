/**
 * Created by vjain3 on 10/6/16.
 */
import { AppModule } from './app.module';
import { upgradeAdapter } from "./upgradeadapter";
import { NetworksModel } from "./components/models/networksmodel";
import { OrganizationsModel } from "./components/models/organizationsmodel";
import { ServicelbsModel } from "./components/models/servicelbsmodel";
import { PoliciesModel } from "./components/models/policiesmodel";
import { ApplicationGroupsModel } from "./components/models/applicationgroupsmodel";
import { RulesModel } from "./components/models/rulesmodel";
import { NetprofilesModel } from "./components/models/netprofilesmodel";
import { CRUDHelperService } from "./components/utils/crudhelperservice";
import { InspectService } from "./components/utils/inspectservice";
import { NodesService } from "./components/utils/nodesservice";
import { ErrorMessageComponent } from "./components/directives/errormessagedirective";
import { DashboardComponent } from "./dashboard/dashboardctrl";
import { NetworkPoliciesTabsComponent } from "./network_policies/networkpoliciestabsctrl";
import { IsolationPolicyCreateComponent } from "./network_policies/isolationpolicycreatectrl";
import { IsolationPolicyDetailsComponent } from "./network_policies/isolationpolicydetailsctrl";
import { BandwidthPolicyCreateComponent } from "./network_policies/bandwidthpolicycreatectrl";
import { BandwidthPolicyDetailsComponent } from "./network_policies/bandwidthpolicydetailsctrl";
import { ApplicationGroupCreateComponent } from "./applicationgroups/applicationgroupcreatectrl";
import { ApplicationGroupDetailsComponent } from "./applicationgroups/applicationgroupdetailsctrl";
import { NetworkSettingsComponent } from "./settings/networksettingctrl";

import {
    CtvTableComponent, CtvThComponent, CtvSearchComponent,
    CtvTpaginationComponent
} from "./components/directives/tabledirective";
import {NetworkListComponent} from "./networks/networklistctrl";
import {AppGrouplistComponent} from "./applicationgroups/applicationgrouplistctrl";
import {IsolationListComponent} from "./network_policies/isolationpolicylistctrl";
import {BandwidthListComponent} from "./network_policies/bandwidthpolicylistctrl";
import {CtvAccordionComponent} from "./components/directives/accordiondirective";
import {ServicelbListComponent} from "./service_lbs/servicelblistctrl";
import {NetworkService} from "./components/utils/networkservice";
import {OrganizationListComponent} from "./organizations/organizationlistctrl";
import {NetworkdetailsComponent} from "./networks/networkdetailsctrl";
import {CtvCollapsibleComponent} from "./components/directives/collapsibledirective";
import {CtvNamevalueComponent} from "./components/directives/namevaluedirective";
import {NetworkCreateComponent} from "./networks/networkcreatectrl";
import {ServicelbCreateComponent} from "./service_lbs/servicelbcreatectrl";
import {ServicelbDetailsComponent} from "./service_lbs/servicelbdetailsctrl";
import {ClusterSettingsComponent} from "./settings/clustersettingctrl";
import {LoginComponent} from "./login/loginctrl";
import {OrganizationCreateComponent} from "./organizations/organizationcreatectrl";
import {OrganizationDetailComponent} from "./organizations/organizationdetailsctrl";


upgradeAdapter.upgradeNg1Provider('$state');
upgradeAdapter.upgradeNg1Provider('$stateParams');

angular.module('contiv.models')
    .factory('NetworksModel', upgradeAdapter.downgradeNg2Provider(NetworksModel))
    .factory('OrganizationsModel', upgradeAdapter.downgradeNg2Provider(OrganizationsModel))
    .factory('ServicelbsModel', upgradeAdapter.downgradeNg2Provider(ServicelbsModel))
    .factory('PoliciesModel', upgradeAdapter.downgradeNg2Provider(PoliciesModel))
    .factory('ApplicationGroupsModel', upgradeAdapter.downgradeNg2Provider(ApplicationGroupsModel))
    .factory('RulesModel', upgradeAdapter.downgradeNg2Provider(RulesModel))
    .factory('NetprofilesModel', upgradeAdapter.downgradeNg2Provider(NetprofilesModel));

angular.module('contiv.settings')
    .directive('networksetting', upgradeAdapter.downgradeNg2Component(NetworkSettingsComponent) as angular.IDirectiveFactory)
    .directive('clustersettings', upgradeAdapter.downgradeNg2Component(ClusterSettingsComponent) as angular.IDirectiveFactory);

angular.module('contiv.utils')
    .factory('CRUDHelperService', upgradeAdapter.downgradeNg2Provider(CRUDHelperService))
    .factory("InspectService", upgradeAdapter.downgradeNg2Provider(InspectService))
    .factory('NetworkService', upgradeAdapter.downgradeNg2Provider(NetworkService))
    .factory('NodesService', upgradeAdapter.downgradeNg2Provider(NodesService));

angular.module('contiv.dashboard')
    .directive('dashboard', upgradeAdapter.downgradeNg2Component(DashboardComponent) as angular.IDirectiveFactory);

angular.module('contiv.networkpolicies')
    .directive('networkpoliciestabs', upgradeAdapter.downgradeNg2Component(NetworkPoliciesTabsComponent) as angular.IDirectiveFactory)
    .directive('isolationpolicycreate', upgradeAdapter.downgradeNg2Component(IsolationPolicyCreateComponent) as angular.IDirectiveFactory)
    .directive('bandwidthpolicycreate', upgradeAdapter.downgradeNg2Component(BandwidthPolicyCreateComponent) as angular.IDirectiveFactory)
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
    .directive('ctvNamevalue', upgradeAdapter.downgradeNg2Component(CtvNamevalueComponent) as angular.IDirectiveFactory);


angular.module('contiv.networks')
    .directive('networkList', upgradeAdapter.downgradeNg2Component(NetworkListComponent) as angular.IDirectiveFactory)
    .directive('networkdetails', upgradeAdapter.downgradeNg2Component(NetworkdetailsComponent) as angular.IDirectiveFactory)
    .directive('networkcreate', upgradeAdapter.downgradeNg2Component(NetworkCreateComponent) as angular.IDirectiveFactory);

angular.module('contiv.applicationgroups')
    .directive('applicationGrouplist', upgradeAdapter.downgradeNg2Component(AppGrouplistComponent) as angular.IDirectiveFactory)
    .directive('applicationgroupcreate', upgradeAdapter.downgradeNg2Component(ApplicationGroupCreateComponent) as angular.IDirectiveFactory)
    .directive('applicationgroupdetails', upgradeAdapter.downgradeNg2Component(ApplicationGroupDetailsComponent) as angular.IDirectiveFactory);

angular.module('contiv.servicelbs')
    .directive('servicelbList', upgradeAdapter.downgradeNg2Component(ServicelbListComponent) as angular.IDirectiveFactory)
    .directive('servicelbCreate', upgradeAdapter.downgradeNg2Component(ServicelbCreateComponent) as angular.IDirectiveFactory)
    .directive('servicelbDetails', upgradeAdapter.downgradeNg2Component(ServicelbDetailsComponent) as angular.IDirectiveFactory);

angular.module('contiv.organizations')
    .directive('organizationlist', upgradeAdapter.downgradeNg2Component(OrganizationListComponent) as angular.IDirectiveFactory)
    .directive('organizationcreate', upgradeAdapter.downgradeNg2Component(OrganizationCreateComponent) as angular.IDirectiveFactory)
    .directive('organizationdetails', upgradeAdapter.downgradeNg2Component(OrganizationDetailComponent) as angular.IDirectiveFactory);

angular.module('contiv.login')
    .directive('login', upgradeAdapter.downgradeNg2Component(LoginComponent) as angular.IDirectiveFactory);

upgradeAdapter.bootstrap(document.documentElement, ['contivApp']);
