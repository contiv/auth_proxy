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
        var createHref = networkList.createButton.getAttribute("href");
        var createUrl = "";
        createHref.then(function(href){
            createUrl = href;
        });
        networkList.createButton.click().then(function(){
            expect(browser.getCurrentUrl()).toEqual(browser.params.globBaseUrl + createUrl);
        });
        networkCreate.newNetworkName.sendKeys("a-Test-Net");
        networkCreate.newNetworkEncap.click();
        networkCreate.newNetworkCidr.sendKeys("20.1.6.0/24");
        networkCreate.newNetworkGateway.sendKeys("20.1.6.254");
        networkCreate.newNetworkCreateButton.submit();
    });

    it('Verify the network list', function(){
        expect(networkList.networkName.getText()).toEqual("a-Test-Net");
        var detailsHref = ""
        networkList.networkName.getAttribute("href").then(function(href){
            detailsHref = href;
            detailsHref = detailsHref.replace("%3A",":");
        });
        networkList.networkName.click().then(function(){
            expect(browser.getCurrentUrl()).toEqual(detailsHref)
        });
    })

});