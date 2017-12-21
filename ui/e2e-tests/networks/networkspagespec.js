/**
 * Created by cshampur on 7/27/16.
 */

var NetworksPage = require('./networkspageobject');

describe("Testing Networks create and list", function(){
    var networkList = new NetworksPage.netList();
    var networkCreate = new NetworksPage.netCreate();

    beforeEach(function(){
        browser.get("#/m/networks/list");
    });

    it('Create a network', function(){
        testConfig.clickLink(networkList.createButton);
        networkCreate.newNetworkName.sendKeys(testConfig.networks.name);
        networkCreate.newNetworkEncap.click();
        networkCreate.newNetworkCidr.sendKeys(testConfig.networks.cidr);
        networkCreate.newNetworkGateway.sendKeys(testConfig.networks.gateway);
        networkCreate.newNetworkCreateButton.submit();
        expect(networkCreate.serverMessage.isPresent()).toBeFalsy();
    });

    it('Verify the network list', function(){
        testConfig.verifyCreate(networkList.networkName, testConfig.networks.name);
    });

});