sap.ui.define([
	"portoseguro/zpstastatusmon/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
	function (BaseController, Filter, FilterOperator, JSONModel) {
		"use strict";

		return BaseController.extend("portoseguro.zpstastatusmon.controller.DetailPageHist", {
			onInit: function () {
				var oRouter, oTarget;
                    oRouter = this.getRouter();
                    oTarget = oRouter.getTarget("TargetDetailPageHist");
                    oTarget.attachDisplay(function (oEvent) {
		            	this._oValueData = 'FPSL_PROCESSADO';
		            	this.getView().setModel(this.getOwnerComponent().getModel("HistServ"));
						var ModelIcon = this.getView().getModel("ModelIconTabFilterHist");
		            		ModelIcon.setProperty("/nTotal_Tab", 0);
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_SOCEXH/$count", this._oValueData.status, "/nTotal_SOCEXH");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_SINEXH/$count", this._oValueData.status, "/nTotal_SINEXH");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_SEGEXH/$count", this._oValueData.status, "/nTotal_SEGEXH");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_SINSEH/$count", this._oValueData.status, "/nTotal_SINSEH");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_PRVEXH/$count", this._oValueData.status, "/nTotal_PRVEXH");
		            	this.onAttachDisplay(oEvent, "/OZPSTA_INB_COMPGH/$count", this._oValueData.status, "/nTotal_COMPGH");
		            		//resseguro
						this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_EXH/$count", this._oValueData.status, "/nTotal_R_EXH");
						this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_SINEXH/$count", this._oValueData.status, "/nTotal_R_SINEXH");
						this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_PRVPRH/$count", this._oValueData.status, "/nTotal_R_PRVPRH");
						this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_PRVSIH/$count", this._oValueData.status, "/nTotal_R_PRVSIH");
		            }, this);
						
						this.onModelFix("idIconTabBarHist");		
			    	var oModelIconTabFilter = new JSONModel({
			    		nTotal_Tab: 0,
						nTotal_SOCEXH: 0,
						nTotal_SINEXH: 0,
						nTotal_SEGEXH: 0,
						nTotal_SINSEH: 0,
						nTotal_PRVEXH: 0,
						nTotal_COMPGH: 0,
						nTotal_R_EXH: 0,
						nTotal_R_SINEXH: 0,
						nTotal_R_PRVPRH: 0,
						nTotal_R_PRVSIH: 0
					});
					this.getView().setModel(oModelIconTabFilter, "ModelIconTabFilterHist");
            },
            
            onModelFix: function (sTable) {
				this.getView().byId(sTable).setModel(this.getOwnerComponent().getModel("HistServ"));
			},
            
            onAttachDisplay : function (oEvent, sPath, oStatus, tModel) {
				
				var oHistService = this.getView().getModel("HistServ");
				var that = this;
				
					var aBtnGo = [this.byId("smartFilterBarSocext-btnGo"),
							  	  this.byId("smartFilterBarSegext-btnGo"),
							  	  this.byId("smartFilterBarSinext-btnGo"),
							  	  this.byId("smartFilterBarSinsex-btnGo"),
							  	  this.byId("smartFilterBarPrvext-btnGo"),
							  	  this.byId("smartFilterBarCompgt-btnGo"),
							  	  this.byId("smartFilterBarRext-btnGo"),
							  	  this.byId("smartFilterBarRsinext-btnGo"),
							  	  this.byId("smartFilterBarRprvPre-btnGo"),
							  	  this.byId("smartFilterBarRPrvSin-btnGo")];
					
				
				for (var i=0; i<aBtnGo.length; i++) {
					var oBtnGo = aBtnGo[i];
						oBtnGo.setText(this.geti18NText("FILTER_BAR_GO"));
				}
				
				this.byId("smartFilterBarSocext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSegext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSinext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarSinsex")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarPrvext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarCompgt")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRsinext")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRprvPre")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));
				this.byId("smartFilterBarRPrvSin")._oHintText.setText(this.geti18NText("FILTER_BAR_NO_FILTER"));

				oHistService.read(sPath, {
					urlParameters: {
						"$filter": "Status eq 'FPSL_PROCESSADO'"
					},

					success: function (oData) {
						var ModelIcon = that.getView().getModel("ModelIconTabFilterHist");
						var refNum = parseInt(oData);
						ModelIcon.setProperty(tModel, refNum);
						
						//ModelIcon.setProperty("/status", 'FLPSL');

						var TotalTab = ModelIcon.getProperty("/nTotal_Tab");
						TotalTab += refNum;
						ModelIcon.setProperty("/nTotal_Tab", TotalTab);

					},

					error: function (oError) {
						console.log(oError);
					}
				});
            },
            
            onNavToExtApp: function (oEvent){
            	
            	var vAction = "";
					vAction = "show";
					var n = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
					this.oCrossAppNavigator = n && n("CrossApplicationNavigation");
					if (this.oCrossAppNavigator) {
					this.oCrossAppNavigator.toExternal({
						target: {
							semanticObject: "pstaMonitor",
							action: vAction
							}
						});
					}
            }
            
           
    });
});