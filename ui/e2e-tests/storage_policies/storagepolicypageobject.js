/**
 * Created by cshampur on 8/17/16.
 */

var storagePolicyList = function(){
    this.createButton = element(by.css("button.button[ui-sref='contiv.menu.storagepolicies.create']"));
    this.storagepolicyname = element(by.repeater("policy in storagePolicyListCtrl.filteredpolicies").row(0)).element(by.cssContainingText("a",testConfig.storagePolicy.name));
}

var storagePolicyCreate = function(){
    this.policyName = element(by.css("#newStoragePolicyName"));
    this.policyPool = element(by.css("#newStoragePolicyPool"));
    this.policySize = element(by.css("#newStoragePolicySize"));
    this.filesystem = {}
    this.filesystem.name = element(by.id("newStoragePolicyFilesystem")).element(by.css("[value='"+testConfig.storagePolicy.fileSystem.name+"']"));
    this.filesystem.type = element(by.model("newItem.name")).element(by.css("[value='"+testConfig.storagePolicy.fileSystem.type+"']"));
    this.filesystem.command = element(by.model("newItem.value"));
    this.filesystem.addButton = element(by.css("table button.icon"));
    this.runtime = {};
    if(testConfig.storagePolicy.snapshot.enabled=="true")
        this.runtime.snapshot = element.all(by.model("policy.runtime.snapshots")).get(0);
    else
        this.runtime.snapshot = element.all(by.model("policy.runtime.snapshots")).get(1);

    this.runtime.frequency = element(by.id("newStoragePolicySnapshotFrequency"));
    this.runtime.keep = element(by.id("newStoragePolicySnapshotKeep"));
    this.runtime.writeiops = element(by.id("newStoragePolicyWriteIops"));
    this.runtime.readiops = element(by.id("newStoragePolicyReadIops"));
    this.runtime.writebps = element(by.id("newStoragePolicyWriteBps"));
    this.runtime.readbps = element(by.id("newStoragePolicyReadBps"));
    this.backends = {};
    this.backends.driver = element(by.id("newStoragePolicyCRUDDriver")).element(by.css("[value='"+testConfig.storagePolicy.backend.driver+"']"));
    this.backends.mount = element(by.id("newStoragePolicyMountDriver")).element(by.css("[value='"+testConfig.storagePolicy.backend.mount+"']"));
    this.backends.snapshotdriver = element(by.id("newStoragePolicySnapshotDriver")).element(by.css("[value='"+testConfig.storagePolicy.backend.snap+"']"));
    this.policyCreate = element(by.cssContainingText("button", "Create"));
    this.policyCancel = element(by.cssContainingText("button", "Cancel"));
    this.collapsible = element.all(by.css("div[ng-click='collapsed = !collapsed'] h4"));
    this.serverMessage = element(by.cssContainingText("ctv-error div div", "Error creating storage policy"));
}

var storagePolicyDetails = function(){
    this.tableData = element.all(by.css("table tbody tr"));
    this.editButton = element(by.cssContainingText("button", "Edit"));
    this.removeButton = element(by.cssContainingText("button", "Remove"));
    this.editText = element(by.cssContainingText("span","(Edit)"));
    this.collapsible = element.all(by.css("i.plus.circle"));
}

module.exports = {storagePolicyList:storagePolicyList,storagePolicyCreate:storagePolicyCreate, storagePolicyDetails: storagePolicyDetails};