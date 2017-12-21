/**
 * Created by cshampur on 8/17/16.
 */

var VolumesPage = require('./volumespageobject');

describe("Volumes", function(){
    var volList = new VolumesPage.volList();
    var volCreate = new VolumesPage.volCreate();
    var volDetails = new VolumesPage.volDetails();
    var volSnapshotCopy = new VolumesPage.volSnapshotCopy();

    beforeEach(function(){
        browser.get("#/m/volumes/list");
    });

    it("Create volume", function(){
        testConfig.clickLink(volList.createButton);
        volCreate.volumename.sendKeys(testConfig.volumes.name);
        volCreate.collapsible.each(function(element, index){
            browser.actions()
                .mouseMove(element, {x: 0, y: 0}) // 100px from left, 100 px from top of plot0
                .click()
                .perform();
        });
        volCreate.volumepolicy.click();
        volCreate.volumecreate.submit();
        expect(volCreate.serverMessage.isPresent()).toBeFalsy();
    });

    it("verify create", function(){
        browser.refresh();
        testConfig.verifyCreate(volList.volumeName, testConfig.volumes.name);
    });

    it("verify storage policy details", function(){
        volList.volumeName.click().then(function(){
            volDetails.collapsible.each(function(element, index){
                browser.actions()
                    .mouseMove(element, {x: 0, y: 0}) // 100px from left, 100 px from top of plot0
                    .click()
                    .perform();
            });
            volDetails.detailsTable.then(function(elements){    
                expect(elements[0].all(by.css("td")).get(1).getText()).toEqual(testConfig.volumes.name);
            });
            var storagePolicyData = testConfig.getVerificationList(testConfig.storagePolicy);
            volDetails.policyDetails.each(function(element, index){
                element.all(by.css("td")).get(1).getText().then(function(text){
                   expect(storagePolicyData).toContain(text);
                });
            });
        });
    });

    it("verify snapshot create", function(){
        volList.volumeName.click().then(function(){
            volDetails.collapsible.each(function(element, index){
                browser.actions()
                    .mouseMove(element, {x: 0, y: 0}) // 100px from left, 100 px from top of plot0
                    .click()
                    .perform();
            });
            expect(volDetails.snapshotSuccessMes.isPresent()).toBeFalsy();
            volDetails.snapshotButton.click().then(function(){
                testConfig.waitForPageLoad(5000);
                browser.waitForAngular();
                expect(volDetails.snapshotSuccessMes.isPresent()).toBeTruthy();
                expect(volDetails.snapshotDetails.all(by.css("td")).get(0).isPresent()).toBeTruthy();
                testConfig.clickLink(volDetails.snapshotIcon);
            });
        });
    });
    
    it("verify snapshot copy", function(){
        volList.volumeName.click().then(function(){
            volDetails.collapsible.each(function(element, index){
                browser.actions()
                    .mouseMove(element, {x: 0, y: 0}) // 100px from left, 100 px from top of plot0
                    .click()
                    .perform();
            });
            var snapshot = "";
            volDetails.snapshotDetails.all(by.css("td")).get(0).getText().then(function(text){
                snapshot=text;
                testConfig.clickLink(volDetails.snapshotIcon);
                expect(volSnapshotCopy.snapshot.getText()).toEqual(snapshot);
            });
            volSnapshotCopy.copyButton.click().then(function(){
                expect(volSnapshotCopy.errorMessage.isPresent()).toBeTruthy();
            });
            volSnapshotCopy.newVolume.sendKeys(testConfig.volumes.newvolume);
            volSnapshotCopy.copyButton.click().then(function(){
                expect(volSnapshotCopy.serverMessage.isPresent()).toBeFalsy();
                volSnapshotCopy.serverMessage.isPresent().then(function(present){
                   if(!present){
                       volDetails.detailsTable.then(function(elements){
                           expect(elements[0].all(by.css("td")).get(1).getText()).toEqual(testConfig.volumes.newvolume);
                       });
                   }
                });
            });
        });
    });
});