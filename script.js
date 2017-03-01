var com = com || {}; 

$( document ).ready(function() { 
   com.fc = com.fc || {}; 
   com.fc.JavaScriptDistLib = {
  getProperty: function (objName, property) {
        try {
            var elem = $('[obj-name= "' + objName + '"]');
            var value = null;
            switch (property) {
                case "width":
                    value = elem.width();
                    break;
                case "height":
                    value = elem.height();
                    break;
                case "x":
                    value = Math.round(parseFloat(elem.css('transform').split(',')[4]));
                    //value = elem.position().left;
                    break;
                case "y":
                    //value = elem.position().top;
                    value = Math.round(parseFloat(elem.css('transform').split(',')[5]));
                    break;
                case "Alpha":
                    value = elem.css('opacity');
                    break;
                case "Background color":
                    value = elem.css('background-color');
                    break;
                case "Horizontal scroll":
                    value = elem.css('overflow-x');
                    break;
                case "Vertical scroll":
                    value = elem.css('overflow-y');
                    break;
            }
            return value;
        } catch (e) {
            throw (e);
        }
    },
  setProperty: function (objName, property, value) {
        try {
            var elem = $('[obj-name= "' + objName + '"]');
            switch (property) {
                case "width":
                    elem.css('width', value + 'px');
                    break;
                case "height":
                    elem.css('height', value + 'px');
                    break;
                case "x":
                    //var yPos = Math.round(elem.position().top);
                    var yPos = Math.round(parseFloat(elem.css('transform').split(',')[5]));
                    elem.css('transform','translate('+value+'px,'+yPos+'px)');
                    break;
                case "y":
                    //var xPos = Math.round(elem.position().left);
                    var xPos = Math.round(parseFloat(elem.css('transform').split(',')[4]));
                    elem.css('transform','translate('+xPos+'px,'+value+'px)');
                    break;
                case "Alpha":
                    elem.css('opacity', value/100 );
                    break;
                case "Background color":
                    elem.css('background-color', value);
                    break;

                case "Horizontal scroll":
                    var code = elem.css('overflow-x', 'hidden');
                    if (value) {
                        code = elem.css('overflow-x', 'scroll');
                    }
                    break;
                case "Vertical scroll":
                    var code = elem.css('overflow-y', 'hidden');
                    if (value) {
                        code = elem.css('overflow-y', 'scroll');
                    }
                    break;
            }
        } catch (e) {
            throw (e);
        }
    },
  removeGesture: function (objName, gesture) {
        try {
            var elem = $('[obj-name= "' + objName + '"]');
            switch (gesture) {
                case "CLICK":
                    return elem.unbind('click');
                    break;
            }
        } catch (e) {
            throw(e);
        }
    },
  actionHide: function (block) {
        var object_name = block.getFieldValue('OBJECT');
        var elemSelector = '[obj-name="' + object_name + '"]';
        var code = "  $('"+elemSelector+ "').hide();";
        return code;
    },
  actionShow: function (block) {
        var object_name = block.getFieldValue('OBJECT');
        var elemSelector = '[obj-name="' + object_name + '"]';
        var code = "  $('"+elemSelector+ "').show();";
        return code;
    },
  sensorIsVisible: function (block) {
        var object_name = block.getFieldValue('OBJECT');
        var elemSelector = '[obj-name="' + object_name + '"]';
        var code = "  $('"+elemSelector+ "').is(':visible')";
        return [code, Blockly.JavaScript.ORDER_NONE];
    },
  _handleException: function (e, message) {
        console.error('Exception: ', e, message);
    },
  distMode: "deploy",
  Image: {
    createImageFromUrl: function (url,successCallBack) {
    successCallBack (url);
  },
    setProperty: function (objName, property, value) {
    try {
      var elemSelector = '[obj-name="' + objName + '"]';
      var elem = $(elemSelector);
      console.log (value);
      switch (property) {
        case "Image":
          elem.find('img').attr('src',value);
          break;
        case "width":
        case "height":
        case "Alpha":
        case "Background color":
        case "x":
        case "y":
          com.fc.JavaScriptDistLib.setProperty(objName, property, value);
        break;
        case "Scaling":
          switch (value) {
            case "stretch":
              $(elemSelector + ' img').css('width','inherit');
              $(elemSelector + ' img').css('height','inherit');
              $(elemSelector + ' img').attr('scale-type','stretch');
              break;
            case "fit":
              $(elemSelector + ' img').css('width','inherit');
              $(elemSelector + ' img').css('height','initial');
              $(elemSelector + ' img').attr('scale-type','fit');
              break;
            case "crop":
              $(elemSelector + ' img').css('width','initial');
              $(elemSelector + ' img').css('height','initial');
              $(elemSelector + ' img').attr('scale-type','crop');
              break;
          }
        break;
      }
    } catch (e) {
      throw new com.fc.JavaScriptDistLib.Image.ImageException(e);
    }
  },
    getProperty: function (objName, property) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      var value;
      switch (property) {
        case "Image":
          value = elem.attr('src');
          break;
        case "width":
        case "height":
        case "x":
        case "y":
        case "Alpha":
        case "Background color":
          value = com.fc.JavaScriptDistLib.getProperty( objName, property);
          break;
        case "Scaling":
          value = elem.attr('scale-type');
          break;
      }
      return value;
    } catch (e) {
      throw new com.fc.JavaScriptDistLib.Image.ImageException(e);
    }
  },
    ImageException: function (snappMessage, msg) {
    this.name = "ImageException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  },
    },
  Label: {
    getProperty: function ( objName, property) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      var value;
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          value  = com.fc.JavaScriptDistLib.getProperty( objName, property);
          break;
        case "Text":
          value  = $(elemSelector + ' .label').html();
          break;
        case "Font size":
          value = $(elemSelector + ' .label').css('font-size');
          break;
        case "Alpha":
          value = $(elemSelector + ' .label').css('opacity') * 100;
          break;
        case "Text Alignment":
          value = $(elemSelector + ' .label').css('text-align');
          break;
        case "Vertical Alignment":
          value = $(elemSelector + ' .label').css('vertical-align');
          break;
        case "Font style":
          value = $(elemSelector + ' .label').css('font-style');
          break;
        case "Font family":
          value = $(elemSelector + ' .label').css('font-family');
          break;
        case "Background color":
          value = $(elemSelector + ' .label').css('background-color');
          break;
        case "Text color":
          value = $(elemSelector + ' .label').css('color');
          break;
        case "Max lines":
          value = $(elemSelector + ' .label').css('-webkit-line-clamp');
          break;
      }
      return value;
    } catch (e) {
      throw (e);
    }
  },
    setProperty: function (objName, property ,value) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          com.fc.JavaScriptDistLib.setProperty( objName, property, value);
          break;
        case "Text":
          $(elemSelector + ' .label').html(value);
          break;
        case "Font size":
          $(elemSelector + ' .label').css('font-size',value+'px');
          break;
        case "Alpha":
          $(elemSelector + ' .label').css('opacity',value/100);
          break;
        case "Text Alignment":
          $(elemSelector + ' .label').css('text-align',value.toLowerCase());
          break;
        case "Vertical Alignment":
          $(elemSelector + ' .label').css('vertical-align',value.toLowerCase());
          break;
        case "Font style":
          $(elemSelector + ' .label').css('font-style',value.toLowerCase());
          break;
        case "Font family":
          $(elemSelector + ' .label').css('font-family',value.toLowerCase());
          break;
        case "Background color":
          $(elemSelector + ' .label').css('background-color',value);
          break;
        case "Text color":
          $(elemSelector + ' .label').css('color',value);
          break;
        case "Max lines":
          //code = setLabelMaxLines(id,value);
          var lineHeight = $(elemSelector).css('line-height').replace('px','');
          var maxheight = lineHeight * val;
          $(elemSelector + ' div.label').css({
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'display': '-webkit-box',
            '-webkit-line-clamp': val.toString(),
            '-webkit-box-orient': 'vertical',
            'max-height': maxheight +'px'
          });
          break;
      }
    } catch (e) {
      throw (e);
    }
  },
    },
  Button: {
    setProperty: function (objName, property, value) {
    try {
      var elemSelector = '[obj-name="' + objName + '"]';
      var elem = $(elemSelector);

      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          com.fc.JavaScriptDistLib.setProperty(objName, property, value);
          break;
        case "Alpha":
          $(elemSelector + ' button').css('opacity', value/100);
          break;
        case "Background color":
          $(elemSelector + ' button').css('background-color', value);
          break;
        case "Text":
          $(elemSelector + ' button').html(value);
          break;
        case "Font size":
          $(elemSelector + ' button').css('font-size',value+'px');
          break;
        case "Text Alignment":
          $(elemSelector + ' button').css('text-align',value.toLowerCase());
          break;
        case "Vertical Alignment":
          $(elemSelector + ' button').css('vertical-align',value.toLowerCase());
          break;
        case "Font style":
          $(elemSelector + ' button').css('font-style',value.toLowerCase());
          break;
        case "Font family":
          $(elemSelector + ' button').css('font-family',value);
          break;
        case "Text color":
          $(elemSelector + ' button').css('color',value);
          break;
      }
    } catch (e) {
      throw new ImageException(e);
    }
  },
    getProperty: function ( objName, property) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      var value;
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          value  = com.fc.JavaScriptDistLib.getProperty( objName, property);
          break;
        case "Text":
          value  = $(elemSelector + ' button').html();
          console.log (value);
          break;
        case "Font size":
          value  = $(elemSelector + ' button').css('font-size');
          break;
        case "Alpha":
          value  = $(elemSelector + ' button').css('opacity') * 100;
          break;
        case "Text Alignment":
          value = $(elemSelector + ' button').css('text-align');
          break;
        case "Vertical Alignment":
          value = $(elemSelector + ' button').css('vertical-align');
          break;
        case "Font style":
          value = $(elemSelector + ' button').css('font-style');
          break;
        case "Font family":
          value = $(elemSelector + ' button').css('font-family');
          break;
        case "Background color":
          value = $(elemSelector + ' button').css('background-color');
          break;
        case "Text color":
          value = $(elemSelector + ' button').css('color');
          break;
      }
      return value;
    } catch (e) {
      throw (e);
    }
  },
    },
  GraphContainer: {
    setProperty: function (objName, property, value) {
    try {
      var elemSelector = '[obj-name="' + objName + '"]';
      var elem = $(elemSelector);

      var graph;
      $(elemSelector).find('.c3').each(function() {
        graph = $(this).data('c3-chart'); 
      });
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          com.fc.JavaScriptDistLib.setProperty(objName, property, value);
        break;
        case "Type":
          graph.transform(value);
        break;
        case "BG Color":
          $(elemSelector).find('#fcLine').css('background-color',value);
        break;
        case "Legends":
          var show = 'visible';
          if (!value) {
            show = 'hidden';
          }
          // var xAxisLabel = d3.select(id).selectAll('text.c3-axis-x-label').style("visibility", show);
          // var yAxisLabel = d3.select(id).selectAll('text.c3-axis-y-label').style("visibility", show);
          d3.select(elemSelector).selectAll('g.c3-legend-item').style("visibility", show);
        break;
        case "Grid":
          var show = 'visible';
          if (!value) {
            show = 'hidden';
          }
          d3.select(elemSelector).selectAll('g.c3-grid').style('visibility',show);
        break;
        case "X Axis Color":
          d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('path').style("stroke", value);
        break;
        case "Y Axis Color":
          d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('path').style("stroke", value);
        break;
        case "X Axis Text Color":
          d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", value);
        break;
        case "Y Axis Text Color":
          d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", value);
        break;
        case "X Axis Line Width":
          d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", value);
        break;
        case "Y Axis Line Width":
          d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", value);
        break;
        case "Legend Text":
          d3.select(elemSelector).selectAll('text.c3-axis-x-label').style("stroke", value);
          d3.select(elemSelector).selectAll('text.c3-axis-y-label').style("stroke", value);
          d3.select(elemSelector).selectAll('g.c3-legend-item').selectAll('text').style("stroke", val);
        break;
        case "Fill Alpha":
          d3.select(elemSelector).selectAll('.c3-area ').style('opacity',value/100);
          d3.select(elemSelector).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity',value/100);
        break;
        case "Line Width":
          d3.select(elemSelector).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width", value);
        break;
        case "Line Circle Color":
          d3.select(elemSelector).selectAll('circle').style("stroke", value);
          d3.select(elemSelector).selectAll('circle').style("fill", value);
        break;
        case "Circle Radius":
          d3.select(elemSelector).selectAll('circle').attr('r',value);
        break;
        case "X Axis Text":
          graph.axis.labels({x: value});
        break;
        case "Y Axis Text":
          graph.axis.labels({y: value});
        break;
        case "Fill Color":
          d3.select(elemSelector).selectAll('.c3-area ').style('fill',value);
        break;
        case "Bar Color":
          d3.select(elemSelector).selectAll('g.c3-chart-bar').selectAll('path').style('fill',value)
        break;
        case "Draw Line Values":
          var show = 'visible';
          if (!value) {
            show = 'hidden';
          }
          d3.select(elemSelector).selectAll('g.c3-chart-text').selectAll('text').style("visibility", show);
        break;
        case "Axis Font Size":
          d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size',value);
          d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size',value);
          d3.select(elemSelector).selectAll('text.c3-text').style('font-size',value);
        break;
        case "Line Filled":
          if (value) {
            graph.transform('area');
          } else {
            graph.transform('line');
          }
        break;
        case "Smooth Line":
          if (value) {
            graph.transform('area-spline');
          } else {
            graph.transform('area');
          }
        break;
      }
    } catch (e) {
      throw new GraphException(e);
    }
  },
    getProperty: function ( objName, property) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      var value;
      var graph;
      $(elemSelector).find('.c3').each(function() {
        graph = $(this).data('c3-chart'); 
      });
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          value  = com.fc.JavaScriptDistLib.getProperty( objName, property);
        break;
        case "Type":
          value = graph.type;
        break;
        case "BG Color":
          value = $(elemSelector).find('#fcLine').css('background-color');
        break;
        case "Legends":
          value = d3.select(elemSelector).selectAll('g.c3-legend-item').style("visibility");
        break;
        case "Grid":
          value = d3.select(elemSelector).selectAll('g.c3-grid').style('visibility');
        break;
        case "X Axis Color":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('path').style("stroke");
        break;
        case "Y Axis Color":
          value = d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('path').style("stroke");
        break;
        case "X Axis Text Color":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill");
        break;
        case "Y Axis Text Color":
          value = d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill");
        break;
        case "X Axis Line Width":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
        break;
        case "Y Axis Line Width":
          value = d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width");
        break;
        case "Legend Text":
          value = d3.select(elemSelector).selectAll('text.c3-axis-x-label').style("stroke");
        break;
        case "Fill Alpha":
          value = d3.select(elemSelector).selectAll('.c3-area ').style('opacity') * 100;
        break;
        case "Line Width":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
        break;
        case "Line Circle Color":
          value = d3.select(elemSelector).selectAll('circle').style("stroke");
        break;
        case "Circle Radius":
          value = d3.select(elemSelector).selectAll('circle').attr('r');
        break;
        case "X Axis Text":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('text').html();
        break;
        case "Y Axis Text":
          value = d3.select(elemSelector).selectAll('g.c3-axis-y').selectAll('text').html();
        break;
        case "Fill Color":
          value = d3.select(elemSelector).selectAll('.c3-area ').style('fill');
        break;
        case "Bar Color":
          value = d3.select(elemSelector).selectAll('g.c3-chart-bar').selectAll('path').style('fill');
        break;
        case "Draw Line Values":
          value = d3.select(elemSelector).selectAll('g.c3-chart-text').style("opacity");
        break;
        case "Axis Font Size":
          value = d3.select(elemSelector).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size');
        break;
        
      }
      return value;
    } catch (e) {
      throw new GraphException(e);
    }
  },
    createChartWithList: function (objName,xArr,yArr,name) {
    var elemSelector = '[obj-name= "' + objName + '"]';
    var elem = $(elemSelector);
    var value;
    var graph;
    $(elemSelector).find('.c3').each(function() {
      graph = $(this).data('c3-chart'); 
    });
    var xAxisData = [];
    var yAxisData = [];
    xAxisData.push('x');

    if( yArr!=null ) {
      var populateXAxis = false;
     
      if( xArr!=null ) {
        for(var xIndex=0; xIndex<xArr.length; xIndex++) {
          xAxisData.push(xArr[xIndex]);
        }
      }
      else {
        populateXAxis = true;
      }
      yAxisData.push(name);
      for(var i=0; i<yArr.length; i++) {
        yAxisData.push(yArr[i]);
        if( populateXAxis ) {
          xAxisData.push(i);
        }
      }
      var chartData = {};
      chartData.columns = [];
      chartData.columns.push(xAxisData);
      chartData.columns.push(yAxisData);
      chartData.unload = true;

      var updatedChart = graph.load(chartData);
      return updatedChart;
    } else {
      throw new GraphException(e);
    }
  },
    addChartTransition: function (objName,x,y) {
    var elemSelector = '[obj-name= "' + objName + '"]';
    var elem = $(elemSelector);
    var value;
    var graph;
    $(elemSelector).find('.c3').each(function() {
      graph = $(this).data('c3-chart'); 
    });
    var dataArr = [graph.data()[0].id];
    var graphInitArr = [graph.data()[0].id];
    for (var i=0;i<graph.data()[0].values.length;i++) {
      graphInitArr.push(0); // ReInit the Graph
    }
    for (var i=0;i<graph.data()[0].values.length;i++) {
      dataArr.push(graph.data()[0].values[i].value);
    }
    var initGraph = graph.load({
      columns: [
        graphInitArr,    
      ]
      
    });
    
    var updatedGraph = setTimeout(function () {

      graph.load({
        columns: [
          dataArr,    
        ]
      });
    },x);
    return [initGraph,updatedGraph];
  },
    addValuesToChart: function (objName,xVal,yVal) {
    var elemSelector = '[obj-name= "' + objName + '"]';
    var elem = $(elemSelector);
    var value;
    var graph;
    $(elemSelector).find('.c3').each(function() {
      graph = $(this).data('c3-chart'); 
    });
    var newVal = {
      "x":parseInt(xVal),
      "index":graph.data()[0].values.length+1,
      "id":graph.data()[0].id,
      "value":yVal
    };
    var appendedValues = graph.data()[0].values;
    appendedValues.push(newVal);
    var xArr = ['x'];
    var dataArr = [graph.data()[0].id];
    for (var i=0;i<appendedValues.length;i++) {
      xArr.push(appendedValues[i].x)
      dataArr.push(appendedValues[i].value);
    }
    return graph.load({
      columns: [
        xArr,
        dataArr
      ]
    });
  },
    GraphException: function (snappMessage, msg) {
    this.name = "GraphException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  },
    },
  Location: {
    locationCreate: function (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	},
    locationGetLatitude: function (loc) {
		return loc.lat;
	},
    locationGetLongitude: function (loc) {
		return loc.lng;
	},
    createLocationFromText: function (text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	},
    },
  JSON: {
    parseJSONDataForPath: function (data, path) {
    var jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
      }
    }
    else if( typeof(data) == 'object') {
      jsonObject = data;
    }
    var jsonPathObject = jsonPath(jsonObject, path);
    //=== is very important. Otherwise 0 will be treated as false as well.
    if( jsonPathObject === false ) {
      jsonObject = {};
      return jsonObject;
    }
    else {
      return jsonPathObject;
    }
  },
    },
  Connio: {
    connioBaseURL: "https://api.connio.com",
    connioApp: "_app_796713082971687907",
    connioKEY: "_key_796713086353217836",
    connioSecret: "2b05db40845242c09899346fca8da8ff",
    connioMQTTHost: "mqtt.connio.com",
    connioMQTTPort: 8001,
    connioMQTTCientID: "_api_822826112907525233",
    connioMQTTUsername: "_key_822826112904411459",
    connioMQTTPassword: "cddd9bed10324fcea3ccef36e37924fa",
    connioMQTTTopic: "connio/apps/_app_796713082971687907/devices/#",
    connioMQTTClient: {
      _getHost: function () { return host; },
      _setHost: function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); },
      _getPort: function () { return port; },
      _setPort: function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); },
      _getPath: function () { return path; },
      _setPath: function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); },
      _getURI: function () { return uri; },
      _setURI: function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); },
      _getClientId: function () { return client.clientId; },
      _setClientId: function () { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); },
      _getOnConnectionLost: function () { return client.onConnectionLost; },
      _setOnConnectionLost: function (newOnConnectionLost) { 
			if (typeof newOnConnectionLost === "function")
				client.onConnectionLost = newOnConnectionLost;
			else 
				throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
		},
      _getOnMessageDelivered: function () { return client.onMessageDelivered; },
      _setOnMessageDelivered: function (newOnMessageDelivered) { 
			if (typeof newOnMessageDelivered === "function")
				client.onMessageDelivered = newOnMessageDelivered;
			else 
				throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
		},
      _getOnMessageArrived: function () { return client.onMessageArrived; },
      _setOnMessageArrived: function (newOnMessageArrived) { 
			if (typeof newOnMessageArrived === "function")
				client.onMessageArrived = newOnMessageArrived;
			else 
				throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
		},
      _getTrace: function () { return client.traceFunction; },
      _setTrace: function (trace) {
			if(typeof trace === "function"){
				client.traceFunction = trace;
			}else{
				throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
			}
		},
      connect: function (connectOptions) {
			connectOptions = connectOptions || {} ;
			validate(connectOptions,  {timeout:"number",
									   userName:"string", 
									   password:"string", 
									   willMessage:"object", 
									   keepAliveInterval:"number", 
									   cleanSession:"boolean", 
									   useSSL:"boolean",
									   invocationContext:"object", 
									   onSuccess:"function", 
									   onFailure:"function",
									   hosts:"object",
									   ports:"object",
									   mqttVersion:"number",
									   mqttVersionExplicit:"boolean",
									   uris: "object"});
			
			// If no keep alive interval is set, assume 60 seconds.
			if (connectOptions.keepAliveInterval === undefined)
				connectOptions.keepAliveInterval = 60;

			if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
				throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
			}

			if (connectOptions.mqttVersion === undefined) {
				connectOptions.mqttVersionExplicit = false;
				connectOptions.mqttVersion = 4;
			} else {
				connectOptions.mqttVersionExplicit = true;
			}

			//Check that if password is set, so is username
			if (connectOptions.password !== undefined && connectOptions.userName === undefined)
				throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]))

			if (connectOptions.willMessage) {
				if (!(connectOptions.willMessage instanceof Message))
					throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
				// The will message must have a payload that can be represented as a string.
				// Cause the willMessage to throw an exception if this is not the case.
				connectOptions.willMessage.stringPayload;
				
				if (typeof connectOptions.willMessage.destinationName === "undefined")
					throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
			}
			if (typeof connectOptions.cleanSession === "undefined")
				connectOptions.cleanSession = true;
			if (connectOptions.hosts) {
			    
				if (!(connectOptions.hosts instanceof Array) )
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
				if (connectOptions.hosts.length <1 )
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
				
				var usingURIs = false;
				for (var i = 0; i<connectOptions.hosts.length; i++) {
					if (typeof connectOptions.hosts[i] !== "string")
						throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
					if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
						if (i == 0) {
							usingURIs = true;
						} else if (!usingURIs) {
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						}
					} else if (usingURIs) {
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
					}
				}
				
				if (!usingURIs) {
					if (!connectOptions.ports)
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
					if (!(connectOptions.ports instanceof Array) )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
					if (connectOptions.hosts.length != connectOptions.ports.length)
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
					
					connectOptions.uris = [];
					
					for (var i = 0; i<connectOptions.hosts.length; i++) {
						if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
							throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
						var host = connectOptions.hosts[i];
						var port = connectOptions.ports[i];
						
						var ipv6 = (host.indexOf(":") != -1);
						uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
						connectOptions.uris.push(uri);
					}
				} else {
					connectOptions.uris = connectOptions.hosts;
				}
			}
			
			client.connect(connectOptions);
		},
      subscribe: function (filter, subscribeOptions) {
			if (typeof filter !== "string")
				throw new Error("Invalid argument:"+filter);
			subscribeOptions = subscribeOptions || {} ;
			validate(subscribeOptions,  {qos:"number", 
										 invocationContext:"object", 
										 onSuccess:"function", 
										 onFailure:"function",
										 timeout:"number"
										});
			if (subscribeOptions.timeout && !subscribeOptions.onFailure)
				throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
			if (typeof subscribeOptions.qos !== "undefined" 
				&& !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
				throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
			client.subscribe(filter, subscribeOptions);
		},
      unsubscribe: function (filter, unsubscribeOptions) {
			if (typeof filter !== "string")
				throw new Error("Invalid argument:"+filter);
			unsubscribeOptions = unsubscribeOptions || {} ;
			validate(unsubscribeOptions,  {invocationContext:"object", 
										   onSuccess:"function", 
										   onFailure:"function",
										   timeout:"number"
										  });
			if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
				throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
			client.unsubscribe(filter, unsubscribeOptions);
		},
      send: function (topic,payload,qos,retained) {   
			var message ;  
			
			if(arguments.length == 0){
				throw new Error("Invalid argument."+"length");

			}else if(arguments.length == 1) {

				if (!(topic instanceof Message) && (typeof topic !== "string"))
					throw new Error("Invalid argument:"+ typeof topic);

				message = topic;
				if (typeof message.destinationName === "undefined")
					throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
				client.send(message); 

			}else {
				//parameter checking in Message object 
				message = new Message(payload);
				message.destinationName = topic;
				if(arguments.length >= 3)
					message.qos = qos;
				if(arguments.length >= 4)
					message.retained = retained;
				client.send(message); 
			}
		},
      disconnect: function () {
			client.disconnect();
		},
      getTraceLog: function () {
			return client.getTraceLog();
		},
      startTrace: function () {
			client.startTrace();
		},
      stopTrace: function () {
			client.stopTrace();
		},
      isConnected: function () {
			return client.connected;
		},
      },
    connioMQTTMessageRecvCallback: null,
    configure: function () {
		if( this.connioBaseURL == null ) {
			var parent = this;
			var connioSO = Creator.currentProject.serviceModel.getServiceObject('Connio');
   			var properties = connioSO.attributes.attrs;
			this.connioBaseURL = properties.api.url;
			this.connioApp = properties.api.app;
			this.connioKEY = properties.api.key;
			this.connioSecret = properties.api.secret;
			this.connioMQTTHost = properties.mqtt.host;
			this.connioMQTTPort = Number(properties.mqtt.port);
			//HS: ToDO: Remove username and password and client ID for MQTT. Should come from SO properties.
			this.connioMQTTCientID = properties.mqtt.clientId;
			this.connioMQTTUsername = properties.mqtt.username;
			this.connioMQTTPassword = properties.mqtt.password;
			this.connioMQTTTopic = "connio/apps/" + this.connioApp + "/devices/#";

			try {
				if( this.connioBaseURL == '' || this.connioKEY == '' || this.connioSecret == '' ) {
					console.log("Please go to File -> Connio Properties and set credentials.");
				}

				if( this.connioMQTTHost != '' && this.connioMQTTPort!= '' && this.connioMQTTCientID!='' &&
					this.connioMQTTUsername!='' && this.connioMQTTPassword != '' && this.connioApp!='' ) {
					this.connioMQTTClient = new Paho.MQTT.Client(this.connioMQTTHost, this.connioMQTTPort, this.connioMQTTCientID);
					// set callback handlers
					this.connioMQTTClient.onConnectionLost = function(responseObject) {
						parent.handleMQTTConnectionLost(responseObject);
					};
					this.connioMQTTClient.onMessageArrived = function(message) {
						parent.handleMQTTMessage(message);
					};
				}
				else {
					console.log("Please go to File -> Connio Properties and set credentials.");
				}
			}
			catch(e) {
				console.log("Some of the properties are missing. Go to File->Connio Properties");
			}
			
			
		}
	},
    connioConfigure: function (key, secret, callback) {
		this.configure();
		this.connioKEY = key;
		this.connioSecret = secret;
		this.connioMQTTMessageRecvCallback = callback;
		this.connio_mqtt_connect();
	},
    connioStartTrackingPropertyChanges: function (callback) {
		this.configure();
		this.connioMQTTMessageRecvCallback = callback;
		this.connio_mqtt_connect();
	},
    connioStopTrackingPropertyChanges: function () {
		this.configure();
		this.connio_mqtt_disconnect();
	},
    connioGetDeviceProfiles: function (successcallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/deviceprofiles";
		$.ajax(
			{
	  			url: url,
	  			type: 'GET',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret)
	    		},
				success: function (response) {
					successcallback(response);
				},
				error: function(xhr, code, msg) {
					console.log("Could not get the profiles. Could be network error");
				}
	  	});
	},
    connioGetDevices: function (filter, successcallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/devices?profile=" + filter;
		$.ajax(
			{
	  			url: url,
	  			type: 'GET',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret)
	    		},
				success: function (response) {
					successcallback(response);
				},
				error: function(xhr, code, msg) {
	  				console.log("Could not get the devices.");
				}
	  	});
	},
    connioGetProperties: function (profile, successcallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/deviceprofiles/" + profile + "/properties";
		$.ajax(
			{
	  			url: url,
	  			type: 'GET',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret)
	    		},
				success: function (response) {
					successcallback(response);
				},
				error: function(xhr, code, msg) {
	  				console.log("Could not get the properties.");
				}
	  	});
	},
    connioReadData: function (device, successcallback, failurecallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/data/devices/" + device;
		$.ajax(
			{
	  			url: url,
	  			type: 'GET',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret)
	    		},
				success: function (response) {
					successcallback(response);
				},
				error: function(xhr, code, msg) {
	  				failurecallback(msg);
	  				console.log("Could not read data.");
				}
	  	});
	},
    connionGetValue: function (data, valueType, propertyName) {
		this.configure();
		var properties = data.properties;
		if( (properties!=undefined) && (properties.length>0) ) {
			for(var i=0; i<properties.length; i++) {
				var property = properties[i];
				var qname = property.descriptors.qname;

				if( qname.indexOf(propertyName) != -1)  {
					var value = property.value[valueType];
					if( value!=undefined ) {
						return value;
					}
				}
			}
		}
		return "";
	},
    connioGetDeviceName: function (data, id) {
		this.configure();
		var devices = data.results;
		try {
			for(var i=0; i<devices.length; i++) {
				var device = devices[i];
				if( device.id == id ) {
					return device.name;
				}
			}
		}
		catch(e) {

		}
		
		return "";
	},
    connioGetDeviceLocation: function (data, id) {
		this.configure();
		var devices = data.results;
		try {
			for(var i=0; i<devices.length; i++) {
				var device = devices[i];
				if( (device.id == id) || (device.name == id) ) {
	      			var locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
					return locationObj;
				}
			}
		}
		catch(e) {
		}
		
		return "";
	},
    connioWriteData: function (device, value, property, successcallback, failurecallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/data/devices/" + device + "/properties/" + property;
		var data = {};
		data.dps = [];
		var val = {};
		val.t = new Date().toISOString();
		val.v = value;
		data.dps.push(val);
		
		$.ajax(
			{
	  			url: url,
	  			type: 'POST',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret),
	    				"Content-Type": "application/json",
	    				"Accept": "application/json"
	    		},
	    		dataType: "json",
	    		data: JSON.stringify(data),
				success: function (response) {
					successcallback(response);
				},
				error: function(xhr, code, msg) {
	  				failurecallback(msg);
	  				console.log("Could not write data.");
				}
	  	});
	},
    connioExecuteMethod: function (device, method, data, successcallback, failurecallback) {
		this.configure();
	},
    connioReadHistorical: function (device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
		var parent = this;
		this.configure();
		var url = this.connioBaseURL + "/v2/data/devices/" + device + "/properties/" + property + "?";

		if( descending!=null ) {
			var sorting = (descending ? "-" : "") + "source.time";
			url += "sort=" + sorting;
		}
		else {
			url += "sort=-source.time";
		}

		if( limit!=null ) {
			url += "&limit=" + limit;
		}
		
		if (timeStart != null && timeEnd != null) {
			url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
		}
		
		$.ajax(
			{
	  			url: url,
	  			type: 'GET',
	        	headers: {
	    				"Authorization": "Basic " + btoa(this.connioKEY + ":" + this.connioSecret)
	    		},
				success: function (response) {
					var timeList = com.fc.JavaScriptDistLib.JSON.parseJSONDataForPath(response, "$.results[:].t");
					var valueList = com.fc.JavaScriptDistLib.JSON.parseJSONDataForPath(response, "$.results[:].v");
					var formattedTimeList = [];
					for (var i=0;i<timeList.length;i++) {
						formattedTimeList.push(moment(timeList[i]).format('MMM-DD hh:mm A'));
					}
					successcallback(formattedTimeList, valueList);
				},
				error: function(xhr, code, msg) {
	  				failurecallback(msg);
	  				console.log("Could not read historical.");
				}
	  	});
	},
    connio_mqtt_connect: function () {
		console.log("Connecting to Connio MQTT...");
		var parent = this;
		try {
			 this.connioMQTTClient.connect( {
			 	onSuccess: function() {
					console.log("Connected to Connio MQTT...");
			 		parent.subscribeToTopic();
			 	},
			 	userName : this.connioMQTTUsername,
			 	password : this.connioMQTTPassword,
			 	keepAliveInterval: 25,
			 	timeout: 60,
			 	useSSL: true
			});
		}
		catch(e) {
			console.log("Connio MQTT connection already exists. Coming out...")
		}
	},
    connio_mqtt_disconnect: function () {
		console.log("Disconnecting Connio MQTT...");
		this.connioMQTTClient.disconnect();
	},
    subscribeToTopic: function () {
		console.log("Subscribing to topic...");
		var parent = this;
		var subscribeOptions = {
		  	qos: 0,  // QoS
			invocationContext: {foo: true},
			onSuccess: function(context) {
				parent.handleMQTTSubscribeSuccess(context);
			},
			onFailure: function(context) {
				parent.handleMQTTSubscribeFailed(context);
				console.log("Could not subscribe to topic");
			},
			timeout: 10
		};

		this.connioMQTTClient.subscribe(this.connioMQTTTopic, subscribeOptions);
	},
    handleMQTTConnectionLost: function (responseObject) {
		console.log("Connection Lost: " + responseObject.errorMessage);
	},
    handleMQTTSubscribeSuccess: function (context) {
		console.log("Subscribe success");
	},
    handleMQTTSubscribeFailed: function (context) {
		console.log("Subscribe failed");
	},
    handleMQTTMessage: function (message) {
		//console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
		if( this.connioMQTTMessageRecvCallback!=null ) {
			var messageArray = message.destinationName.split("/");
			this.connioMQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
		}
	},
    ConnioConfigException: function (snappMessage, msg) {
	    this.name = "ConnioConfigException";
	    this.snappMessage = snappMessage;
	    //custom message from smapp.
	    this.message = msg || snappMessage;
	    this.stack = (new Error()).stack;
	},
    ConnioNetworkException: function (snappMessage, msg) {
	    this.name = "ConnioNetworkException";
	    this.snappMessage = snappMessage;
	    //custom message from smapp.
	    this.message = msg || snappMessage;
	    this.stack = (new Error()).stack;
	},
    ConnioMQTTException: function (snappMessage, msg) {
	    this.name = "ConnioMQTTException";
	    this.snappMessage = snappMessage;
	    //custom message from smapp.
	    this.message = msg || snappMessage;
	    this.stack = (new Error()).stack;
	},
    },
  TimeLibrary: {
    createTime: function (time) {
        var t = time.match(/^(\d{2}):(\d{2})(\s)(\w{2})(\s)(\d{2})\/(\d{2})\/(\d{4})$/);
        if (t ===null)
            return null;
        var d=+t[6], m=+t[7], y=+t[8], sub=t[4], h=+t[1], min=+t[2];
        if (sub.toString().toLowerCase().localeCompare("pm") == 0)
            h=h+12;
        else if(sub.toString().toLowerCase().localeCompare("am") != 0)
            return sub;
        return new Date(y,m-1,d,h,min);
    },
    createTimeNow: function () {
        return new Date();
    },
    createTimeFromTimestamp: function (timestamp) {
        return new Date(Number(timestamp));
    },
    createTimestampFromTime: function (time) {
    return new Date(time).getTime();
    },
    textFromTime: function (time, op) {
      var dateTime =  new Date(time);

      switch(op){
        case "DATE_TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_12_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + m + "/" + d + "/" + y;

        case "DATE_TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_24_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + m + "/" + d + "/" + y;

        case "TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            return H + ":" + M + " " + a;

        case "TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            return H + ":" + M;

        case "DATE":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return d + "/" + m + "/" + y;

        case "DATE_US":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return m + "/" + d + "/" + y;

        default:
            return "";
      }
    },
    elapsedComponent: function (timestamp, num){
        return Math.floor(timestamp/num);
    },
    elapsedComponentsFromTime: function (time, components) {
        var dateTime =  new Date(time.getTime());
        var dateZeroTime = new Date(0);
        var y = dateTime.getUTCFullYear() - dateZeroTime.getUTCFullYear();
        var m =  dateTime.getUTCMonth() - dateZeroTime.getUTCMonth();
        var d =  dateTime.getUTCDate() - dateZeroTime.getUTCDate();
        var h =  dateTime.getUTCHours() - dateZeroTime.getUTCHours();
        var M =  dateTime.getUTCMinutes() - dateZeroTime.getUTCMinutes();
        var s =  dateTime.getUTCSeconds() - dateZeroTime.getUTCSeconds();

        switch(components) {
            case "S":
                return [s];
            case "SM":
                return [M,s];
            case "SMH":
                return [h,M,s];
            case "SMHD":
                return [d,h,M,s];
            case "SMHDM":
                return [m,d,h,M,s];
            case "SMHDMY":
                return [y,m,d,h,M,s];
            default:
                return [];
        }
    },
    componentsFromTime: function (time, components) {
        var dateTime =  new Date(time);
        switch(components) {
            case "S":
                return [dateTime.getSeconds()];
            case "SM":
                return [dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMH":
                return [dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHD":
                return [dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDM":
                return [dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDMY":
                return [dateTime.getFullYear(), dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            default:
                return [];
        }
    },
    numberDayOfWeekFromDate: function (time){
        var dateTime =  new Date(time);
        if (dateTime.getDay() == 0)
            return 7;
        return dateTime.getDay();

    },
    stringDayOfWeekFromDate: function (time) {
        var dateTime =  new Date(time);
        var ar = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
        return ar[dateTime.getDay()];
    },
    createTimeInterval: function ( sec, min, hou, day, mon, yea){
        return [sec,min,hou,day,mon,yea];
    },
    addIntervalFromTime: function (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return new Date(time);
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] + Number(timeInt[5]);
        var month = (elap[1] - 1) + Number(timeInt[4]);
        var day = elap[2] + Number(timeInt[3]);
        var hours = elap[3] + Number(timeInt[2]);
        var min =elap[4] + Number(timeInt[1]);
        var sec = elap[5] + Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() + Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() + Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() + Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() + Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() + Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() + Number(timeInt[5]));
        //return retTime;
    },
    subtractIntervalFromTime: function (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return time;
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] - Number(timeInt[5]);
        var month = (elap[1] - 1) - Number(timeInt[4]);
        var day = elap[2] - Number(timeInt[3]);
        var hours = elap[3] - Number(timeInt[2]);
        var min =elap[4] - Number(timeInt[1]);
        var sec = elap[5] - Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() - Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() - Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() - Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() - Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() - Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() - Number(timeInt[5]));
        //return retTime;
    },
    TimeLibException: function (snappMessage, msg) {
        this.name = "TimeLibException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    },
    },
  MathLibrary: {
    toNumber: function (num) {
        if (this.isNumber(num)) {
            return Number(num);
        }
        return null;
    },
    isNumber: function (o) {
        return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
    },
    mathCompare: function (num1, comp, num2) {
        switch (comp) {
            case "EQ":
                return this.toNumber(num1) == this.toNumber(num2);
            case "NEQ":
                return this.toNumber(num1) != this.toNumber(num2);
            case "LT":
                return this.toNumber(num1) < this.toNumber(num2);
            case "LTE":
                return this.toNumber(num1) <= this.toNumber(num2);
            case "GT":
                return this.toNumber(num1) > this.toNumber(num2);
            case "GTE":
                return this.toNumber(num1) >= this.toNumber(num2);
            default:
                return false;
        }
    },
    mathMinMax: function (num1, comp, num2) {
        switch (comp) {
            case "MIN":
                return Math.min(this.toNumber(num1), this.toNumber(num2));
            case "MAX":
                return Math.max(this.toNumber(num1), this.toNumber(num2));
            default:
                return 0;
        }
    },
    mathModulo: function (num1, comp, num2) {
        switch (comp) {
            case "MODULO":
                return this.toNumber(num1)%this.toNumber(num2);
            case "QUOTIENT":
                return Math.floor(this.toNumber(num1)/this.toNumber(num2));
            default:
                return 0;
        }
    },
    mathConversionRadDeg: function (comp, num) {
        switch (comp) {
            case "DEGTORAD":
                return this.toNumber(num) * (Math.PI/180);
            case "RADTODEG":
                return this.toNumber(num) * (180/Math.PI);
            default:
                return 0;
        }
    },
    mathRoundPrecision: function (num,percision) {
        return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
    },
    MathLibException: function (snappMessage, msg) {
        this.name = "MathLibException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    },
    },
  TextLib: {
    textComparison: function (text1, comp, text2) {
        switch (comp) {
            case "LESS":
                return text1.toString() < text2.toString();
            case "EQUAL":
                return text1.toString() == text2.toString();
            case "GREATER":
                return text1.toString() > text2.toString();
            default:
                return false;
        }
    },
    textTrim: function (text) {
        return text.toString().trim();
    },
    textChangeCase: function (text, comp) {
        switch (comp) {
            case "UPPERCASE":
                return text.toString().toUpperCase();
            case "LOWERCASE":
                return text.toString().toLowerCase();
            default:
                return "";
        }
    },
    textSubstring: function (text, from, length) {
        return text.toString().substring(toNumber(from),toNumber(from) + toNumber(length));
    },
    textContains: function (string, substring) {
        return ((string.toString().indexOf(substring)) !== -1);
    },
    textIndexOf: function (string, substring) {
        return string.toString().indexOf(substring);
    },
    textSplitAt: function (text, index) {
        return [text.toString().substring(0, toNumber(index)), text.toString().substring(toNumber(index))];
    },
    textSplitWith: function (string, separator) {
        return string.toString().split(separator.toString());
    },
    textReplace: function (textFrom, textTo, textSource) {
        var returnText = textSource.toString();
        while (returnText.indexOf(textFrom.toString()) !== -1){
            returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
        }
        return returnText;
    },
    isText: function (text) {
        return (typeof text === 'string' || text instanceof String);
    },
    convertToText: function (data) {
        if( jQuery.isXMLDoc( data ) ) {
            return  (new XMLSerializer()).serializeToString(data);
        }
        else if( jQuery.isArray( data ) )  {
            return data.toString();
        }
        else if( typeof data == 'string' ) {
            return data;
        }
        else {
            return JSON.stringify(data);
        }
    },
    },
  Dictionary: {
    removeAllKeys: function (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
  },
    getKeys: function (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  },
    },
  ListLibrary: {
    listAdd: function (list,item) {
    return list.push(item);
  },
    listContains: function (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  },
    listAppend: function (list1,list2) {
    return list1.concat(list2);
  },
    listCheck: function (list) {
    return (list instanceof Array) ? true: false;
  },
    listEmpty: function (list) {
    return list.length = 0;
  },
    listOrder: function (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  },
    ListLibException: function (snappMessage, msg) {
    this.name = "ListLibException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  },
    },
  Gauge: {
    setProperty: function (objName, property, value) {
    try {
      var elemSelector = '[obj-name="' + objName + '"]';
      var elem = $(elemSelector);
      var gauge;
      $(elemSelector).find('.c3').each(function() {
        gauge = $(this).data('c3-chart'); 
      });
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          com.fc.JavaScriptDistLib.setProperty(objName, property, value);
        break;
        case "Alpha":
          d3.selectAll(elemSelector).style('opacity', value/100)
        break;
        case "Background color":
          $(elemSelector + ' svg').css("background-color",value);  
        break;
        case "Current Value":
          gauge.load({columns: [['data', value]]});
          break;
        case "Maximum Value":
          gauge.internal.config.gauge_max = value;
          var gaugeData = gauge.data();
          var gaugeCurrVal = gaugeData[0].values[0].value;
          gauge.load({columns: [['data', gaugeCurrVal]]});
        break;
        case "Minimum Value":
          gauge.internal.config.gauge_min = value;
          var gaugeData = gauge.data();
          var gaugeCurrVal = gaugeData[0].values[0].value;
          gauge.load({columns: [['data', gaugeCurrVal]]});  
        break;
        case "track color":
          d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill', value)
        break;
        case "pointer color":
          d3.selectAll(elemSelector).select('path.c3-arc-data').style('fill', value);  
        break;
        case "track width":
          gauge.internal.config.gauge_width = value;
          var gaugeData = gauge.data();
          var gaugeCurrVal = gaugeData[0].values[0].value;
          gauge.load({columns: [['data', gaugeCurrVal]]});
        break;
      }
    } catch (e) {
      throw new com.fc.JavaScriptDistLib.Gauge.GaugeException(e);
    }
  },
    getProperty: function ( objName, property) {
    try {
      var elemSelector = '[obj-name= "' + objName + '"]';
      var elem = $(elemSelector);
      var gauge;
      $(elemSelector).find('.c3').each(function() {
        gauge = $(this).data('c3-chart'); 
      });
      var value;
      switch (property) {
        case "width":
        case "height":
        case "x":
        case "y":
          value  = com.fc.JavaScriptDistLib.getProperty( objName, property);
        break;
        case "Alpha":
          value  =  $(elemSelector).css('opacity') * 100;
        break;
        case "Background color":
          value  = $(elemSelector).find('#fcGauge').css("background-color");
        break;
        case "Current Value":
          value  = gauge.data()[0].values[0].value;
        break;
        case "Maximum Value":
          value = gauge.internal.config.gauge_max;
        break;
        case "Minimum Value":
          value = gauge.internal.config.gauge_min;
        break;
        case "track color":
          value = d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill');
        break;
        case "pointer color":
          value = d3.selectAll(elemSelector).select('path.c3-arc-data').style('fill');
          break;
        case "track width":
          value = gauge.internal.config.gauge_width;
        break;
      }
      return value;
    } catch (e) {
      throw new com.fc.JavaScriptDistLib.Gauge.GaugeException(e);
    }
  },
    GaugeException: function (snappMessage, msg) {
    this.name = "GaugeException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  },
    },
  MapContainer: {
    maps: {
      },
    setProperty: function (objName, property, value) {
  },
    getProperty: function (objName, property) {
  },
    mapViewSetZoom: function (mapName, zoom) {
    return this.maps[mapName].setZoom(zoom);
  },
    toggleMapUserInteraction: function (mapName, interaction) {
    var options = {
      draggable: false,
      scrollwheel: false,
      panControl: false,
      zoom: this.maps[mapName].getZoom(),
    };
    if (interaction) {
      var options = {
        draggable: true,
        scrollwheel: true,
        panControl: true,
        zoom: this.maps[mapName].getZoom(),
      };
    }
    var newOptions = this.maps[mapName].setOptions(options);
    return newOptions;
  },
    setLocationForMarker: function (marker,location) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    marker.setPosition(latlng);
  },
    createMarkerWithImage: function (image, label) {
    var marker = new google.maps.Marker({ title: label, icon: image });
    //this.markers.push(marker);
    return marker;
  },
    addMarkerToMap: function (mapName, marker) {
    marker.setMap(this.maps[mapName]);
  },
    setMarkerLabel: function (text, marker) {
    return marker.setTitle(text);
  },
    setMarkerImage: function (image, marker) {
    return marker.setIcon(image);
  },
    removeMarker: function (marker) {
    return marker.setMap(null);
  },
    mapViewSetLocation: function (mapName, location, animation) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    this.maps[mapName].setCenter(latlng);
  },
    MapException: function (snappMessage, msg) {
    this.name = "MapException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  },
    },
  handleException: function (e, message) {
        console.error('Exception: ', e, message);
    },
  }


 

});
$( document ).ready(function() {
var locStation;


// Block#: 1
function on_stationsButton_click( ) {
  try {
      // Block#: 2
  com.fc.JavaScriptDistLib.Connio.connioStartTrackingPropertyChanges(on_connio_property_updated);// Block#: 3
  com.fc.JavaScriptDistLib.Connio.connioGetDevices('_dpf_807651864374550548',
   function(devices){
    // Block#: 5
    locStation = (com.fc.JavaScriptDistLib.Connio.connioGetDeviceLocation(devices, '_dev_807652890532634093'));
    // Block#: 9
    com.fc.JavaScriptDistLib.Label.setProperty("deviceName", "Text", com.fc.JavaScriptDistLib.Connio.connioGetDeviceName(devices, '_dev_807652890532634093'));// Block#: 13
    com.fc.JavaScriptDistLib.Label.setProperty("deviceLocation", "Text", [(com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Location.locationGetLatitude(locStation))),', ',(com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Location.locationGetLongitude(locStation)))].join(''));
  });
  // Block#: 22
  com.fc.JavaScriptDistLib.Connio.connioReadData('_dev_807652890532634093',
   function(data){
    // Block#: 24
    com.fc.JavaScriptDistLib.Label.setProperty("temperature", "Text", String(com.fc.JavaScriptDistLib.TextLib.convertToText(com.fc.JavaScriptDistLib.Connio.connionGetValue(data, 'mostRecent', 'temperature'))) + String(' C'));// Block#: 31
    com.fc.JavaScriptDistLib.Gauge.setProperty("Gauge", "Current Value", com.fc.JavaScriptDistLib.MathLibrary.toNumber(com.fc.JavaScriptDistLib.Connio.connionGetValue(data, 'mostRecent', 'temperature'))
    );
  },
   function(error_data){

  });// Block#: 36
  com.fc.JavaScriptDistLib.Connio.connioReadHistorical('_dev_807652890532634093', 'temperature', null, null, true, 5,
   function(time_list, value_list){
    // Block#: 41
    com.fc.JavaScriptDistLib.Label.setProperty("History", "Text", com.fc.JavaScriptDistLib.TextLib.convertToText(value_list[0]));
  },
   function(error_data){

  });
  } catch (e) { com.fc.JavaScriptDistLib.handleException(e); }};
$('[obj-name="stationsButton"]').on( 'click',  on_stationsButton_click );
// Block#: 45
function on_connio_property_updated (device_id,property, value) {
  try {
      // Block#: 46
  if (property == ('temperature')) {
    // Block#: 50
    com.fc.JavaScriptDistLib.Label.setProperty("temperature", "Text", String(value) + String(' C'));// Block#: 54
    com.fc.JavaScriptDistLib.Gauge.setProperty("Gauge", "Current Value", com.fc.JavaScriptDistLib.MathLibrary.toNumber(value)
    );}

  } catch (e) { com.fc.JavaScriptDistLib.handleException(e); }};


$('[obj-name="MainScreen"]').show();
});

// Generated by snapp

