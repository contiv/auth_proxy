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
        var nodeshref = dashboardPage.nodes.getAttribute("href");
        dashboardPage.nodes.click();
        expect(browser.getCurrentUrl()).toEqual(nodeshref);
    });

    it("Verify networks link",function(){
        var networkshref = dashboardPage.networks.getAttribute("href");
        dashboardPage.networks.click();
        expect(browser.getCurrentUrl()).toEqual(networkshref);
    });

    it("Verify volumes link",function(){
        var volumeshref = dashboardPage.volumes.getAttribute("href");
        dashboardPage.volumes.click();
        expect(browser.getCurrentUrl()).toEqual(volumeshref);
    });

    it("Verify applicationGroup link",function(){
        var applicationGrouphref = dashboardPage.applicationGroup.getAttribute("href");
        dashboardPage.applicationGroup.click();
        expect(browser.getCurrentUrl()).toEqual(applicationGrouphref);
    });

    it("Verify networkPolicies link",function(){
        var networkPolicieshref = dashboardPage.networkPolicies.getAttribute("href");
        dashboardPage.networkPolicies.click();
        expect(browser.getCurrentUrl()).toEqual(networkPolicieshref);
    });

    it("Verify storagePolicies link",function(){
        var storagePolicieshref = dashboardPage.storagePolicies.getAttribute("href");
        dashboardPage.storagePolicies.click();
        expect(browser.getCurrentUrl()).toEqual(storagePolicieshref);
    });

    it("Verifying Dashboard groups", function(){
        expect(dashboardPage.resourceContent.getText()).toEqual("Resources");
        expect(dashboardPage.policyContent.getText()).toEqual("Policies");
    });
    
});