sap.ui.define([
	"portoseguro/zpstastatusmon/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
	function (BaseController,Filter, FilterOperator, JSONModel) {
		"use strict";

		return BaseController.extend("portoseguro.zpstastatusmon.controller.DetailPageStg", {
			onInit: function () {
				
                var oRouter, oTarget;
                    oRouter = this.getRouter();
                    oTarget = oRouter.getTarget("TargetDetailPageStg");
                    oTarget.attachDisplay(function (oEvent) {
		            	this._oValueData = oEvent.getParameter("data");
		            	this.getView().setModel(this.getOwnerComponent().getModel("StageServ"));
						//this.getView().byId("tblSOCEXT").rebindTable();
		            	var ModelIcon = this.getView().getModel("ModelIconTabFilterStg");
		            		ModelIcon.setProperty("/nTotal_Tab", 0);
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_PRE/$count", this._oValueData.status, "/nTotal_PRE");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_SIN/$count", this._oValueData.status, "/nTotal_SIN");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_PRV/$count", this._oValueData.status, "/nTotal_PRV");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_SOC/$count", this._oValueData.status, "/nTotal_SOC");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_SIS/$count", this._oValueData.status, "/nTotal_SIS");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_CPG/$count", this._oValueData.status, "/nTotal_CPG");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_SGS/$count", this._oValueData.status, "/nTotal_SGS");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_R_PRE/$count", this._oValueData.status, "/nTotal_R_PRE");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_R_SIN/$count", this._oValueData.status, "/nTotal_R_SIN");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_R_PPR/$count", this._oValueData.status, "/nTotal_R_PPR");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_STG_BT_R_PSI/$count", this._oValueData.status, "/nTotal_R_PSI");
		            }, this);
						
					this.onModelFix("idIconTabBarStg");	
						
			    	var oModelIconTabFilter = new JSONModel({
			    		nTotal_Tab: 0,
						nTotal_PRE: 0,
						nTotal_SIN: 0,
						nTotal_PRV: 0,
						nTotal_SOC: 0,
						nTotal_SIS: 0,
						nTotal_CPG: 0,
						nTotal_SGS: 0,
						nTotal_R_PRE: 0,
						nTotal_R_SIN: 0,
						nTotal_R_PPR: 0,
						nTotal_R_PSI: 0,
						status:	""
					});
					this.getView().setModel(oModelIconTabFilter, "ModelIconTabFilterStg");
            },
            
            onModelFix: function (sTable) {
				this.getView().byId(sTable).setModel(this.getOwnerComponent().getModel("StageServ"));
			},
            
            onAttachDisplay : function (oEvent, sPath, oStatus, tModel) {
	        	var oStageServ =  this.getView().getModel("StageServ");
	        	var that = this;
	        	
	        	var tblFilters = [];
	        	
	        	
	        	var aBtnGo = [this.byId("smartFilterBarSoc-btnGo"),
							  this.byId("smartFilterBarPre-btnGo"),
							  this.byId("smartFilterBarSin-btnGo"),
							  this.byId("smartFilterBarSis-btnGo"),
							  this.byId("smartFilterBarPrv-btnGo"),
							  this.byId("smartFilterBarCpg-btnGo"),
							  this.byId("smartFilterBarSgs-btnGo"),
							  this.byId("smartFilterBarRPRE-btnGo"),
							  this.byId("smartFilterBarRSIN-btnGo"),
							  this.byId("smartFilterBarRprvPre-btnGo"),
							  this.byId("smartFilterBarRPrvSin-btnGo")];
					
				
				for (var i=0; i<aBtnGo.length; i++) {
					var oBtnGo = aBtnGo[i];
						oBtnGo.setText(this.geti18NText("FILTER_BAR_GO"));
				}

				this.byId("smartFilterBarSoc")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSoc")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarPre")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSin")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSis")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarPrv")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarCpg")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSgs")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRPRE")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRSIN")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRprvPre")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRPrvSin")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
	        	
	        	
	        	var selectedTable = this.byId("tblResumeStatusStg");
				
	                tblFilters.push(
	                        new Filter({
	                            path: 'Status',
	                            operator: FilterOperator.Contains,
	                            value1: oStatus
	                        })
	                    );
				
                var oBinding = selectedTable.getBinding('items');
                oBinding.filter(tblFilters);
	        	
	        	oStageServ.read(sPath, {
					//filters: [aFilters],
					
					urlParameters: {
						"$filter": "Status eq"+"'"+oStatus+"'"
					},
					
					success: function (oData) {
						var ModelIcon = that.getView().getModel("ModelIconTabFilterStg");
						var refNum = parseInt(oData);
						ModelIcon.setProperty(tModel, refNum);
						
						ModelIcon.setProperty("/status", that._oValueData.status);
						
						var TotalTab = ModelIcon.getProperty("/nTotal_Tab");
						TotalTab+= refNum;
						ModelIcon.setProperty("/nTotal_Tab", TotalTab);
					},
				
					error: function (oError) {
						console.log(oError);
					}
				});
            },
            
            onFilterTableStg: function (oEvent) {
            	var tblFilters = [];
            	var oStatus = this._oValueData.status;
            	var oItem = oEvent.getParameter('selectedItem');
				var oTable = 'tbl'+oItem.getProperty('text');
				var selectedTable = this.byId(oTable);
				
				if(selectedTable){
	                tblFilters.push(
	                        new Filter({
	                            path: 'Status',
	                            operator: FilterOperator.Contains,
	                            value1: oStatus
	                        })
	                    );
				
                var oBinding = selectedTable.getTable().getBinding('rows');
                oBinding.filter(tblFilters);
				}
			},
			
			onBeforeRebindTable: function (oEvent){
			
				var oBdParams = oEvent.getParameters("bindingParams");
				
				var statusFilter;
				statusFilter = new Filter({
							path: 'Status',
							operator: FilterOperator.Contains ,
							value1: this._oValueData.status
						});
						
				if(oBdParams){
					oBdParams.bindingParams.filters.push(statusFilter);
				}
			},
			
			onCrossNav: function (oEvent) {
				var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); // get a handle on the global XAppNav service
				var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
					target: {
						semanticObject: "pstaMonitor",
						action: "show"
					},
					params: {
					}
				})) || ""; // generate the Hash to display a Supplier
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: hash
					}
				});
			}

    });
});