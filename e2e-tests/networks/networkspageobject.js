/**
 * Created by cshampur on 7/27/16.
 */


var netList = function(){
    this.createButton = element(by.css("button.button[ui-sref='contiv.menu.networks.create']"));
    this.networkName = element(by.repeater("network in networksListCtrl.filterednetworks").row(0)).element(by.cssContainingText("a","a-Test-Net"));
}

var netCreate = function(){
    this.newNetworkName = element(by.model("networkCreateCtrl.newNetwork.networkName"));
    this.newNetworkEncap = element(by.model("networkCreateCtrl.newNetwork.encap")).element(by.css("[value='vxlan']"));
    this.newNetworkCidr = element(by.model("networkCreateCtrl.newNetwork.subnet"));
    this.newNetworkGateway = element(by.model("networkCreateCtrl.newNetwork.gateway"));
    this.newNetworkCreateButton = element(by.cssContainingText("button","Cancel"));
    this.newNetworkCancelButton = element(by.cssContainingText("button","Create"));
}

module.exports = {"netList":netList,"netCreate":netCreate};