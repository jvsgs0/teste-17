
img = "";
objects = [];
modelStatus = "";

function preload()
{
    img = loadImage('MC.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando objetos";
}

function modelLoaded()
{
    console.log("Modelo Carregado!");
    modelStatus = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if (modelStatus != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objeto Detectado";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects.y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}