
(function main(){
    var targetPath= Folder.selectDialog('Image directory');
    var files = targetPath.getFiles();
    var images = new Array();
    for (var j = 0; j < files.length; j++){
        if (files[j].fullName.search('.jpg') != -1) {
            vectorise(files[j], targetPath);
        }
    }
    alert('Completed')

})();
function vectorise(file, dstDir){
    app.open(file);
    var sourceDoc = app.activeDocument;
    var dstFile = getNewName(file, dstDir);
    var layer = app.activeDocument.layers.getByName('Layer 1');
    var pageItems = layer.pageItems;
    for (var i = pageItems.length - 1; i >= 0; i--) {
        pic =pageItems[i].trace();
        //High Fidelity Photo
        pic.tracing.tracingOptions.loadFromPreset('16 Colors');
    }

    // Export as PNG
    var options = new ImageCaptureOptions();
    for (var i = 0; i < sourceDoc.visibleBounds.lenght; i++) {
        options.artBoardClipping = false;
        options.resolution = 300;
        options.antiAliasing = false;
        options.matte = false;
        // options.horizontalScale = 100;
        // options.verticalScale = 100;
        options.transparency = true;

       
        sourceDoc.imageCapture(dstFile, sourceDoc.visibleBounds, options); 
    }

    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function getNewName(file, dstDir)
{
    //Create new map in image folder
    newDir=dstDir+'/result';
    var ext, docName, newName, saveInFile, docName;
    docName = file.name;
    
    ext = '.png'; // new extension for png file
    newName = "";
       
    for ( var i = 0 ; docName[i] != "." ; i++ ){
        newName += docName[i];
    }

    newName += ext; // full png name of the file
    
	// If Folder isn't there create it
	if(!Folder(newDir).exists){
		Folder(newDir).create();
	}
	
    // Create a file object to save the png
    
    saveInFile = new File(newDir+'/'+newName );
    return saveInFile;
}