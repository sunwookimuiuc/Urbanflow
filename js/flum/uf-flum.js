// **************************************************************
// * Copyright (c) 2010-2012 CyberInfrastructure and Geospatial *
// * Information Laboratory (CIGI), University of Illinois at   *
// * Urbana-Champaign, All Rights Reserved.                     *
// **************************************************************
// @author Yizhao Gao <ygao29@illinois.edu> Kiumars Soltani <soltani2@illinois.edu> Sunwoo Kim <kim392@illinois.edu>

Ext.namespace('CG.flum');

// Sample data store for the grid panel
var cityStore = Ext.create('Ext.data.Store',{
                fields:['Id','Name'],
                data:[
                {Id:'Chicago',Name:'Chicago'},
                {Id:'NYC',Name:'New York City'},
                {Id:'LA',Name:'Los Angeles'},
                {Id:'Houston',Name:'Houston'}
                ]
});

// Grid panel for selecting the city
var cityGrid = Ext.create('Ext.grid.Panel', {
        store: cityStore,
        columns: [
            { header: 'City', dataIndex: 'Name' 
            }
    ],
        height: 160,
        width: 102,
        renderTo: Ext.getBody()
});

// Form panel for users to upload their shapefiles
var cityForm = Ext.create('Ext.form.Panel', {
    title: 'Upload a File',
    width: 270,
    bodyPadding: 10,
    frame: true,
    renderTo: Ext.getBody(),    
    items: [{
        xtype: 'filefield',
    name: 'file',
    fieldLabel: 'File',
    labelWidth: 50,
    msgTarget: 'side',
    allowBlank: false,
    anchor: '100%',
    buttonText: 'Select File...'
    }],

    buttons: [{
        text: 'Upload',
    handler: function() {
        var form = this.up('form').getForm();
    }
    }]
});

// Fieldset component where users can choose various options
var cityOption = 
{
    xtype: 'fieldset',
    items: [
    {
        // Option: Start Date of the analysis period (date: day of year)
        xtype: 'datefield',
        width : 200,
        margin : '10 0 0 0',
        fieldLabel: 'Start Date',
        value: new Date()
    },
    {
        // Option: End Date of the analysis period (date: day of year)
        xtype: 'datefield',
        width : 200,
        margin : '10 0 0 0',
        fieldLabel: 'End Date',
        value: new Date()
    },
    {
        // Option: Minimum distance between two consecutive tweets (numeric in meters) 
        xtype: 'label',
        name: 'mindisttitle',
        text: 'Min distance between two consecutive tweets (m)'
    },
    {
        xtype: 'numberfield',
        name: 'mindistvalue'
    },
    {
        // Option: Minimum time between two consecutive tweets (numeric in minutes) 
        xtype: 'label',
        name: 'mintimetitle',
        text: 'Min time between two consecutive tweets (min)'
    },
    {
        xtype: 'numberfield',
        name: 'mintimevalue'
    },
    {
        // Option: Minimum speed between two consecutive tweets (numeric in m/s) 
        xtype: 'label',
        name: 'minspeedtitle',
        text: 'Min speed between two consecutive tweets (m/s)'
    },
    {
        xtype: 'numberfield',
        name: 'minspeedvalue'
    }
    ]
}

// Select a City tab panel (id: city_panel)
Ext.define('CG.view.CityPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'cgx1_urbanflowpanel',
	bodyPadding : '5 10',
	collapseMode : 'header',
	items : [ 
	        {
                xtype : 'tabpanel', // Create a tab panel
                width:  300,
                height: 300,
                activeTab: 0,
                items:  [
                        {
                            // The grid panel to select the city
                            title: 'Select',
                            bodyPadding: 10,
                            items: cityGrid
                        },
                        {
                            // The form panel to upload a shapefile
                            title: 'Upload',
                            bodyPadding: 10,
                            items: cityForm
                        },
                        {
                            // The fieldset component for options
                            title: 'Options',
                            bodyPadding: 10,
                            items: cityOption
                        }
                        ]
            },
            {
                xtype: 'button',
                text: 'Next',
                listeners: {
                    click: function(btn) {
                        Ext.getCmp('city_panel').collapse();
                    }
                }
            }
        ]
});

// Sample spatial clustering algorithm store for the grid panel
var visitorStore = Ext.create('Ext.data.Store',{
                fields:['Id','Name'],
                data:[
                {Id:'db',Name:'DBSCAN'},
                {Id:'seq',Name:'SeqScan'},
                {Id:'gm',Name:'Gaussian Mixture'}
                ]
});

// Grid panel for selecting the algorithm
var visitorGrid = Ext.create('Ext.grid.Panel', {
        store: visitorStore,
        columns: [
            { header: 'Model', dataIndex: 'Name' 
            }
    ],
        height: 160,
        width: 102,
        renderTo: Ext.getBody(),
        listeners: {
            cellclick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts){
                if(rowIndex===0){
                    Ext.getCmp('visitortab').setActiveTab('paramtab');
                }
            }
        }
});

// Fieldset component where users can choose the parameters
var visitorParam = 
{
    xtype: 'fieldset',
    items: [
    {
        // Option: Minimum time between two consecutive tweets (numeric in minutes) 
        xtype: 'label',
        name: 'mintweettitle',
        text: 'Min number of tweets'
    },
    {
        xtype: 'numberfield',
        name: 'mintweetvalue'
    },
    {
        // Option: Minimum speed between two consecutive tweets (numeric in m/s) 
        xtype: 'label',
        name: 'searchradiustitle',
        text: 'Search window radius (m)'
    },
    {
        xtype: 'numberfield',
        name: 'searchradiusvalue'
    }
    ]
}

