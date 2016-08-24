/**
 * Created by cshampur on 7/27/16.
 */


var DashboardPage = require("./dashboardpageobject.js");

describe("Testing Dashboard Page", function(){

    var dashboardPage = new DashboardPage();
    
    beforeEach(function(){
        browser.get("#/m/dashboard");
    });

    it("Verify nodes link",function(){
        testConfig.clickLink(dashboardPage.nodes);
    });

    it("Verify networks link",function(){
        testConfig.clickLink(dashboardPage.networks);
    });

    it("Verify volumes link",function(){
        testConfig.clickLink(dashboardPage.volumes);
    });

    it("Verify applicationGroup link",function(){
        testConfig.clickLink(dashboardPage.applicationGroup);
    });

    it("Verify networkPolicies link",function(){
        testConfig.clickLink(dashboardPage.networkPolicies);
    });

    it("Verify storagePolicies link",function(){
        testConfig.clickLink(dashboardPage.storagePolicies);
    });

    it("Verifying Dashboard groups", function(){
        expect(dashboardPage.resourceContent.getText()).toEqual("Resources");
        expect(dashboardPage.policyContent.getText()).toEqual("Policies");
    });
    
});