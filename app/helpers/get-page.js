import Ember from 'ember';

export function getPage(params/*, hash*/) {
  return (params[0]-1) * 2 + params[1];
}

export default Ember.Helper.helper(getPage);
