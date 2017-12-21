/**
 * Created by cshampur on 7/27/16.
 */


var DashboardPage = function(){
    this.nodes = element(by.css("a.card[ui-sref='contiv.menu.nodes.list()']"));
    this.networks = element(by.css("a.card[ui-sref='contiv.menu.networks.list()']"));
    this.volumes = element(by.css("a.card[ui-sref='contiv.menu.volumes.list()']"));
    this.applicationGroup = element(by.css("a.card[ui-sref='contiv.menu.applicationgroups.list()']"));
    this.networkPolicies = element.all(by.css("a.card[ui-sref='contiv.menu.networkpolicies.list.isolation()']")).get(0);
    this.storagePolicies = element(by.css("a.card[ui-sref='contiv.menu.storagepolicies.list()']"));
    this.resourceContent = element.all(by.css("div.container > div.content")).first();
    this.policyContent = element.all(by.css("div.container > div.content")).last();
}

module.exports = DashboardPage;
