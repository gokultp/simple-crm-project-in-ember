import Ember from 'ember';

export default Ember.Component.extend({
    model : [],
    data : [], // data to be shown in ui
    managers : [], // list of managers
    showGrid : true, // flag for switching between grid and table view
    page : 1, // current page
    selectedManager : null, // selected manager
    range :[500,10000], // range to be shown in range input
    from : 500, // sta
    to : 10000,
    maxPage : null, // max no of pages
    sortOrder: 'Date', // sort order
    sortList : ['Date', 'Revenue'], // list of sort orders
    // on recieved attributes
    load : function () {
        // copy model to data
        var data = this.model.slice();
        // default sorting order is by date
        // sort data by date
        data = data.sort(function (a, b) {
            return Number(a.customerSince) - Number(b.customerSince);
        });

        // set data
        this.set('data', data);

        // set max page to length of data / 10
        this.set('maxPage', Math.floor(this.model.length/10) + 1);

        var hash = {};
        // make a hash to get the relationshipManagers
        this.model.forEach(function (data) {
            hash[data.relationshipManager] = 1;
        });

        // keys of object will be the list of managers
        this.set('managers',Object.keys(hash));

        // add an option to select all
        this.get('managers').pushObject('All');

        // for firing observes
        this.get('selectedManager');

    }.on('didReceiveAttrs'),

    // on elements inserted
    tooltip: function(){

        // material UI init functions
        $('.tooltipped').tooltip({delay: 50});
        $('select').material_select();
        $('slider').addClass('range-field');


    }.on('didInsertElement'),
    filtersChanged: function() {
        var manager = this.get('selectedManager');
        var from = this.get('from');
        var to = this.get('to');
        var sortOrder = this.get('sortOrder');
        var data;
        if(manager && manager !== 'All'){
            data = this.model.filter(function (d) {
                var revenue = Number(d.revenueGenerated.split('$')[1].replace(',',''));
                return d.relationshipManager === manager && revenue >= from && revenue <= to;
            });
            if(sortOrder === 'Date'){
                data = data.sort(function (a, b) {
                    return Number(a.customerSince) - Number(b.customerSince);
                });
            }
            else {
                data = data.sort(function (a, b) {
                    return Number(b.revenueGenerated.split('$')[1].replace(',','')) - Number(a.revenueGenerated.split('$')[1].replace(',',''));
                });
            }


            this.set('data', data);
            this.set('maxPage',Math.floor(data.length/10) + 1);
        }
        else {
            data = this.model.filter(function (d) {
                var revenue = Number(d.revenueGenerated.split('$')[1].replace(',',''));
                return revenue >= from && revenue <= to;
            });

            if(sortOrder === 'Date'){
                data = data.sort(function (a, b) {
                    return Number(a.customerSince) - Number(b.customerSince);
                });
            }
            else {
                data = data.sort(function (a, b) {
                    return Number(b.revenueGenerated.split('$')[1].replace(',','')) - Number(a.revenueGenerated.split('$')[1].replace(',',''));
                });
            }

            this.set('data', data);
            this.set('maxPage',Math.floor(data.length/10) + 1);


        }

    }.observes('selectedManager', 'from', 'to', 'sortOrder').on('init'),


    actions:{
        sliderChanged : function (val) {
            this.set('from', Math.floor(val[0]));
            this.set('to', Math.floor(val[1]));
        },
        editTodo: function() {
            if(this.showGrid){
                this.set('showGrid', false);
            }
            else {
                this.set('showGrid', true);

            }
        }

    }
});
