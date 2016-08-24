/**
 * Created by cshampur on 8/17/16.
 */


var volList = function(){
    this.createButton = element(by.css("button.button[ui-sref='contiv.menu.volumes.create']"));
    this.volumeName = element(by.cssContainingText("a",testConfig.volumes.name));
}

var volCreate = function(){
    this.volumename = element(by.id("newVolumeName"));
    this.volumepolicy = element(by.id("newVolumePolicy")).element(by.css("[label='"+testConfig.volumes.policy+"']"));
    this.volumecreate = element(by.cssContainingText("button", "Create"));
    this.volumecancel = element(by.cssContainingText("button", "Cancel"));
    this.collapsible = element.all(by.css("div[ng-click='collapsed = !collapsed'] h4"));
    this.serverMessage = element(by.cssContainingText("ctv-error div div", "Error creating volume"));
}

var volDetails = function(){
    this.detailsTable = element.all(by.css("table tbody tr"));
    this.policyDetails = element(by.css("ctv-collapsible[title='Policy Settings']")).all(by.css("table tbody tr"));
    this.snapshotDetails = element(by.css("ctv-collapsible[title='Snapshots']")).all(by.css("table tbody tr"));
    this.snapshotButton = element(by.cssContainingText("button", "Snapshot"));
    this.collapsible = element.all(by.css("div[ng-click='collapsed = !collapsed'] h4"));
    this.snapshotSuccessMes = element(by.css("div[class='ui positive message']"));
    this.snapshotIcon = element(by.css("ctv-collapsible[title='Snapshots']")).all(by.css("td a")).get(0);
}

var volSnapshotCopy = function(){
    this.snapshot = element.all(by.css("table tbody td")).get(1);
    this.newVolume = element.all(by.id("newvolume"));
    this.copyButton = element(by.cssContainingText("button", "Copy"));
    this.cancelButton = element(by.cssContainingText("button", "Cancel"));
    this.errorMessage = element(by.cssContainingText("li", "Please enter volume name"));
    this.serverMessage = element(by.cssContainingText("ctv-error div div", "Error copying volume"));
}

module.exports = {volList: volList, volCreate: volCreate, volDetails: volDetails, volSnapshotCopy: volSnapshotCopy};