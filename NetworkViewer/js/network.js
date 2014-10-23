/*

General network graph of nodes and edges.

*/

var Network = function (svg, system) {
    
    this.svg = svg;
    this.width = this.svg.attr("width");
    this.height = this.svg.attr("height"); 
    this.charge = -100;
    this.link_distance = 60
    this.color_on = false;
    this.node_text_on = true;
    this.system = system;
    
    // Create an svg canvas for D3 plot
    
    this.graph_force = d3.layout.force()
        .charge(this.charge)
        .linkDistance(this.link_distance)
        .size([this.width-10, this.height-10]);
        
    this.graph = this.build_network(system);
    
    if (this.color_on == true) {
        this.color_network();
    };

};


Network.prototype.build_network = function() {
    // Builds a D3 network from graph data (in JSON form).
    var graph_force = this.graph_force;
    
    var system = this.system; 
    
    graph_force
        .nodes(system.nodes)
        .links(system.links)
        .start();
    
    var graph_link = this.svg.selectAll(".graph_link")
        .data(system.links)
        .enter().append("line")
        .attr("class", "graph_link");
        
    var graph_node = this.svg.selectAll(".graph_node")
        .data(system.nodes)
        .enter().append("g")
        .attr("class", "graph_node")
        .call(graph_force.drag); 
        
    var graph_circle = graph_node.append("circle")
        .attr("class", "graph_circle")
        .attr("id", function(d) {return "node-"+d.index})
        .attr("node-index", function(d) {return d.index})
        .attr("r", 13)
    
    graph_force.on("tick", function () {
        graph_node   
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
            
        graph_link 
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    });
    
    this.graph_circle = graph_circle;
    this.graph_force = graph_force;
    this.graph_link = graph_link;
    this.graph_node = graph_node;
    this.system = system;
    this.add_node_names();
    
};


Network.prototype.color_network = function() {
    // Builds a D3 network from graph data (in JSON form).
    var colors = d3.interpolate('orange', 'purple');
    
    this.graph_node
        .attr("fill", function(d){ return colors(d.value*70)});
};


Network.prototype.add_node_names = function() {
    // Add names to each node if given.
    var system = this.system;
    var graph_force = this.graph_force;
    var graph_node = this.graph_node;
    var graph_link = this.graph_link;
    
    var graph_text = graph_node.append("text")
        .attr("class", "graph_text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { 
            return d.name;
        });
        
    graph_force.on("tick", function () { 
        graph_node   
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        
        graph_link 
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    });
        
    this.graph_text = graph_text;
    this.graph_force = graph_force;
    this.graph_node = graph_node;
    this.graph_link = graph_link;
}
