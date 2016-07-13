describe('contiv.directives', function() {
    var extra_vars_standalone = {
        "contiv_network_mode":"standalone"
    };

    var extra_vars_aci = {
        "contiv_network_mode":"aci"
    };

    var $compile, $rootScope;
    beforeEach(module('contiv.directives'));
    beforeEach(module('contiv.test.directives'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;

    }));

    describe('networkmode directive', function () {
        var element_standalone, element_aci;
        beforeEach(inject(function() {
            element_standalone = $compile("<ctv-networkmode extravars='extra_vars_standalone'></ctv-networkmode>")($rootScope);
            element_aci = $compile("<ctv-networkmode extravars='extra_vars_aci'></ctv-networkmode>")($rootScope);
            $rootScope.extra_vars_standalone = extra_vars_standalone;
            $rootScope.extra_vars_aci = extra_vars_aci;
            $rootScope.$digest();
        }));
        it('Replaces the element with standalone with the appropriate content', function () {
            expect(element_standalone.html()).toContain("ng-model=\"extravars['contiv_network_mode']\" value=\"standalone\"");
            expect(element_standalone.html()).toContain("ng-model=\"extravars['contiv_network_mode']\" value=\"aci\"");
            expect(element_standalone.html()).toContain("Forwarding mode");
            expect(element_standalone.html()).toContain("<option value=\"bridge\">Bridge</option>");
            expect(element_standalone.html()).toContain("<option value=\"routing\">Routing</option>");
            expect(element_standalone.html()).not.toContain("<label for=\"apicURL\">URL</label>");
            expect(element_standalone.html()).not.toContain("ng-model=\"extravars['apic_username']\"");
            expect(element_standalone.html()).not.toContain("Leaf nodes");
            expect(element_standalone.html()).not.toContain("Allow unrestricted communication between EPGs");            
        });
        it('Replaces the element with aci with the appropriate content', function () {
            expect(element_aci.html()).toContain("ng-model=\"extravars['contiv_network_mode']\" value=\"standalone\"");
            expect(element_aci.html()).toContain("ng-model=\"extravars['contiv_network_mode']\" value=\"aci\"");
            expect(element_aci.html()).not.toContain("Forwarding mode");
            expect(element_aci.html()).not.toContain("<option value=\"bridge\">Bridge</option>");
            expect(element_aci.html()).not.toContain("<option value=\"routing\">Routing</option>");
            expect(element_aci.html()).toContain("<label for=\"apicURL\">URL</label>");
            expect(element_aci.html()).toContain("ng-model=\"extravars['apic_username']\"");
            expect(element_aci.html()).toContain("Leaf nodes");
            expect(element_aci.html()).toContain("Allow unrestricted communication between EPGs");
        });

    });
});
