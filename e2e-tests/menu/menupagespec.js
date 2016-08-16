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
        menuPage.dashboard.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.dashboard.getAttribute("href"));
        menuPage.applicationGroup.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.applicationGroup.getAttribute("href"));
        menuPage.networkPolicies.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.networkPolicies.getAttribute("href"));
        menuPage.storagePolicies.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.storagePolicies.getAttribute("href"));
        menuPage.serviceLb.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.serviceLb.getAttribute("href"));
        menuPage.networks.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.networks.getAttribute("href"));
        menuPage.volumes.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.volumes.getAttribute("href"));
        menuPage.nodes.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.nodes.getAttribute("href"));
        menuPage.organizations.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.organizations.getAttribute("href"));
        menuPage.settings.click();
        expect(browser.getCurrentUrl()).toEqual(menuPage.settings.getAttribute("href"));
    });

});