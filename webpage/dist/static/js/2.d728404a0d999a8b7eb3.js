webpackJsonp([2],{274:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),i=n.n(a),o=n(6),r=n.n(o),l=n(2),s=n(582),d=n.n(s);e.default={components:{edittable:d.a},data:function(){var t=this;return{dataset:l.a.computer_room,item:{},basename:[],sqlname:[],TableDataOld:[],TableDataNew:[],tableform:{sqlname:[],basename:[],info:[]},tabcolumns:[{title:"字段名",key:"Field"},{title:"字段类型",key:"Type",editable:!0},{title:"字段是否为空",key:"Null",editable:!0,option:!0},{title:"默认值",key:"Default",editable:!0},{title:"索引类型",key:"Key"},{title:"备注",key:"Extra"},{title:"操作",align:"center",width:190,key:"handle",handle:["edit","delete"]}],putdata:[],Add_tmp:{Field:"",Type:"",Null:null,Default:null,Extra:null,Len:"",Species:null},add_row:[],username:i.a.get("user"),addcolums:[{title:"字段名",key:"Field"},{title:"字段类型",key:"Type"},{title:"是否为空",key:"Null"},{title:"默认值",key:"Default"},{title:"备注",key:"Extra"},{title:"action",width:80,render:function(e,n){return e("Button",{props:{type:"text"},on:{click:function(){t.$Notice.error({title:t.add_row[n.index].Field+"-临时字段删除成功!"}),t.add_row.splice(n.index,1)}}},"删除")}}],sql:[],openswitch:!1,pass:!1,ruleValidate:{computer_room:[{required:!0,message:"机房地址不得为空",trigger:"change"}],connection_name:[{required:!0,message:"连接名不得为空",trigger:"change"}],basename:[{required:!0,message:"数据库名不得为空",trigger:"change"}],tablename:[{required:!0,message:"表名不得为空",trigger:"change"}],text:[{required:!0,message:"说明不得为空",trigger:"change"},{type:"string",max:20,message:"最多20个字",trigger:"blur"}]},formItem:{text:"",computer_room:"",connection_name:"",basename:"",tablename:"",backup:0,assigned:""},id:null,tabs:"order1",optionData:["varchar","int","char","tinytext","text","mediumtext","longtext","tinyint","smallint","mediumint","bigint"],assigned:[]}},methods:{Connection_Name:function(t){t&&this.ScreenConnection(t)},DataBaseName:function(t){var e=this;t&&(this.id=this.item.filter(function(e){if(e.connection_name===t)return e}),r.a.put(l.a.url+"/workorder/basename",{id:this.id[0].id}).then(function(t){e.tableform.basename=t.data}).catch(function(){e.$Notice.error({title:"警告",desc:"无法连接数据库!请检查网络"})}))},ScreenConnection:function(t){this.tableform.sqlname=this.item.filter(function(e){if(e.computer_room===t)return e})},GetTableName:function(){var t=this;if(this.formItem.basename){var e=JSON.stringify(this.formItem);r.a.put(l.a.url+"/workorder/tablename",{data:e,id:this.id[0].id}).then(function(e){t.tableform.info=e.data}).catch(function(e){l.a.ajanxerrorcode(t,e)})}},getdatabases:function(){var t=this;this.delinfo(),r.a.put(l.a.url+"/workorder/connection").then(function(e){t.item=e.data.connection,t.assigned=e.data.person}).catch(function(e){l.a.ajanxerrorcode(t,e)})},getinfo:function(){var t=this;this.$refs.formItem.validate(function(e){e?(t.$Spin.show({render:function(t){return t("div",[t("Icon",{class:"demo-spin-icon-load",props:{type:"load-c",size:30}}),t("div","数据库连接中,请稍后........")])}}),t.formItem.table_name=t.formItem.tablename,r.a.put(l.a.url+"/workorder/field",{connection_info:JSON.stringify(t.formItem),id:t.id[0].id}).then(function(e){t.TableDataOld=e.data,t.TableDataNew=Array.from(t.TableDataOld),t.$Spin.hide()}).catch(function(){t.$Notice.error({title:"警告",desc:"连接失败！详细信息请查看日志"})}),t.getindex()):t.$Message.error("表单验证失败!")})},AddColumns:function(){if(""===this.Add_tmp.Field||null===this.Add_tmp.Null||""===this.Add_tmp.Species)this.$Notice.warning({title:"字段名,是否为空，类型为必填项"});else{this.Add_tmp.Extra&&(this.Add_tmp.Extra=this.Add_tmp.Extra.replace(/\s+/g,"")),""!==this.Add_tmp.Len?this.Add_tmp.Type=this.Add_tmp.Species+"("+this.Add_tmp.Len+")":this.Add_tmp.Type=""+this.Add_tmp.Species,this.add_row.push(JSON.parse(JSON.stringify(this.Add_tmp)));var t=!0,e=!1,n=void 0;try{for(var a,i=Object.keys(this.Add_tmp)[Symbol.iterator]();!(t=(a=i.next()).done);t=!0){var o=a.value;this.Add_tmp[o]="",this.Add_tmp.Default=null,this.Add_tmp.Extra=null}}catch(t){e=!0,n=t}finally{try{!t&&i.return&&i.return()}finally{if(e)throw n}}}},ClearColumns:function(){this.Add_tmp={}},remove:function(t){this.putdata.push({del:t,table_name:this.formItem.tablename})},canel:function(){this.$refs.formItem.resetFields(),this.delinfo()},edit_tab:function(t){this.TableDataNew[t.index]=t.row,this.$Notice.success({title:t.row.Field+"-字段修改成功!"})},confirmsql:function(){var t=this;""!==this.Add_tmp.Field?this.$Notice.warning({title:"警告",desc:"请将需要添加的字段添加进入临时表或者删除!"}):(this.TableDataNew.forEach(function(e,n){t.TableDataNew[n].Type===t.TableDataOld[n].Type&&t.TableDataNew[n].Field===t.TableDataOld[n].Field&&t.TableDataNew[n].Default===t.TableDataOld[n].Default&&t.TableDataNew[n].Extra===t.TableDataOld[n].Extra&&t.TableDataNew[n].Null===t.TableDataOld[n].Null||t.putdata.push({edit:t.TableDataNew[n],table_name:t.formItem.tablename})}),this.putdata.push({add:this.add_row,table_name:this.formItem.tablename}),r.a.put(l.a.url+"/sqlorder/sql",{data:JSON.stringify(this.putdata),basename:this.formItem.basename}).then(function(e){var n=!0,a=!1,i=void 0;try{for(var o,r=e.data[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value;t.sql.push(l)}}catch(t){a=!0,i=t}finally{try{!n&&r.return&&r.return()}finally{if(a)throw i}}t.putdata=[],t.add_row=[]}).catch(function(e){l.a.ajanxerrorcode(t,e)}))},delinfo:function(){this.tableform.sqlname=[],this.tableform.basename=[],this.tableform.info=[],this.formItem.connection_name="",this.formItem.computer_room="",this.formItem.basename="",this.formItem.table_name="",this.formItem.tablename="",this.TableDataOld=[],this.TableDataNew=[],this.sql=[],this.pass=!1},orderswitch:function(){this.openswitch=!this.openswitch},commitorder:function(){var t=this;!0===this.pass?r.a.post(l.a.url+"/sqlsyntax/",{data:JSON.stringify(this.formItem),sql:JSON.stringify(this.sql),user:i.a.get("user"),type:0,id:this.id[0].id}).then(function(e){t.$Notice.success({title:"通知",desc:e.data}),t.$router.push({name:"myorder"})}).catch(function(e){l.a.ajanxerrorcode(t,e)}):this.$Notice.warning({title:"注意",desc:"提交工单需点击确认按钮"})}},mounted:function(){this.getdatabases()}}},279:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(t,e,n,a){return e("Button",{props:{type:n.editting?"success":"primary",loading:n.saving},style:{margin:"0 5px"},on:{click:function(){if(n.editting){t.edittingStore[a].saving=!0,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore));var e=t.edittingStore[a];e.editting=!1,e.saving=!1,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore)),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-change",t.handleBackdata(t.thisTableData),a)}else{if(n.edittingCell)for(var i in n.edittingCell)n.edittingCell[i]=!1,t.edittingStore[a].edittingCell[i]=!1;t.edittingStore[a].editting=!0,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore))}}}},n.editting?"保存":"编辑")},i=function(t,e,n,a){return e("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗?",transfer:!0},on:{"on-ok":function(){var e=t.thisTableData[a];t.thisTableData.splice(a,1),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-delete",t.handleBackdata(t.thisTableData),a),t.$emit("index",e)}}},[e("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"删除")])},o=function(t,e,n){return t.hoverShow?e("div",{class:{"show-edit-btn":t.hoverShow}},[e("Button",{props:{type:"text",icon:"edit"},on:{click:function(e){t.edittingStore[n.index].edittingCell[n.column.key]=!0,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore))}}})]):e("Button",{props:{type:"text",icon:"edit"},on:{click:function(e){t.edittingStore[n.index].edittingCell[n.column.key]=!0,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore))}}})},r=function(t,e,n){return e("Button",{props:{type:"text",icon:"checkmark"},on:{click:function(e){t.edittingStore[n.index].edittingCell[n.column.key]=!1,t.thisTableData=JSON.parse(JSON.stringify(t.edittingStore)),t.$emit("input",t.handleBackdata(t.thisTableData)),t.$emit("on-cell-change",t.handleBackdata(t.thisTableData),n.index,n.column.key)}}})},l=function(t,e,n,a){return e("Input",{props:{type:"text",value:t.edittingStore[n.index][a.key]},on:{"on-change":function(e){var i=a.key;t.edittingStore[n.index][i]=e.target.value}}})};e.default={name:"canEditTable",props:{refs:String,columnsList:Array,value:Array,url:String,editIncell:{type:Boolean,default:!1},hoverShow:{type:Boolean,default:!1}},data:function(){return{columns:[],thisTableData:[],edittingStore:[]}},created:function(){this.init()},methods:{init:function(){var t=this,e=this,n=this.columnsList.filter(function(t){if(t.editable&&!0===t.editable)return t}),s=JSON.parse(JSON.stringify(this.value)),d=[];d=s.map(function(e,a){var i=!1;if(t.thisTableData[a])if(t.thisTableData[a].editting)i=!0;else for(var o in t.thisTableData[a].edittingCell)!0===t.thisTableData[a].edittingCell[o]&&(i=!0);if(i)return t.thisTableData[a];t.$set(e,"editting",!1);var r={};return n.forEach(function(t){r[t.key]=!1}),t.$set(e,"edittingCell",r),e}),this.thisTableData=d,this.edittingStore=JSON.parse(JSON.stringify(this.thisTableData)),this.columnsList.forEach(function(n){n.editable&&(n.render=function(a,i){var s=t.thisTableData[i.index];return s.editting?n.option?a("Select",{props:{type:"text",value:s[n.key]},on:{"on-change":function(t){var n=i.column.key;e.edittingStore[i.index][n]=t}}},[a("Option",{props:{key:"YES",value:"YES"}},"YES"),a("Option",{props:{key:"NO",value:"NO"}},"NO")]):a("Input",{props:{type:"text",value:s[n.key]},on:{"on-change":function(t){var n=i.column.key;e.edittingStore[i.index][n]=t.target.value}}}):t.editIncell?a("Row",{props:{type:"flex",align:"middle",justify:"center"}},[a("Col",{props:{span:"22"}},[s.edittingCell[i.column.key]?l(t,a,i,n):a("span",s[n.key])]),a("Col",{props:{span:"2"}},[s.edittingCell[i.column.key]?r(t,a,i):o(t,a,i)])]):a("span",s[n.key])}),n.handle&&(n.render=function(e,o){var r=t.thisTableData[o.index];return 2===n.handle.length?e("div",[a(t,e,r,o.index),i(t,e,0,o.index)]):1===n.handle.length?"edit"===n.handle[0]?e("div",[a(t,e,r,o.index)]):e("div",[i(t,e,0,o.index)]):void 0})})},handleBackdata:function(t){var e=JSON.parse(JSON.stringify(t));return e.forEach(function(t){delete t.editting,delete t.edittingCell,delete t.saving}),e}},watch:{value:function(t){this.init()}}}},292:function(t,e,n){e=t.exports=n(77)(!0),e.push([t.i,".margin-top-8{margin-top:8px}.margin-top-10{margin-top:10px}.margin-top-20{margin-top:20px}.margin-left-10{margin-left:10px}.margin-bottom-10{margin-bottom:10px}.margin-bottom-100{margin-bottom:100px}.margin-right-10{margin-right:10px}.padding-left-6{padding-left:6px}.padding-left-8{padding-left:5px}.padding-left-10{padding-left:10px}.padding-left-20{padding-left:20px}.height-100{height:100%}.height-120px{height:100px}.height-200px{height:200px}.height-492px{height:492px}.height-460px{height:460px}.line-gray{height:0;border-bottom:2px solid #dcdcdc}.notwrap{word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.padding-left-5{padding-left:10px}[v-cloak]{display:none}.dragging-tip-enter-active{opacity:1;transition:opacity .3s}.dragging-tip-enter,.dragging-tip-leave-to{opacity:0;transition:opacity .3s}.dragging-tip-con{display:block;text-align:center;width:100%;height:50px}.dragging-tip-con span{font-size:18px}.record-tip-con{display:block;width:100%;height:292px;overflow:auto}.record-item{box-sizing:content-box;display:block;overflow:hidden;height:24px;line-height:24px;padding:8px 10px;border-bottom:1px dashed #dcdcdc}.record-tip-con span{font-size:14px}.edittable-test-con{min-height:600px}.edittable-testauto-con{height:100%}.edittable-table-height-con{min-height:600px}.edittable-table-height1-con{height:200px}.edittable-con-1{box-sizing:content-box;padding:15px 0 0;height:550px}.exportable-table-download-con1{padding:16px 0 16px 20px;border-bottom:1px dashed #c3c3c3;margin-bottom:16px}.exportable-table-download-con2{padding-left:20px}.show-image{padding:20px 0}.show-image img{display:block;width:100%;height:auto}.demo-spin-icon-load{-webkit-animation:ani-demo-spin 1s linear infinite;animation:ani-demo-spin 1s linear infinite}","",{version:3,sources:["/Users/yeshaobin/Yearning/webpage/src/components/Order/GenSQL.vue"],names:[],mappings:"AACA,cACE,cAAgB,CACjB,AACD,eACE,eAAiB,CAClB,AACD,eACE,eAAiB,CAClB,AACD,gBACE,gBAAkB,CACnB,AACD,kBACE,kBAAoB,CACrB,AACD,mBACE,mBAAqB,CACtB,AACD,iBACE,iBAAmB,CACpB,AACD,gBACE,gBAAkB,CACnB,AACD,gBACE,gBAAkB,CACnB,AACD,iBACE,iBAAmB,CACpB,AACD,iBACE,iBAAmB,CACpB,AACD,YACE,WAAa,CACd,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,cACE,YAAc,CACf,AACD,WACE,SAAU,AACV,+BAAiC,CAClC,AACD,SACE,oBAAqB,AACrB,mBAAoB,AACpB,gBAAiB,AACjB,sBAAwB,CACzB,AACD,gBACE,iBAAmB,CACpB,AACD,UACE,YAAc,CACf,AACD,2BACE,UAAW,AACX,sBAAyB,CAC1B,AACD,2CAEE,UAAW,AACX,sBAAyB,CAC1B,AACD,kBACE,cAAe,AACf,kBAAmB,AACnB,WAAY,AACZ,WAAa,CACd,AACD,uBACE,cAAgB,CACjB,AACD,gBACE,cAAe,AACf,WAAY,AACZ,aAAc,AACd,aAAe,CAChB,AACD,aACE,uBAAwB,AACxB,cAAe,AACf,gBAAiB,AACjB,YAAa,AACb,iBAAkB,AAClB,iBAAkB,AAClB,gCAAoC,CACrC,AACD,qBACE,cAAgB,CACjB,AACD,oBACE,gBAAkB,CACnB,AACD,wBACE,WAAa,CACd,AACD,4BACE,gBAAkB,CACnB,AACD,6BACE,YAAc,CACf,AACD,iBACE,uBAAwB,AACxB,iBAAkB,AAClB,YAAc,CACf,AACD,gCACE,yBAA0B,AAC1B,iCAAkC,AAClC,kBAAoB,CACrB,AACD,gCACE,iBAAmB,CACpB,AACD,YACE,cAAgB,CACjB,AACD,gBACE,cAAe,AACf,WAAY,AACZ,WAAa,CACd,AACD,qBACE,mDAAoD,AAC5C,0CAA4C,CACrD",file:"GenSQL.vue",sourcesContent:["\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.dragging-tip-enter-active {\n  opacity: 1;\n  transition: opacity 0.3s;\n}\n.dragging-tip-enter,\n.dragging-tip-leave-to {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.dragging-tip-con {\n  display: block;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n}\n.dragging-tip-con span {\n  font-size: 18px;\n}\n.record-tip-con {\n  display: block;\n  width: 100%;\n  height: 292px;\n  overflow: auto;\n}\n.record-item {\n  box-sizing: content-box;\n  display: block;\n  overflow: hidden;\n  height: 24px;\n  line-height: 24px;\n  padding: 8px 10px;\n  border-bottom: 1px dashed gainsboro;\n}\n.record-tip-con span {\n  font-size: 14px;\n}\n.edittable-test-con {\n  min-height: 600px;\n}\n.edittable-testauto-con {\n  height: 100%;\n}\n.edittable-table-height-con {\n  min-height: 600px;\n}\n.edittable-table-height1-con {\n  height: 200px;\n}\n.edittable-con-1 {\n  box-sizing: content-box;\n  padding: 15px 0 0;\n  height: 550px;\n}\n.exportable-table-download-con1 {\n  padding: 16px 0 16px 20px;\n  border-bottom: 1px dashed #c3c3c3;\n  margin-bottom: 16px;\n}\n.exportable-table-download-con2 {\n  padding-left: 20px;\n}\n.show-image {\n  padding: 20px 0;\n}\n.show-image img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.demo-spin-icon-load {\n  -webkit-animation: ani-demo-spin 1s linear infinite;\n          animation: ani-demo-spin 1s linear infinite;\n}\n"],sourceRoot:""}])},306:function(t,e,n){e=t.exports=n(77)(!0),e.push([t.i,".show-edit-btn{display:none;margin-left:-10px}.ivu-table-cell:hover .show-edit-btn{display:inline-block}","",{version:3,sources:["/Users/yeshaobin/Yearning/webpage/src/components/Order/components/editTable.vue"],names:[],mappings:"AACA,eACE,aAAc,AACd,iBAAmB,CACpB,AACD,qCACE,oBAAsB,CACvB",file:"editTable.vue",sourcesContent:["\n.show-edit-btn {\n  display: none;\n  margin-left: -10px;\n}\n.ivu-table-cell:hover .show-edit-btn {\n  display: inline-block;\n}\n"],sourceRoot:""}])},561:function(t,e,n){var a=n(292);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(78)("21d13ede",a,!0)},575:function(t,e,n){var a=n(306);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(78)("0a76275c",a,!0)},582:function(t,e,n){function a(t){n(575)}var i=n(1)(n(279),n(607),a,null,null);t.exports=i.exports},590:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Row",[n("Col",{attrs:{span:"6"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"ios-redo"}}),t._v("\n        选择数据库\n      ")],1),t._v(" "),n("div",{staticClass:"edittable-test-con"},[n("Form",{ref:"formItem",attrs:{model:t.formItem,"label-width":100,rules:t.ruleValidate}},[n("Form-item",{attrs:{label:"机房:",prop:"computer_room"}},[n("Select",{attrs:{placeholder:"请选择"},on:{"on-change":t.Connection_Name},model:{value:t.formItem.computer_room,callback:function(e){t.$set(t.formItem,"computer_room",e)},expression:"formItem.computer_room"}},t._l(t.dataset,function(e){return n("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])}))],1),t._v(" "),n("Form-item",{attrs:{label:"连接名称:",prop:"connection_name"}},[n("Select",{attrs:{placeholder:"请选择"},on:{"on-change":t.DataBaseName},model:{value:t.formItem.connection_name,callback:function(e){t.$set(t.formItem,"connection_name",e)},expression:"formItem.connection_name"}},t._l(t.tableform.sqlname,function(e){return n("Option",{key:e.connection_name,attrs:{value:e.connection_name,filterable:""}},[t._v(t._s(e.connection_name))])}))],1),t._v(" "),n("Form-item",{attrs:{label:"数据库库名:",prop:"basename"}},[n("Select",{attrs:{placeholder:"请选择",filterable:""},on:{"on-change":t.GetTableName},model:{value:t.formItem.basename,callback:function(e){t.$set(t.formItem,"basename",e)},expression:"formItem.basename"}},t._l(t.tableform.basename,function(e){return n("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])}))],1),t._v(" "),n("Form-item",{attrs:{label:"数据库表名:",prop:"tablename"}},[n("Select",{attrs:{placeholder:"请选择",filterable:""},model:{value:t.formItem.tablename,callback:function(e){t.$set(t.formItem,"tablename",e)},expression:"formItem.tablename"}},t._l(t.tableform.info,function(e){return n("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])}))],1),t._v(" "),n("Button",{staticStyle:{"margin-left":"20%"},attrs:{type:"warning"},on:{click:function(e){t.canel()}}},[t._v("重置")]),t._v(" "),n("Button",{staticStyle:{"margin-left":"5%"},attrs:{type:"primary"},on:{click:function(e){t.getinfo()}}},[t._v("连接")])],1),t._v(" "),n("br"),t._v(" "),n("Tabs",{staticStyle:{height:"300px","overflow-y":"scroll"},attrs:{value:"order1"}},[n("TabPane",{attrs:{label:"生成语句",name:"order1"}},t._l(t.sql,function(e){return n("p",{staticStyle:{"font-size":"12px",color:"#2b85e4"}},[t._v(" "+t._s(e)),n("br"),n("br")])})),t._v(" "),n("TabPane",{attrs:{label:"提交工单",name:"order2"}},[n("Button",{staticStyle:{"margin-left":"25%","margin-top":"20%"},attrs:{type:"primary",size:"large"},nativeOn:{click:function(e){t.orderswitch(e)}}},[t._v("获取工单详情")])],1)],1)],1)])],1),t._v(" "),n("Col",{staticClass:"padding-left-10",attrs:{span:"18"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"android-remove"}}),t._v("\n        表结构详情\n      ")],1),t._v(" "),n("div",{staticClass:"edittable-table-height-con"},[n("Tabs",{attrs:{value:t.tabs}},[n("TabPane",{attrs:{label:"添加字段",name:"order1",icon:"plus"}},[n("Table",{attrs:{stripe:"",columns:t.addcolums,data:t.add_row,height:"385",border:""}}),t._v(" "),n("div",{staticStyle:{"margin-top":"5%"}},[n("Input",{staticStyle:{width:"10%"},attrs:{placeholder:"字段名"},model:{value:t.Add_tmp.Field,callback:function(e){t.$set(t.Add_tmp,"Field",e)},expression:"Add_tmp.Field"}}),t._v(" "),n("Select",{staticStyle:{width:"15%"},attrs:{transfer:"",placeholder:"字段类型"},model:{value:t.Add_tmp.Species,callback:function(e){t.$set(t.Add_tmp,"Species",e)},expression:"Add_tmp.Species"}},t._l(t.optionData,function(e){return n("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),t._v(" "),n("Input",{staticStyle:{width:"10%"},attrs:{placeholder:"字段长度"},model:{value:t.Add_tmp.Len,callback:function(e){t.$set(t.Add_tmp,"Len",e)},expression:"Add_tmp.Len"}}),t._v(" "),n("Select",{staticStyle:{width:"15%"},attrs:{placeholder:"字段可以为空",transfer:""},model:{value:t.Add_tmp.Null,callback:function(e){t.$set(t.Add_tmp,"Null",e)},expression:"Add_tmp.Null"}},[n("Option",{attrs:{value:"YES"}},[t._v("YES")]),t._v(" "),n("Option",{attrs:{value:"NO"}},[t._v("NO")])],1),t._v(" "),n("Input",{staticStyle:{width:"15%"},attrs:{placeholder:"默认值"},model:{value:t.Add_tmp.Default,callback:function(e){t.$set(t.Add_tmp,"Default",e)},expression:"Add_tmp.Default"}}),t._v(" "),n("Input",{staticStyle:{width:"15%"},attrs:{placeholder:"字段备注"},model:{value:t.Add_tmp.Extra,callback:function(e){t.$set(t.Add_tmp,"Extra",e)},expression:"Add_tmp.Extra"}}),t._v(" "),n("Button",{attrs:{type:"warning"},nativeOn:{click:function(e){t.ClearColumns(e)}}},[t._v("清空")]),t._v(" "),n("Button",{attrs:{type:"info"},nativeOn:{click:function(e){t.AddColumns()}}},[t._v("添加")])],1)],1),t._v(" "),n("TabPane",{attrs:{label:"修改&删除字段",name:"order2",icon:"edit"}},[n("edittable",{attrs:{refs:"table2","columns-list":t.tabcolumns},on:{index:t.remove},model:{value:t.TableDataNew,callback:function(e){t.TableDataNew=e},expression:"TableDataNew"}}),t._v(" "),n("br"),t._v(" "),n("Button",{staticStyle:{"margin-left":"80%"},attrs:{type:"info"},on:{click:function(e){t.confirmsql()}}},[t._v("生成")])],1)],1)],1)])],1)],1),t._v(" "),n("Modal",{attrs:{"ok-text":"提交工单",width:"800"},on:{"on-ok":t.commitorder},model:{value:t.openswitch,callback:function(e){t.openswitch=e},expression:"openswitch"}},[n("Row",[n("Card",[n("div",{staticClass:"step-header-con"},[n("h3",{staticStyle:{"margin-left":"35%"}},[t._v("Yearning SQL平台审核工单")])]),t._v(" "),n("p",{staticClass:"step-content"}),t._v(" "),n("Form",{staticClass:"step-form",attrs:{"label-width":100}},[n("FormItem",{attrs:{label:"用户名:"}},[n("p",[t._v(t._s(t.username))])]),t._v(" "),n("FormItem",{attrs:{label:"数据库库名:"}},[n("p",[t._v(t._s(t.formItem.basename))])]),t._v(" "),n("FormItem",{attrs:{label:"数据库表名:"}},[n("p",[t._v(t._s(t.formItem.tablename))])]),t._v(" "),n("FormItem",{attrs:{label:"执行SQL:"}},t._l(t.sql,function(e){return n("p",[t._v(t._s(e))])})),t._v(" "),n("FormItem",{attrs:{label:"工单提交说明:"}},[n("Input",{attrs:{placeholder:"最多不超过20个字"},model:{value:t.formItem.text,callback:function(e){t.$set(t.formItem,"text",e)},expression:"formItem.text"}})],1),t._v(" "),n("FormItem",{attrs:{label:"指定审核人:"}},[n("Select",{model:{value:t.formItem.assigned,callback:function(e){t.$set(t.formItem,"assigned",e)},expression:"formItem.assigned"}},t._l(this.assigned,function(e){return n("Option",{key:e.username,attrs:{value:e.username}},[t._v(t._s(e.username))])}))],1),t._v(" "),n("FormItem",{attrs:{label:"是否备份"}},[n("RadioGroup",{model:{value:t.formItem.backup,callback:function(e){t.$set(t.formItem,"backup",e)},expression:"formItem.backup"}},[n("Radio",{attrs:{label:"1"}},[t._v("是")]),t._v(" "),n("Radio",{attrs:{label:"0"}},[t._v("否")])],1)],1),t._v(" "),n("FormItem",{attrs:{label:"确认提交：",required:""}},[n("Checkbox",{model:{value:t.pass,callback:function(e){t.pass=e},expression:"pass"}},[t._v("确认")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]}},607:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Table",{ref:t.refs,attrs:{columns:t.columnsList,data:t.thisTableData,border:"","disabled-hover":""}})],1)},staticRenderFns:[]}},90:function(t,e,n){function a(t){n(561)}var i=n(1)(n(274),n(590),a,null,null);t.exports=i.exports}});
//# sourceMappingURL=2.d728404a0d999a8b7eb3.js.map