// Identify Frequent Visitors Tab Panel (id: visitor_panel)
Ext.define('CG.view.VisitorPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'cgx2_urbanflowpanel',
	bodyPadding : '5 10',
	collapseMode : 'header',
	items : [ 
            {
                xtype : 'tabpanel', // Create a tab panel
                id : 'visitortab',
                width:  300,
                height: 300,
                activeTab: 0,
                items:  [
                        {
                            // The grid panel to select the algorithm
                            title: 'Model',
                            bodyPadding: 10,
                            items: visitorGrid
                        },
                        {
                            // Fieldset component to select parameters
                            title: 'Parameters',
                            id : 'paramtab',
                            bodyPadding: 10,
                            items: [
                                    visitorParam,
                                    {
                                        xtype: 'button',
                                        text: 'Next',
                                        listeners: {
                                            click: function(btn) {
                                                Ext.getCmp('visitor_panel').collapse();
                                            }
                                        }
                                    }
                                    ]
                        }
                        ]
            }
            ]
});

// Sample data store for the grid panel
var aggregationStore = Ext.create('Ext.data.Store',{
                fields:['Id','Name'],
                data:[
                {Id:'ct',Name:'Census Tract'},
                {Id:'cb',Name:'Census Blocks'},
                {Id:'zc',Name:'Zip Codes'}
                ]
});

// Grid panel for selecting the aggregation scheme
var aggregationGrid = Ext.create('Ext.grid.Panel', {
        store: aggregationStore,
        columns: [
            { header: 'Scheme', dataIndex: 'Name' 
            }
    ],
        height: 160,
        width: 102,
        renderTo: Ext.getBody()
});

// Form panel for users to upload their shapefiles
var aggregationForm = Ext.create('Ext.form.Panel', {
    title: 'Upload a File',
    width: 270,
    bodyPadding: 10,
    frame: true,
    renderTo: Ext.getBody(),    
    items: [{
        xtype: 'filefield',
    name: 'file',
    fieldLabel: 'File',
    labelWidth: 50,
    msgTarget: 'side',
    allowBlank: false,
    anchor: '100%',
    buttonText: 'Select File...'
    }],

    buttons: [{
        text: 'Upload',
    handler: function() {
        var form = this.up('form').getForm();
    }
    }]
});

// Select an Aggregation Scheme Tab Panel (id: aggregation_panel)
Ext.define('CG.view.AggregationPanel', {
    extend : 'Ext.panel.Panel',
	xtype : 'cgx3_urbanflowpanel',
	bodyPadding : '5 10',
	collapseMode : 'header',
	items : [ 
	        {
                xtype : 'tabpanel', // Create a tab panel
                width:  300,
                height: 300,
                activeTab: 0,
                items:  [
                        {
                            // The grid panel to select the city
                            title: 'Select',
                            bodyPadding: 10,
                            items: aggregationGrid
                        },
                        {
                            // The form panel to upload a shapefile
                            title: 'Upload',
                            bodyPadding: 10,
                            items: aggregationForm
                        }
                        ]
            },
            {
                xtype: 'button',
                text: 'Next',
                listeners: {
                    click: function(btn) {
                        Ext.getCmp('aggregation_panel').collapse();
                    }
                }
            }
        ]
});

var langStore = Ext.create('Ext.data.Store',{
                fields:['Id','Name'],
                data:[
                {Id:'eng',Name:'English'},
                {Id:'esp',Name:'Spanish'},
                {Id:'fre',Name:'French'},
                {Id:'chi',Name:'Chinese'}
                ]
});

var aggregationOptions=  
	{
		xtype : 'fieldset',
		title : 'Query Options',
		name : 'ufqueryoptions',
		columns : 3,
		hideMode: 'visibility',
		items : [
			{
					xtype: 'label',
					name: 'landuse1title',
					text: 'Purpose: Landuse 1'
			},
			{
					xtype: 'numberfield',
					name: 'landuse1value'
			},
			{
					xtype: 'label',
					name: 'landuse2title',
					text: 'Purpose: Landuse 2'
			},	
			{
					xtype: 'numberfield',
					name: 'landuse2value'
			},
        		{
	        		xtype: 'combobox',
	                	margin: '10 10 0 0',
	                	fieldLabel: 'Dominant Lang',
	                	store: langStore,
	                	displayField: 'Name',
	                	valueField: 'Id',
	               		queryMode: 'local',
	               		editable: false,
	               		forceSelection: true,
	                	value: '201407'
        		},
			{
					xtype : 'label',
                    margin: '20 10 0 0',
					name : 'ufsliderlabeltitle',
					text : 'Minimum Percentage'
			},
			{
					xtype : 'slider',
                    name : 'ufslider',
                    width : 250,
                    useTips : true,
                    margin : '10 0 0 5',
                    maxValue : 100,
                    value : 20
			},
			{
					xtype : 'button',
					width : 150,
					margin : '10 0 0 0',
					text : 'Display',
			}
		]
}

// Results Panel (id: results_panel)
Ext.define('CG.view.ResultPanel', {
		extend: 'Ext.panel.Panel',
		xtype: 'cgx4_urbanflowpanel',
		bodyPadding: '5 10',
		collapseMode: 'header',
		items: [
	            {
                xtype : 'tabpanel', // Create a tab panel
                width:  300,
                height: 300,
                activeTab: 0,
                items:  [
                        {
                            // The grid panel to select the purpose and dominant language
                            title: 'Query',
                            bodyPadding: 10,
                            items: aggregationOptions
                        },
                        {
                            // The panel to download
                            title: 'Download',
                            bodyPadding: 10,
                            items: [
                            {
                                xtype : 'button',
                                width : 150,
                                margin : '10 0 0 0',
                                text : 'Download',
                            }
                                ]
                        }
                        ]
            }
        ]
});
