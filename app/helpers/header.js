import Ember from 'ember';

export function header(params/*, hash*/) {
    return Ember.String.htmlSafe(`<i class="large material-icons">perm_identity</i><b>${params[0]} ${params[1]}</b>, <br>${params[2]}<span style="float:right"><b>${params[3]}</b></span>`);

}

export default Ember.Helper.helper(header);
