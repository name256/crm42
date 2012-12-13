<style type="text/css">
/*Copyright (c) 2010,Yahoo! Inc. All rights reserved.Code licensed under the BSD License:http://developer.yahoo.com/yui/license.htmlversion:2.8.2r1*/
	.yui-skin-sam .yui-dt-mask {
	    position:absolute;
	    z-index:9500;
	}
	.yui-dt-tmp {
	    position:absolute;
	    left:-9000px;
	}
	.yui-dt-scrollable .yui-dt-bd {
	    overflow:auto;
	}
	.yui-dt-scrollable .yui-dt-hd {
	    overflow:hidden;
	    position:relative;
	}
	.yui-dt-scrollable .yui-dt-bd thead tr,.yui-dt-scrollable .yui-dt-bd thead th {
	    position:absolute;
	    left:-1500px;
	}
	.yui-dt-scrollable tbody {
	    -moz-outline:none;
	}
	.yui-skin-sam thead .yui-dt-sortable {
	    cursor:pointer;
	}
	.yui-skin-sam thead .yui-dt-draggable {
	    cursor:move;
	}
	.yui-dt-coltarget {
	    position:absolute;
	    z-index:999;
	}
	.yui-dt-hd {
	    zoom:1;
	}
	th.yui-dt-resizeable .yui-dt-resizerliner {
	    position:relative;
	}
	.yui-dt-resizer {
	    position:absolute;
	    right:0;
	    bottom:0;
	    height:100%;
	    cursor:e-resize;
	    cursor:col-resize;
	    background-color:#CCC;
	    opacity:0;
	    filter:alpha(opacity=0);
	}
	.yui-dt-resizerproxy {
	    visibility:hidden;
	    position:absolute;
	    z-index:9000;
	    background-color:#CCC;
	    opacity:0;
	    filter:alpha(opacity=0);
	}
	th.yui-dt-hidden .yui-dt-liner,td.yui-dt-hidden .yui-dt-liner,th.yui-dt-hidden .yui-dt-resizer {
	    display:none;
	}
	.yui-dt-editor {
	    position:absolute;
	    z-index:9000;
	}
	.yui-skin-sam .yui-dt table {
	    margin:0;
	    padding:0;
	    font-family:arial;
	    font-size:inherit;
	    border-collapse:separate;
	    *border-collapse:collapse;
	    border-spacing:0;
	    border:1px solid #7F7F7F;
	}
	.yui-skin-sam .yui-dt thead {
	    border-spacing:0;
	}
	.yui-skin-sam .yui-dt caption {
	    color:#000;
	    font-size:85%;
	    font-weight:normal;
	    font-style:italic;
	    line-height:1;
	    padding:1em 0;
	    text-align:center;
	}
	.yui-skin-sam .yui-dt th {
	    background:#D8D8DA url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 0;
	}
	.yui-skin-sam .yui-dt th,.yui-skin-sam .yui-dt th a {
	    font-weight:normal;
	    text-decoration:none;
	    color:#000;
	    vertical-align:bottom;
	}
	.yui-skin-sam .yui-dt th {
	    margin:0;
	    padding:0;
	    border:none;
	    border-right:1px solid #CBCBCB;
	}
	.yui-skin-sam .yui-dt tr.yui-dt-first td {
	    border-top:1px solid #7F7F7F;
	}
	.yui-skin-sam .yui-dt th .yui-dt-liner {
	    white-space:nowrap;
	}
	.yui-skin-sam .yui-dt-liner {
	    margin:0;
	    padding:0;
	    padding:4px 10px 4px 10px;
	}
	.yui-skin-sam .yui-dt-coltarget {
	    width:5px;
	    background-color:red;
	}
	.yui-skin-sam .yui-dt td {
	    margin:0;
	    padding:0;
	    border:none;
	    border-right:1px solid #CBCBCB;
	    text-align:left;
	}
	.yui-skin-sam .yui-dt-list td {
	    border-right:none;
	}
	.yui-skin-sam .yui-dt-resizer {
	    width:6px;
	}
	.yui-skin-sam .yui-dt-mask {
	    background-color:#000;
	    opacity:.25;
	    filter:alpha(opacity=25);
	}
	.yui-skin-sam .yui-dt-message {
	    background-color:#FFF;
	}
	.yui-skin-sam .yui-dt-scrollable table {
	    border:none;
	}
	.yui-skin-sam .yui-dt-scrollable .yui-dt-hd {
	    border-left:1px solid #7F7F7F;
	    border-top:1px solid #7F7F7F;
	    border-right:1px solid #7F7F7F;
	}
	.yui-skin-sam .yui-dt-scrollable .yui-dt-bd {
	    border-left:1px solid #7F7F7F;
	    border-bottom:1px solid #7F7F7F;
	    border-right:1px solid #7F7F7F;
	    background-color:#FFF;
	}
	.yui-skin-sam .yui-dt-scrollable .yui-dt-data tr.yui-dt-last td {
	    border-bottom:1px solid #7F7F7F;
	}
	.yui-skin-sam th.yui-dt-asc,.yui-skin-sam th.yui-dt-desc {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 -100px;
	}
	.yui-skin-sam th.yui-dt-sortable .yui-dt-label {
	    margin-right:10px;
	}
	.yui-skin-sam th.yui-dt-asc .yui-dt-liner {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/datatable/assets/skins/sam/dt-arrow-up.png) no-repeat right;
	}
	.yui-skin-sam th.yui-dt-desc .yui-dt-liner {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/datatable/assets/skins/sam/dt-arrow-dn.png) no-repeat right;
	}
	tbody .yui-dt-editable {
	    cursor:pointer;
	}
	.yui-dt-editor {
	    text-align:left;
	    background-color:#F2F2F2;
	    border:1px solid #808080;
	    padding:6px;
	}
	.yui-dt-editor label {
	    padding-left:4px;
	    padding-right:6px;
	}
	.yui-dt-editor .yui-dt-button {
	    padding-top:6px;
	    text-align:right;
	}
	.yui-dt-editor .yui-dt-button button {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 0;
	    border:1px solid #999;
	    width:4em;
	    height:1.8em;
	    margin-left:6px;
	}
	.yui-dt-editor .yui-dt-button button.yui-dt-default {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 -1400px;
	    background-color:#5584E0;
	    border:1px solid #304369;
	    color:#FFF;
	}
	.yui-dt-editor .yui-dt-button button:hover {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 -1300px;
	    color:#000;
	}
	.yui-dt-editor .yui-dt-button button:active {
	    background:url(http://yui.yahooapis.com/2.8.2r1/build/assets/skins/sam/sprite.png) repeat-x 0 -1700px;
	    color:#000;
	}
	.yui-skin-sam tr.yui-dt-even {
	    background-color:#FFF;
	}
	.yui-skin-sam tr.yui-dt-odd {
	    background-color:#EDF5FF;
	}
	.yui-skin-sam tr.yui-dt-even td.yui-dt-asc,.yui-skin-sam tr.yui-dt-even td.yui-dt-desc {
	    background-color:#EDF5FF;
	}
	.yui-skin-sam tr.yui-dt-odd td.yui-dt-asc,.yui-skin-sam tr.yui-dt-odd td.yui-dt-desc {
	    background-color:#DBEAFF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-even {
	    background-color:#FFF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-odd {
	    background-color:#FFF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-even td.yui-dt-asc,.yui-skin-sam .yui-dt-list tr.yui-dt-even td.yui-dt-desc {
	    background-color:#EDF5FF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-odd td.yui-dt-asc,.yui-skin-sam .yui-dt-list tr.yui-dt-odd td.yui-dt-desc {
	    background-color:#EDF5FF;
	}
	.yui-skin-sam th.yui-dt-highlighted,.yui-skin-sam th.yui-dt-highlighted a {
	    background-color:#B2D2FF;
	}
	.yui-skin-sam tr.yui-dt-highlighted,.yui-skin-sam tr.yui-dt-highlighted td.yui-dt-asc,.yui-skin-sam tr.yui-dt-highlighted td.yui-dt-desc,.yui-skin-sam tr.yui-dt-even td.yui-dt-highlighted,.yui-skin-sam tr.yui-dt-odd td.yui-dt-highlighted {
	    cursor:pointer;
	    background-color:#B2D2FF;
	}
	.yui-skin-sam .yui-dt-list th.yui-dt-highlighted,.yui-skin-sam .yui-dt-list th.yui-dt-highlighted a {
	    background-color:#B2D2FF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-highlighted,.yui-skin-sam .yui-dt-list tr.yui-dt-highlighted td.yui-dt-asc,.yui-skin-sam .yui-dt-list tr.yui-dt-highlighted td.yui-dt-desc,.yui-skin-sam .yui-dt-list tr.yui-dt-even td.yui-dt-highlighted,.yui-skin-sam .yui-dt-list tr.yui-dt-odd td.yui-dt-highlighted {
	    cursor:pointer;
	    background-color:#B2D2FF;
	}
	.yui-skin-sam th.yui-dt-selected,.yui-skin-sam th.yui-dt-selected a {
	    background-color:#446CD7;
	}
	.yui-skin-sam tr.yui-dt-selected td,.yui-skin-sam tr.yui-dt-selected td.yui-dt-asc,.yui-skin-sam tr.yui-dt-selected td.yui-dt-desc {
	    background-color:#426FD9;
	    color:#FFF;
	}
	.yui-skin-sam tr.yui-dt-even td.yui-dt-selected,.yui-skin-sam tr.yui-dt-odd td.yui-dt-selected {
	    background-color:#446CD7;
	    color:#FFF;
	}
	.yui-skin-sam .yui-dt-list th.yui-dt-selected,.yui-skin-sam .yui-dt-list th.yui-dt-selected a {
	    background-color:#446CD7;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-selected td,.yui-skin-sam .yui-dt-list tr.yui-dt-selected td.yui-dt-asc,.yui-skin-sam .yui-dt-list tr.yui-dt-selected td.yui-dt-desc {
	    background-color:#426FD9;
	    color:#FFF;
	}
	.yui-skin-sam .yui-dt-list tr.yui-dt-even td.yui-dt-selected,.yui-skin-sam .yui-dt-list tr.yui-dt-odd td.yui-dt-selected {
	    background-color:#446CD7;
	    color:#FFF;
	}
	.yui-skin-sam .yui-dt-paginator {
	    display:block;
	    margin:6px 0;
	    white-space:nowrap;
	}
	.yui-skin-sam .yui-dt-paginator .yui-dt-first,.yui-skin-sam .yui-dt-paginator .yui-dt-last,.yui-skin-sam .yui-dt-paginator .yui-dt-selected {
	    padding:2px 6px;
	}
	.yui-skin-sam .yui-dt-paginator a.yui-dt-first,.yui-skin-sam .yui-dt-paginator a.yui-dt-last {
	    text-decoration:none;
	}
	.yui-skin-sam .yui-dt-paginator .yui-dt-previous,.yui-skin-sam .yui-dt-paginator .yui-dt-next {
	    display:none;
	}
	.yui-skin-sam a.yui-dt-page {
	    border:1px solid #CBCBCB;
	    padding:2px 6px;
	    text-decoration:none;
	    background-color:#fff;
	}
	.yui-skin-sam .yui-dt-selected {
	    border:1px solid #fff;
	    background-color: #fff;
	}
</style>