sap.ui.define([
    "portoseguro/zpstastatusmon/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
     'sap/ui/model/json/JSONModel',
     "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Fragment, Filter, FilterOperator, ChartFormatter, Format,JSONModel,MessageToast) {
        "use strict";

        return BaseController.extend("portoseguro.zpstastatusmon.controller.Main", {
            onInit: function () {
                var that = this;
				
				// Definição de propriedades do VizFrame(Gráfico) das tabelas de histórico
				Format.numericFormatter(ChartFormatter.getInstance());
				var formatPattern = ChartFormatter.DefaultPattern;

				var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
				oVizFrame.setVizProperties({
					plotArea: {
						dataLabel: {
							formatString: formatPattern.SHORTFLOAT_MFD2,
							visible: false
						}
					},
					valueAxis: {
						label: {
							formatString: formatPattern.SHORTFLOAT
						},
						title: {
							text: 'Nº de registros',
							visible: true
						}
					},
					categoryAxis: {
						title: {
							visible: true,
							text: 'Tabelas'
						}
					},
					title: {
						visible: true,
						text: 'Registros processados com sucesso'
					},
					sizeLegend: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						title: {
							visible: true
						}
					}
				});

				// this.oPopOver = this.getView().byId("idPopOver");
				// this.oPopOver.connect(oVizFrame.getVizUid());
				// this.oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
				
				// setInterval(function () {
				// 		//refresh automatico somente na view inicial
				// 		if(that.getRouter().getHashChanger().hash === ''){
				// 			var oHistModel = that.getView().getModel("HistService");
				// 			var	oDefaultModel = that.getView().getModel();
						
				// 			oHistModel.refresh();
				// 			oDefaultModel.refresh();	
				// 		}
						
						
				// }, 10000);
				
				//EM DESENVOLVIMENTO
				//this.initProcessFlowModel();
            },

            // Abrir a caixa de pesquisa(Dialog)
			onSearchStsInb: function (oEvent) {
				var oButton = oEvent.getSource().sId;
				var inbName = "portoseguro.zpstastatusmon.view.Dialogs.SearchDialogInb";

				if (!this._oDialogInb) {
					Fragment.load({
						name: inbName,
						controller: this
					}).then(function (oDialog) {
						this._oDialogInb = oDialog;
						this._oDialogInb.setModel(this.getView().getModel());
						this.getView().addDependent(this._oDialogInb);
						this._oDialogInb.open();
					}.bind(this));
				} else {
					this._oDialogInb.open();
				}
			},
			
			onSearchFbStatusProc: function(oEvent){
				
				var oLstProcFlow = this.getView().byId("lstProcFlow");
				var oSelectedConector = oEvent.getParameter("selectionSet")[1].getSelectedKey(),
					oDateProcess = oEvent.getParameter("selectionSet")[0];
				
				var aFilters = [];
				
				
				if(!oDateProcess.getDateValue()){
					MessageToast.show("Data do Processamento não informada!");
					return;
				}
					
					var strDate = oDateProcess.getDateValue().toISOString();
					strDate = strDate.substring(0,10);
					
					aFilters.push(new Filter(
					                "data_criacao",
					                FilterOperator.Contains,
					                strDate));
				
				
				oSelectedConector = parseInt(oSelectedConector);
				if(oSelectedConector > 0){
					aFilters.push(new Filter(
					                "codigo_conector",
					                FilterOperator.EQ,
					                oSelectedConector));
				}
				
				
				
				oLstProcFlow.getBinding("items").filter(aFilters);
				
			},

			onSearchStsStg: function (oEvent) {
				var oButton = oEvent.getSource().sId;
				var stgName = "portoseguro.zpstastatusmon.view.Dialogs.SearchDialogStg";

				if (!this._oDialogStg) {
					Fragment.load({
						name: stgName,
						controller: this
					}).then(function (oDialog) {
						this._oDialogStg = oDialog;
						this._oDialogStg.setModel(this.getView().getModel());
						this.getView().addDependent(this._oDialogStg);
						this._oDialogStg.open();
					}.bind(this));
				} else {
					this._oDialogStg.open();
				}
			},

			// Filtrar conteúdo da GridList por status.
			onstsFilterInb: function () {
				var sId = "DialogInputStsInb";
				var stsCoreInb = sap.ui.getCore().byId(sId).getSelectedItems();

				//	Array para filtros
				var aFilterInb = [];

				//	Laços de repetição que cria filtros no Array de filtros
				if (stsCoreInb) {
					for (var i = 0; i < stsCoreInb.length; i++) {
						var stsItems = stsCoreInb[i];
						aFilterInb.push(
							new Filter({
								path: 'status',
								operator: FilterOperator.Contains,
								value1: stsItems.getText()
							})
						);
					}
				}
				//Insere novo filtro na gridList
				var gridList = 'gridList' + sId.slice(14);
				var oList = this.byId(gridList);
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilterInb);

				this._oDialogInb.close();
			},

			onstsFilterStg: function () {
				var sId = "DialogInputStsStg";
				var stsCoreStg = sap.ui.getCore().byId(sId).getSelectedItems();

				//	Array para filtros
				var aFilterStg = [];

				//	Laços de repetição que cria filtros no Array de filtros
				if (stsCoreStg) {
					for (var i = 0; i < stsCoreStg.length; i++) {
						var stsItems = stsCoreStg[i];
						aFilterStg.push(
							new Filter({
								path: 'status',
								operator: FilterOperator.Contains,
								value1: stsItems.getText()
							})
						);
					}
				}
				//Insere novo filtro na gridList
				var gridList = 'gridList' + sId.slice(14);
				var oList = this.byId(gridList);
				var oBinding = oList.getBinding("items");
				oBinding.filter(aFilterStg);

				this._oDialogStg.close();
			},

			// Limpar busca realizada na GridList.
			onResetsearch: function (oEvent) {
				var sId = oEvent.oSource.oParent.sId.slice(4);
				sap.ui.getCore().byId(sId).removeAllSelectedItems();

				var gridList = 'gridList' + sId.slice(14);
				var oList = this.byId(gridList);
				var oBinding = oList.getBinding("items");
				oBinding.filter([]);
			},

			// Função de navegação, com validação de status para tabelas Inbound e Stage.
			onNavDetail: function (oEvent) {
				var evtContext = oEvent.getSource().getBindingContext();
				var evtId;
				// var evtId = 'Target' + oEvent.mParameters.id.substr(64,13);

				if (evtContext !== undefined) {
					evtId = 'Target' + oEvent.mParameters.id.substr(64,13);
					var selectedStatus = evtContext.getProperty("Status");
					var appendStatus = {
						status: selectedStatus
					};

					this.getRouter().navTo(evtId, appendStatus);
				} else {
					evtId = 'Target' + oEvent.mParameters.id.substr(64);
					this.getRouter().navTo(evtId, {});
				}
			},
			
			initProcessFlowModel: function (){
				
				//Em Desenvolvimento
				/*	var oPfModel = new JSONModel({
						results:[{
							data_criacao: "2022-08-04 10:00",
							data_ini_execucao: "2022-08-04 23:00",
							data_fim_execucao: "2022-08-05 01:00",
							codigo_conector: 1,
							descricao_conector: "Conector 1 - Auto",
							nodes: [{
										id: "1",
										lane: "0",
										title: "Api Pré",
										titleAbbreviation: "Api Pre",
										children: [ 2 ],
										state: "Positive",
										stateText: "OK status",
										focused: true,
										node_type: "Aggregated",
										texts: [
											"Inicio: 23:06",
											"Fim: 23:07"
											]
									},
									{
										id: "2",
										lane: "1",
										title: "Api Principal",
										titleAbbreviation: "API Princ",
										children: [ 3 ],
										state: "Positive",
										stateText: "OK status",
										focused: true,
										node_type: "Aggregated",
										texts: [
											"Inicio: 23:06",
											"Fim: 00:07"
											]
									},
									{
										id: "3",
										lane: "2",
										title: "Transfer Outbound",
										titleAbbreviation: "TR OUT",
										children: [ 4 ],
										state: "Positive",
										stateText: "OK status",
										focused: true,
										node_type: "Single",
										texts: [
											"Inicio: 23:08",
											"Fim: 23:09"
											]
									},
									{
										id: "4",
										lane: "3",
										title: "SAP FPSL",
										titleAbbreviation: "FPSL",
										children: [ 5 ],
										state: "Negative",
										stateText: "NOT OK",
										focused: false,
										node_type: "Aggregated",
										texts: null
									},
									{
										id: "5",
										lane: "4",
										title: "Api Retorno",
										titleAbbreviation: "API RET",
										children: [  ],
										state: "Negative",
										stateText: "NOT OK",
										focused: false,
										node_type: "Aggregated",
										texts: null
									}
								],
								lanes: [
									{
										id: "0",
										icon: "sap-icon://filter",
										label: "Api Pré",
										position: 0
									},
									{
										id: "1",
										icon: "sap-icon://developer-settings",
										label: "Api Principal",
										position: 1
									},
										{
										id: "2",
										icon: "sap-icon://translate",
										label: "Transfer Outbound",
										position: 2
									},
									{
										id: "3",
										icon: "sap-icon://sap-box",
										label: "SAP FPSL",
										position: 3
									},
									{
										id: "4",
										icon: "sap-icon://multiselect-all",
										label: "Api Retorno",
										position: 4
									}
								]
							
						}
						]});
				
			
				
				 this.getView().setModel(oPfModel,"pflowModel");
				 
				 	var oFbStatusProc = this.getView().byId("fbStatusProc"),
					odtPckrProcess = oFbStatusProc.getAggregation("filterGroupItems")[0].getControl();
					
					odtPckrProcess.setDateValue(new Date());*/
			}
        });
    });
