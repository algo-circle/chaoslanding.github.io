var main = function () {
    var CANVAS = document.getElementById("your_canvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    /*========================= CAPTURE MOUSE EVENTS ========================= */
    
    MOUSE.initialize(CANVAS);

    /*========================= GET WEBGL CONTEXT ========================= */
    var GL; // Se crea la variable webl
    try {
        GL = CANVAS.getContext("experimental-webgl", {antialias: true});
    } catch (e) {
        alert("You are not webgl compatible :(");
        return false;
    }

    /*========================= SHADERS ========================= */ 
    
    SHADERS.initialize(GL);

    /*========================= THE MODEL ====================== */
    
    var tierra = new Astro(-1, 0, 0.002, true);
    tierra.model(GL, 1.27 / 2, "res/tierra.jpg");
     
    var luna = new Astro(2, 0.0035, 0, true);
    luna.model(GL, 0.34 / 2, "res/luna1.jpg");
    
    tierra.addSatelite(luna);

    /*========================= MATRIX ========================= */

    var PROJMATRIX = LIBS.getProjection(40, CANVAS.width / CANVAS.height, 1, 100); // Se establece la matriz de proyección
    var MOVEMATRIX = LIBS.getI4(); // Se inicia la matriz de movimiento como la matriz identidad
    var VIEWMATRIX = LIBS.getI4(); // Se inicia la matriz de vista como la matriz identidad

    LIBS.translateZ(VIEWMATRIX, -3); // Se traslada la cámara hacia atrás realizando una traslación sobre la matriz de vista
    
    var THETA = 0, PHI = 0; // Variables usadas para el movimiento

    /*========================= DRAWING ========================= */
    GL.enable(GL.DEPTH_TEST); // The depth test buffer is enabled
    GL.depthFunc(GL.LEQUAL); //Specifies the value used for depth buffer comparisons
	
    GL.clearColor(0.0, 0.0, 0.0, 0.0); // The clear color is assigned as transparent
    GL.clearDepth(1.0); //The cleaning value for the depth buffer is assigned to 1
	
	
    var draw = function () { //This function draws the scene
        LIBS.setI4(MOVEMATRIX);             // The identity matrix is ​​given as a value to the movement matrix
        
        GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height); // Set the drawn area
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT); //The clean
        
        GL.uniformMatrix4fv(SHADERS._Mmatrix, false, MOVEMATRIX); // The model matrix is ​​assigned 
        GL.uniformMatrix4fv(SHADERS._Pmatrix, false, PROJMATRIX); // The projection matrix is ​​assigned
        GL.uniformMatrix4fv(SHADERS._Vmatrix, false, VIEWMATRIX); // The view matrix is ​​assigned
        
        tierra.draw(GL, new Stack()); // Astro on which the rest of the stars revolve

        GL.flush(); // The drawing is forced
        window.requestAnimationFrame(draw); // Repaint the scene
    };
    
    draw(); // The drawing begins
};