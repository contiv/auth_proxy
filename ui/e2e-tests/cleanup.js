/**
 * Created by cshampur on 8/19/16.
 */

describe("Clean Up", function(){
    it("Remove Network", function(){
        testConfig.removeObject("#/m/networks/list", testConfig.networks.name);
        testConfig.waitForPageLoad(0);
    });
    it("Remove Copied Volume", function(){
        testConfig.removeObject("#/m/volumes/list", testConfig.volumes.newvolume);
        testConfig.waitForPageLoad(0);
    });
    it("Remove Volume", function(){
        testConfig.removeObject("#/m/volumes/list", testConfig.volumes.name);
        testConfig.waitForPageLoad(0);
    });
    it("Remove Storage Policy", function(){
        testConfig.removeObject("#/m/storagepolicies/list", testConfig.storagePolicy.name);
        testConfig.waitForPageLoad(0);
    });
});
