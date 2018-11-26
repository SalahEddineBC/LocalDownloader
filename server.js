var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
  
http.createServer(function(request, response) {
    var args=process.argv.slice(2);
    console.log(args[0]);
    var appname=args[0];

    var extension=appname.split('.')[1];

    var filePath = path.join(__dirname, appname);
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': extension,
        'Content-Length': stat.size,
        'Content-Disposition':'attachment; filename="'+appname+'"'
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(2001,()=>{console.log('server started')});