/**
 * Created by cshampur on 8/17/16.
 */

global.testConfig = {
    networks:{
        name:"a-Test-Net",
        encap:"'vxlan'",
        cidr:"20.1.6.0/24",
        gateway:"20.1.6.254"
    },

    storagePolicy:{
        name: "a-Test-Volume-Policy",
        pool: "rbd",
        size: "10MB",
        fileSystem: {
            name: "string:ext4",
            type: "ext4",
            command: "mkfs.ext4 -m0 %"
        },

        snapshot: {
            enabled: "true",
            frequency: "30m",
            noofsnaps: "20",
        },

        readWriteOp: {
            writeiops: "",
            readiops: "",
            writebps: "10000000",
            readbps: "10000000"
        },

        backend: {
            driver: "ceph",
            mount: "ceph",
            snap: "ceph"
        }
        
    },

    volumes: {
        name: "a-Test-Volume27",
        policy: "a-Test-Volume-Policy",
        newvolume: "a-VTest-Volume-Copy27"
    },

    getVerificationList: flattenObjects,
    verifyCreate: verifyCreate,
    clickLink: clickLink,
    removeObject: removeObject,
    waitForPageLoad: waitForPageLoad
}

function flattenObjects(pageObject){
    var fieldValues = [];
    function recurseObj(subObj){
        for(key in subObj){
            if(subObj[key] === null) continue;
            if(typeof subObj[key] === 'object')
                recurseObj(subObj[key]);
            else
                fieldValues.push(subObj[key]);
        }
    }
    recurseObj(pageObject);
    return fieldValues;
}

function verifyCreate(createElement, name){
    expect(createElement.getText()).toEqual(name);
    var linkRef = ""
    createElement.getAttribute("href").then(function(href){
        linkRef = href.replace("%3A", ":");
    });
    createElement.click().then(function(){
        expect(browser.getCurrentUrl()).toEqual(linkRef);
    });
}

function clickLink(createButton){
    var createHref = createButton.getAttribute("href");
    var createUrl = "";
    createHref.then(function(href){
        createUrl = href.replace("http://localhost:8080/","");
    });
    createButton.click().then(function(){
        expect(browser.getCurrentUrl()).toEqual(browser.params.globBaseUrl + createUrl);
    });
}

function removeObject(page, itemName){
    browser.get(page);
    element(by.cssContainingText("a", itemName)).isPresent().then(function(present){
        if(present){
            element(by.cssContainingText("a", itemName)).click().then(function(){
                element(by.cssContainingText("button", "Remove")).isPresent().then(function(){
                    element(by.cssContainingText("button", "Remove")).click().then(function(){
                        element(by.cssContainingText("div.positive.button", "Yes")).isPresent().then(function(){
                            element(by.cssContainingText("div.positive.button", "Yes")).click();
                        });
                    });
                });
            });
        }
    });
}

function waitForPageLoad(sec){
    browser.driver.sleep(parseInt(sec));
    var el = element(by.css("div.inverted.dimmer"));
    return browser.driver.wait(function() {
        return el.isDisplayed().then(function(present) {
            return !present;
        })
    });
}