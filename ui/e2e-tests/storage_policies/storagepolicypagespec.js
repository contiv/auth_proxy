/**
 * Created by cshampur on 8/17/16.
 */

var StoragePolicyPage = require('./storagepolicypageobject');

describe("Storage policy", function(){
    var storagePolicyList = new  StoragePolicyPage.storagePolicyList();
    var storagePolicyCreate = new  StoragePolicyPage.storagePolicyCreate();
    var storagePolicyDetails = new StoragePolicyPage.storagePolicyDetails();

    beforeEach(function(){
        browser.get("#/m/storagepolicies/list");
    });
    
    it("Create policy", function(){
        testConfig.clickLink(storagePolicyList.createButton);
        storagePolicyCreate.policyName.sendKeys(testConfig.storagePolicy.name);
        storagePolicyCreate.policyPool.clear().then(function(){
            storagePolicyCreate.policyPool.sendKeys(testConfig.storagePolicy.pool);
        });
        storagePolicyCreate.policySize.clear().then(function(){
            storagePolicyCreate.policySize.sendKeys(testConfig.storagePolicy.size);
        });
        storagePolicyCreate.collapsible.each(function(element, index){
            browser.actions()
                .mouseMove(element, {x: 0, y: 0}) // 100px from left, 100 px from top of plot0
                .click()
                .perform();
        });
        storagePolicyCreate.filesystem.name.click();
        storagePolicyCreate.filesystem.type.click();
        storagePolicyCreate.filesystem.command.clear().then(function(){
            storagePolicyCreate.filesystem.command.sendKeys(testConfig.storagePolicy.fileSystem.command);
        });
        storagePolicyCreate.filesystem.addButton.click();
        storagePolicyCreate.runtime.snapshot.click();
        storagePolicyCreate.runtime.frequency.clear().then(function(){
            storagePolicyCreate.runtime.frequency.sendKeys(testConfig.storagePolicy.snapshot.frequency);
        });
        storagePolicyCreate.runtime.keep.clear().then(function(){
            storagePolicyCreate.runtime.keep.sendKeys(testConfig.storagePolicy.snapshot.noofsnaps);
        });
        storagePolicyCreate.runtime.writeiops.sendKeys(testConfig.storagePolicy.readWriteOp.writeiops);
        storagePolicyCreate.runtime.readiops.sendKeys(testConfig.storagePolicy.readWriteOp.readiops);
        storagePolicyCreate.runtime.writebps.sendKeys(testConfig.storagePolicy.readWriteOp.writebps);
        storagePolicyCreate.runtime.readbps.sendKeys(testConfig.storagePolicy.readWriteOp.readbps);
        storagePolicyCreate.backends.driver.click();
        storagePolicyCreate.backends.mount.click();
        storagePolicyCreate.backends.snapshotdriver.click();
        storagePolicyCreate.policyCreate.submit();
        expect(storagePolicyCreate.serverMessage.isPresent()).toBeFalsy();
    });
    
    it("Verify create", function(){
        testConfig.verifyCreate(storagePolicyList.storagepolicyname, testConfig.storagePolicy.name);
    });

    it('verify details', function(){
        storagePolicyList.storagepolicyname.click().then(function(){
            tableFields = testConfig.getVerificationList(testConfig.storagePolicy);
            storagePolicyDetails.collapsible.each(function(element, index){
                element.click();
            });
            storagePolicyDetails.tableData.each(function(element,index){
                if(index < 16) {
                    element.all(by.css("td")).get(1).getText().then(function (text) {
                        expect(tableFields).toContain(text);
                    });
                }
            });
            storagePolicyDetails.editButton.click().then(function(){
                expect(storagePolicyDetails.editText.getText()).toEqual("(Edit)");
            });
        });

    });
});