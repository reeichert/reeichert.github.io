function stringContainsAnyOfElements(string, elements){
    string = string.toLowerCase();
    for(var i = 0; i < elements.length; i++) {
        if(string.indexOf(elements[i]) != -1) {
            return true;
        }
    }
    return false;
}

var palavrasBloqueadas = ["TV", "revolta", "PT", "copa", "do", "mundo", "fora", "Revolta"];
var postsBloqueados = ["TV", "revolta", "PT", "copa", "do", "mundo", "fora", "Revolta", "compartilhe"];
var postsPermitidos = ["facebook"];
var elementsToSearchForNames = [".uiStreamPassive", ".translationEligibleUserAttachmentMessage"];

function runScript() {
    if(document.URL.indexOf("facebook.com") == -1) {
        alert("Desculpe, aqui ele não funciona!");
    } else {
        var postsToRemove = new Array();
        
        $(".uiUnifiedStory").each(function(){  
            var post = $(this);
            if(post && !stringContainsAnyOfElements(post.html(), postsPermitidos)) {
            	if(stringContainsAnyOfElements(post.html(), postsBloqueados)) {
            	    postsToRemove.push(post);
            	    post.css("background-color", "red");
            	} else {
            	    for(var i = 0; i < elementsToSearchForNames.length; i++) {
            	        $(this).find(elementsToSearchForNames[i]).children().each(function(){
            	            var text = $(this).text();
            	            if(stringContainsAnyOfElements(text, palavrasBloqueadas) && !stringContainsAnyOfElements(text, ["other friends"])) {
            	                postsToRemove.push(post);
            	                post.css("background-color", "red");
            	            }
            	        });
            	    }
            	}
			}
        });
        
        $('#globalContainer').prepend('<div id="scrollingDiv" style="font-size: 14px; position:absolute;z-index:100;background-color:#EFEFEF;" align="center"><b>Script por mim!</a><br/></b><br/>Posts marcados: ' + postsToRemove.length + ' (em vermelho)<br/><a id="scriptApagar">Apagar</a> | <a id="scriptCancelar">Cancelar</a</div>');
        
        var $sidebar   = $("#scrollingDiv"),
            $window    = $(window),
            offset     = $sidebar.offset(),
            topPadding = $window.height()/2;

        $window.scroll(function() {
            if ($window.scrollTop() > offset.top) {
                $sidebar.stop().animate({
                    marginTop: $window.scrollTop() - offset.top + topPadding
                });
            } else {
                $sidebar.stop().animate({
                    marginTop: 0
                });
            }
        });
        
        $('#scriptApagar').live("click", function(){
            for(var i = 0; i < postsToRemove.length; i++) {
                postsToRemove[i].remove();
            }
            $("#scrollingDiv").remove();
        });
        
        $('#scriptCancelar').live("click", function(){
            for(var i = 0; i < postsToRemove.length; i++) {
                postsToRemove[i].css("background-color", "white");
            }
            $("#scrollingDiv").remove();
        });
    }
};

if (typeof jQuery == 'undefined') {
	var jQ = document.createElement('script');
	jQ.type = 'text/javascript';
	jQ.onload=runScript;
	jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	document.body.appendChild(jQ);
} else {
	runScript();
}
