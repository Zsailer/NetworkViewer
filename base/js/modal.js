var Modal = function(id) {
    /**
    * Generic Modal for pop up menus.
    * Parameters:
    * ----------
    * id: string
    *   html element `id` to give the modal
    **/
    
    this.id = id;
    this.items = [];
    
    // Build Modal header
    var close_button = $("<button></button>")
                .addClass("close")
                .attr("data-dismiss", "modal")
                .append(
                    $("<span>&times;</span>")
                        .attr("aria-hidden", "true"),
                    $("<span>Close</span>")
                        .addClass("sr-only")
                ),
        title = $("<h4></h4>")
                .addClass("modal-title")
                .attr("id", this.id+"_title");
        
    this.header = $("<div></div>")
                .addClass("modal-header")
                .append(close_button, title);
                
    
    // Build modal body
    this.body = $("<div></div>")
                .addClass("modal-body")
                .attr("id",this.id+"_body");
    
    // Build modal footer
    this.footer = $("<div></div>")
                .addClass("modal-footer")
                .attr("id", this.id+"_footer")
                .append(
                    $("<button>Apply</button>")
                        .addClass("btn btn-default")
                        .attr("data-dismiss","modal")
                        .attr("id", this.id+"_apply")
                );

    
    this.content = $("<div></div>")
                .addClass("modal-content")
                .attr("id", this.id+"_content")
                .append(this.header, this.body, this.footer);
                    
    this.dialog = $("<div></div>")
                .addClass("modal-dialog")
                .attr("id",this.id+"_dialog")
                .append(this.content);
                    
    // Build generic modal structure
    this.window = $("<div></div>")
                .addClass("modal fade")
                .attr("id", this.id+"_window")   
                .attr("role", "dialog")
                .attr("aria-hidden", "true")
                .append(this.dialog);
                
};


Modal.prototype.create_modal_toggle = function(text){
    /**
    * Initiates the modal window to appear
    *
    * Parameters:
    * ----------
    * text: str
    *   text that will appear on window
    **/
    this.modal_toggle_button = $("<button></button>")
                .addClass("btn btn-primary btn-lg")
                .attr("data-toggle", "modal")
                .attr("data-target", "#"+this.id+"_window")
                .attr("id", this.id+"_toggle")
                .text(text);
                
    return this.modal_toggle_button;
};


Modal.prototype.add_element_to_grid = function(id){
    this.items.push(id);
}


Modal.prototype.dropdown = function (id, title, options) {
    /**
    * Adds a dropdown menu to the modal
    *
    * Parameters:
    * ----------
    * id: str
    *   html element `id` for the dropdown
    * title: str
    *   text to display on dropdown button
    * option: array of strings
    *   text for each option in the dropdwon
    **/
    
    var button = $("<button>"+text+"</button>")
                .addClass("btn btn-default dropdown-toggle")
                .attr("type", "button")
                .attr("data-toggle","dropdown")
                .attr("id", id+"_button")
                .append($("<span>")
                    .addClass("caret")
                );
                
    
    var option_list = $("<ul></ul>")
                .addClass("dropdown-menu")
                .attr("role", "menu")
                .attr("aria-labelledby", id+"_button");
     
    for (i=0; i<options.length; i++) {
        option_list.append($("<li></li>")
                .attr("role", "presentation")
                .append($("<a>"+options[i]+"</a>")
                .attr("id", options[i]+"")
                    .attr("role","menuitem")
                    .attr("tabindex", "-1")
                )
        );
    };
    
    var menu = $("<div></div>")
                .addClass("dropdown")
                .attr("id", id+"_dropdown")
                .append(button, option_list);
                
    $("#"+this.id+"_body").append(menu);      
};

Modal.prototype.toggle_button = function(id, text) {
    /**
    * Adds a toggle button to the modal, can be used as a switch
    *
    * Parameters:
    * ----------
    * id: str
    *   html element `id` for the dropdown
    * title: str
    *   text to display on toggle button
    **/
    var button = $("<button></button>")
                .addClass("btn btn-primary")
                .attr("id", id)
                .attr("data-toggle", "button")
                .text(text);
                
    $("#"+this.id+"_body").append(button);       
};