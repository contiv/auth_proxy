/**
 * Created by cshampur on 7/27/16.
 */

var MenuPage = require('./menupageobject');

describe("Testing Menu Page",function(){

    var menuPage = new MenuPage();

    beforeEach(function(){
        browser.get("#/m");
    });

    it("Clicking on various menu items",function(){
        testConfig.clickLink(menuPage.dashboard);
        testConfig.clickLink(menuPage.applicationGroup);
        testConfig.clickLink(menuPage.networkPolicies);
        testConfig.clickLink(menuPage.storagePolicies);
        testConfig.clickLink(menuPage.serviceLb);
        testConfig.clickLink(menuPage.networks);
        testConfig.clickLink(menuPage.volumes);
        testConfig.clickLink(menuPage.nodes);
        testConfig.clickLink(menuPage.organizations);
        testConfig.clickLink(menuPage.settings);
    });

});