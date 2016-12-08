/**
 * Created by vjain3 on 11/1/16.
 */
import { RouterModule } from '@angular/router';
import { MenuComponent } from "./menu/menuCtrl";
import { NetworkPoliciesTabsComponent } from "./network_policies/networkpoliciestabsctrl";
import { IsolationPolicyCreateComponent } from "./network_policies/isolationpolicycreatectrl";
import { IsolationPolicyDetailsComponent } from "./network_policies/isolationpolicydetailsctrl";
import { BandwidthPolicyCreateComponent } from "./network_policies/bandwidthpolicycreatectrl";
import { BandwidthPolicyDetailsComponent } from "./network_policies/bandwidthpolicydetailsctrl";
import { DashboardComponent } from "./dashboard/dashboardctrl";
import { AppGrouplistComponent } from "./applicationgroups/applicationgrouplistctrl";
import { ApplicationGroupCreateComponent } from "./applicationgroups/applicationgroupcreatectrl";
import { ApplicationGroupDetailsComponent } from "./applicationgroups/applicationgroupdetailsctrl";
import { SettingsMenuComponent } from "./settings/settingsmenu.component";
import { NetworkSettingsComponent } from "./settings/networksettingctrl";
import { OrganizationListComponent } from "./organizations/organizationlistctrl";
import { OrganizationCreateComponent } from "./organizations/organizationcreatectrl";
import { OrganizationDetailsComponent } from "./organizations/organizationdetailsctrl";
import { NetworkListComponent } from "./networks/networklistctrl";
import { NetworkdetailsComponent } from "./networks/networkdetailsctrl";
import { NetworkCreateComponent } from "./networks/networkcreatectrl";
import { ServicelbListComponent } from "./service_lbs/servicelblistctrl";
import { ServicelbCreateComponent } from "./service_lbs/servicelbcreatectrl";
import { ServicelbDetailsComponent } from "./service_lbs/servicelbdetailsctrl";
import { LoginComponent } from "./login/loginctrl";
import { AuthGuard } from "./components/utils/authguard";
import { UnauthorizedComponent } from "./login/unauthorized";
import { LogoutComponent } from "./login/logoutctrl";
import { UserListComponent } from "./settings/users/userlist.component";
import { UserCreateComponent } from "./settings/users/usercreate.component";
import { UserDetailsComponent } from "./settings/users/userdetails.component";
import { AppProfileListComponent } from "./appprofiles/appprofilelist.component";
import { AppProfileCreateComponent } from "./appprofiles/appprofilecreate.component";
import { AppProfileDetailsComponent } from "./appprofiles/appprofiledetails.component";
import { FirstrunWizardComponent } from "./firstrunwizard/firstrunwizardctrl";
import { NodeListComponent } from "./settings/nodes/nodelist.component";
import { NodeCreateComponent } from "./settings/nodes/nodecreate.component";
import { NodeDetailsComponent } from "./settings/nodes/nodedetails.component";

const routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {
        path: 'm',
        component: MenuComponent,
        canActivateChild: [AuthGuard],
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'firstrun', component: FirstrunWizardComponent},

            //Network Policies
            {path: 'networkpolicies', redirectTo: 'networkpolicies/list', pathMatch: 'full'},
            {path: 'networkpolicies/list', component: NetworkPoliciesTabsComponent},
            {path: 'networkpolicies/isolation/create', component: IsolationPolicyCreateComponent},
            {path: 'networkpolicies/isolation/details/:key', component: IsolationPolicyDetailsComponent},
            {path: 'networkpolicies/isolation/edit/:key', component: IsolationPolicyDetailsComponent},
            {path: 'networkpolicies/bandwidth/create', component: BandwidthPolicyCreateComponent},
            {path: 'networkpolicies/bandwidth/details/:key', component: BandwidthPolicyDetailsComponent},
            {path: 'networkpolicies/bandwidth/edit/:key', component: BandwidthPolicyDetailsComponent},

            //Application Groups
            {path: 'applicationgroups', redirectTo: 'applicationgroups/list', pathMatch: 'full'},
            {path: 'applicationgroups/list', component: AppGrouplistComponent},
            {path: 'applicationgroups/create', component: ApplicationGroupCreateComponent},
            {path: 'applicationgroups/details/:key', component: ApplicationGroupDetailsComponent},
            {path: 'applicationgroups/edit/:key', component: ApplicationGroupDetailsComponent},

            //Settings
            {
                path: 'settings',
                component: SettingsMenuComponent,
                children: [
                    {path: '', redirectTo: 'users/list', pathMatch: 'full'},
                    {path: 'networks', component: NetworkSettingsComponent},
                    {path: 'users', redirectTo: 'users/list', pathMatch: 'full'},
                    {path: 'users/list', component: UserListComponent},
                    {path: 'users/create', component: UserCreateComponent},
                    {path: 'users/details/:key', component: UserDetailsComponent},
                    {path: 'users/edit/:key', component: UserDetailsComponent},
                    {path: 'nodes', redirectTo: 'nodes/list', pathMatch: 'full'},
                    {path: 'nodes/list', component: NodeListComponent},
                    {path: 'nodes/create', component: NodeCreateComponent},
                    {path: 'nodes/details/:key', component: NodeDetailsComponent},
                    {path: 'nodes/edit/:key', component: NodeDetailsComponent}
                ]
            },

            //Organizations
            {path: 'organizations', redirectTo: 'organizations/list', pathMatch: 'full'},
            {path: 'organizations/list', component: OrganizationListComponent},
            {path: 'organizations/create', component: OrganizationCreateComponent},
            {path: 'organizations/details/:key', component: OrganizationDetailsComponent},

            //Networks
            {path: 'networks', redirectTo: 'networks/list', pathMatch: 'full'},
            {path: 'networks/list', component: NetworkListComponent},
            {path: 'networks/create', component: NetworkCreateComponent},
            {path: 'networks/details/:key', component: NetworkdetailsComponent},

            //Servicelbs
            {path: 'servicelbs', redirectTo: 'servicelbs/list', pathMatch: 'full'},
            {path: 'servicelbs/list', component: ServicelbListComponent},
            {path: 'servicelbs/create', component: ServicelbCreateComponent},
            {path: 'servicelbs/details/:key', component: ServicelbDetailsComponent},

            //Application profiles
            {path: 'appprofiles', redirectTo: 'appprofiles/list', pathMatch: 'full'},
            {path: 'appprofiles/list', component: AppProfileListComponent},
            {path: 'appprofiles/create', component: AppProfileCreateComponent},
            {path: 'appprofiles/details/:key', component: AppProfileDetailsComponent},
            {path: 'appprofiles/edit/:key', component: AppProfileDetailsComponent},

        ]
    },
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

export default RouterModule.forRoot(routes);