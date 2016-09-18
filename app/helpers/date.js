import Ember from 'ember';

export function date(params/*, hash*/) {

  return new Date(parseInt(params[0])).toDateString();
}

export default Ember.Helper.helper(date);
