import Ember from 'ember';

export function grid(params/*, hash*/) {
    var row = Number(params[1]);
    var nos = Number(params[2]);
    var data = params[0].slice();
    return data.splice((row - 1)* nos, nos);
}

export default Ember.Helper.helper(grid);
