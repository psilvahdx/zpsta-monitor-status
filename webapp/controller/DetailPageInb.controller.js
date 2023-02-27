sap.ui.define([
    "portoseguro/zpstastatusmon/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
function (BaseController, Filter, FilterOperator, JSONModel) {
    "use strict";

    return BaseController.extend("portoseguro.zpstastatusmon.controller.DetailPageInb", {
        onInit: function () {

            var oRouter, oTarget;
            oRouter = this.getRouter();
            oTarget = oRouter.getTarget("TargetDetailPageInb");
            oTarget.attachDisplay(function (oEvent) {
                //this.onBindingBtn('false', 'false');
                this._oValueData = oEvent.getParameter("data");
                this.getView().setModel(this.getOwnerComponent().getModel("InboundServ"));
                var ModelIcon = this.getView().getModel("ModelIconTabFilter");
                ModelIcon.setProperty("/nTotal_Tab", 0);
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_SOCEXT/$count", this._oValueData.status, "/nTotal_SOCEXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_SINEXT/$count", this._oValueData.status, "/nTotal_SINEXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_SEGEXT/$count", this._oValueData.status, "/nTotal_SEGEXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_SINSEX/$count", this._oValueData.status, "/nTotal_SINSEX");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_PRVEXT/$count", this._oValueData.status, "/nTotal_PRVEXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_COMPGT/$count", this._oValueData.status, "/nTotal_COMPGT");
                // resseguro
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_EXT/$count", this._oValueData.status, "/nTotal_R_EXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_SINEXT/$count", this._oValueData.status, "/nTotal_R_SINEXT");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_PRVPRE/$count", this._oValueData.status, "/nTotal_R_PRVPRE");
                this.onAttachDisplay(oEvent, "/OZPSTA_INB_R_PRVSIN/$count", this._oValueData.status, "/nTotal_R_PRVSIN");
            }, this);
            
            
                this.onModelFix("idIconTabBarInb");

            var oModelIconTabFilter = new JSONModel({
                nTotal_Tab: 0,
                nTotal_SOCEXT: 0,
                nTotal_SINEXT: 0,
                nTotal_SEGEXT: 0,
                nTotal_SINSEX: 0,
                nTotal_PRVEXT: 0,
                nTotal_COMPGT: 0,
                nTotal_R_EXT: 0,
                nTotal_R_SINEXT: 0,
                nTotal_R_PRVPRE: 0,
                nTotal_R_PRVSIN: 0,
                status: ''
            });
            this.getView().setModel(oModelIconTabFilter, "ModelIconTabFilter");
        },
        
        onModelFix: function (sTable) {
            this.getView().byId(sTable).setModel(this.getOwnerComponent().getModel("InboundServ"));
        },

        onAttachDisplay: function (oEvent, sPath, oStatus, tModel) {
            //this._oData = oEvent.getParameter("data");
            //var aFilters = [];
            //aFilters.push(new Filter("status", FilterOperator.EQ, 'wait'));
            var oInboundServ = this.getView().getModel("InboundServ");
            var that = this;
            
            
            var aBtnGo = [
                this.byId("smartFilterBarSocext-btnGo"),
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
            
            var tblFilters = [];
                tblFilters.push(
                new Filter({
                    path: 'Status',
                    operator: FilterOperator.Contains,
                    value1: oStatus
                })
            );

            var oBinding = this.byId("tblResumeStatusInb").getBinding('items');
            oBinding.filter(tblFilters);
            

            oInboundServ.read(sPath, {
                //filters: [aFilters],

                urlParameters: {
                    "$filter": "Status eq" + "'" + oStatus + "'"
                },

                success: function (oData, oStatus) {
                    var ModelIcon = that.getView().getModel("ModelIconTabFilter");
                    var refNum = parseInt(oData);
                    ModelIcon.setProperty(tModel, refNum);
                    
                    ModelIcon.setProperty("/status", that._oValueData.status);

                    var TotalTab = ModelIcon.getProperty("/nTotal_Tab");
                    TotalTab += refNum;
                    ModelIcon.setProperty("/nTotal_Tab", TotalTab);

                },

                error: function (oError) {
                    console.log(oError);
                }
            });
        },

        onFilterTableInb: function (oEvent) {
            var tblFilters = [];
            var oStatus = this._oValueData.status;
            var oItem = oEvent.getParameter('selectedItem');
            var oTable = 'tbl' + oItem.getProperty('text');
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
        
        // onDataReceived: function(oEvent){
            
        //     var oTable = this.byId("tblSEGEXT");
            
        //     //otimiza tamanho das colunas
        //     oTable.getTable().getColumns().forEach(function (oLine) {
        //             oLine.setProperty("width","10rem");
        //     });
            
        //     //formata campos de data para o padrão dd/MM/yyyy HH:mm:ss e UTC
        //     var oTableData = oEvent.getParameters().getParameter("data");
        //     var oDataRows = oTableData.results;
            
        //     for (var i=0; i<oDataRows.length; i++) {
        //         var oRow = oDataRows[i];
                
        //             for (var key in oRow) {
        //                 if (typeof oRow[key] == "object") {
                            
        //                     if(key.includes("data_")){
                            
        //                     let oDateFormart = sap.ui.core.format.DateFormat.getDateTimeInstance({
        //                                         pattern: "dd/MM/yyyy HH:mm:ss"
        //                                     });
                                
        //                         oRow[key] = oDateFormart.format(new Date(oRow[key]),true);	
                                
        //                     }
        //                 }
        //             }
        //     }
        // },
        
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

        /*onBindingBtn : function(mValue, pValue){
            var monitorErros = this.byId("mErros");
            var oParametros = this.byId("mParametros");
                    
            monitorErros.bindProperty('visible', mValue);
            monitorErros.bindProperty('enabled', mValue);
            oParametros.bindProperty('visible', pValue);
            oParametros.bindProperty('enabled', pValue);
        }*/
    });
});