/**
 * Contains all the policies.
 * See policy.js for info on how policies work.
 */
angular.module('contiv.graph')
    .factory('PolicyService', ['Policy','QTipPolicy', 'PathChangeViewPolicy', 
        'NodeSelectionPolicy', 'SplitJoinNodePolicy', 'SplitJoinViewPolicy',
        'SaveStatePolicy',
            function (Policy, QTipPolicy, PathChangeViewPolicy,
                        NodeSelectionPolicy,  SplitJoinNodePolicy, 
                        SplitJoinViewPolicy, SaveStatePolicy) {

                return {
                    Policy: Policy.Policy,
                    QTipPolicy: QTipPolicy.Policy,
                    PathChangeViewPolicy: PathChangeViewPolicy.Policy,
                    NodeSelectionPolicy: NodeSelectionPolicy.Policy,
                    SplitJoinNodePolicy: SplitJoinNodePolicy.Policy,
                    SplitJoinViewPolicy: SplitJoinViewPolicy.Policy,
                    SaveStatePolicy: SaveStatePolicy.Policy
                }
}]);