var TEXTURE = {
    getTexture: function (GL, imageURL) {
        var image = new Image(); // a javaScript image object is created

        image.src = imageURL; // The webgl texture will be saved as a property of the image
        image.webglTexture = false;
        
        image.onload = function (e) { // This function creates the webgl texture object when the image has been loaded
            var texture = GL.createTexture(); // The texture is created
            GL.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, true); // The order of the vertical pixels is inverted
            GL.bindTexture(GL.TEXTURE_2D, texture); // An emlace is made with the context
            GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image); // The image data is sent to the texture
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR); // The expansion filter is set
            GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST_MIPMAP_LINEAR); // The reduction filter is established
            GL.generateMipmap(GL.TEXTURE_2D); // Different textures are generated for different resolutions
            GL.bindTexture(GL.TEXTURE_2D, null); // The context is released 
            image.webglTexture = texture;
        };

        return image;
    }
};