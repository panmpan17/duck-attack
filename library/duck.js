/**
    Box2d basics, uses debugdraw
    Silver Moon
    m00n.silv3r@gmail.com
*/
 
//Global classnames from Box2d namespace
var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2Shape = Box2D.Collision.Shapes.b2Shape
	, b2Joint = Box2D.Dynamics.Joints.b2Joint
	, b2Settings = Box2D.Common.b2Settings
	, b2RevoluteJointDef =  Box2D.Dynamics.Joints.b2RevoluteJointDef
    ;

var world,
	ctx,
	canvas_width,
	canvas_height,
	box,
	ball,
	touchx,
	touchy,
	testx;

var	scale = 100,
	begin = 0,
	drawstone = 0,
	chance = 20,
	ruledtf = false,
	rx = 0,
	ry = 0;

// image

var duck = new Image();
	anmy = new Image(),
 	lput = new Image(),
	stone = new Image(),
 	line = new Image(),
 	rule = new Image(),
 	ruled = new Image();
 	

duck.src = "/images/duck.png";
anmy.src = "/images/anmy.png";
lput.src = "/images/line_put.png";
stone.src = "/images/stone.png";
line.src = "/images/line.png";
rule.src = "/images/rule.png";
ruled.src = "/images/rulepage.png"

var	duckx = 1150,ducky = 180,
	ax = 0,ay = 400,
	lpx = 957,lpy = 250,
	sx = 765,sy = -100,
	lx = 755,ly = 220;


function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
      }

function drawDuck(x,y)
{
	ctx.drawImage(duck, x, y);
}
function drawStone(x,y)
{
	ctx.drawImage(stone, sx, sy);
}
function drawanmy(x,y)
{
	ctx.drawImage(anmy,x,y);
}
function drawline(x,y)
{
	ctx.drawImage(line,x,y);
}
function drawlp(x,y)
{
	ctx.drawImage(lput,x,y)
}


function createduck(world, x, y, width, height)
{
	box = createBox(world, x, y, width, height, 1);
	duckx = (x * 100) - 35;
	ducky = (3.8 - y) * 100 - 45;
	drawDuck(duckx,ducky);
}
function createstone(world, x, y)
{
	
	ball = createBall(world, x, y, 0.325, 1000,
		{'user_data' : {'fill_color' : 'rgba(204,100,0,0.3)' , 'border_color' : '#555' }});
	sx, sy = stonechange(x,y,"java")
	drawStone(sx,sy);
}

function createanmy(world,x,y)
{
	box2 = createBox(world, x, y, 0.14, 0.25, 1);
}

/*
    Draw a world
    this method is called in a loop to redraw the world
*/  
function draw_world(world, context) 
{
	//first clear the canvas
	ctx.clearRect( 0 , 0 , canvas_width, canvas_height );//clean the canvas
	 
	ctx.fillStyle = '#FFF4C9';//some style
	  //  ctx.fillStyle = '#000000';

	ctx.fillRect(0,0, canvas_width, canvas_height);//make the canvas
	    
	//convert the canvas coordinate directions to cartesian
	ctx.save();//save the ctx
	ctx.translate(0 , canvas_height);//copy
	ctx.scale(1 , -1);//the object shape

	world.DrawDebugData();//debug

	ctx.restore();//go back last step
	 
	ctx.font = 'bold 40px Lucida Georgia';//the text's font
	ctx.textAlign = 'left';//let text align to left
	ctx.fillStyle = '#000000';//the text's style
	ctx.fillText("Duck Attack", 0, 30);//the text
	ctx.font = 'bold 8px Georgia';//another text's font
	ctx.fillText("Made by Michael Pan", 220, 30);//another text
	ctx.textAlign = 'left';// change the text to center
	ctx.font="25px Georgia";
	ctx.fillText("Chance: " + chance,70 ,490)
}
 
function addjoint1(objecta,objectb)
{
	var joint_def = new b2RevoluteJointDef();

	joint_def.bodyA = objecta;
	joint_def.bodyB = objectb;
	joint_def.localAnchorA = new b2Vec2(0, 0);
	joint_def.localAnchorB = new b2Vec2(0, 0);
	world.CreateJoint(joint_def);
}

function addjoint2(objecta,objectb)
{
	var joint_def = new b2RevoluteJointDef();

	joint_def.bodyA = objecta;
	joint_def.bodyB = objectb;
	joint_def.localAnchorA = new b2Vec2(2.7, 0);
	joint_def.localAnchorB = new b2Vec2(0, 0);
	world.CreateJoint(joint_def);
}

function addjoint3(objecta,objectb)
{
	var joint_def = new b2RevoluteJointDef();

	joint_def.bodyA = objecta;
	joint_def.bodyB = objectb;
	joint_def.localAnchorA = new b2Vec2(-2.7, 0);
	joint_def.localAnchorB = new b2Vec2(0, 0);
	world.CreateJoint(joint_def);
}


function addjoint4(objecta,objectb)
{
	var joint_def = new b2RevoluteJointDef();

	joint_def.bodyA = objecta;
	joint_def.bodyB = objectb;
	joint_def.localAnchorA = new b2Vec2(-5.4, 0);
	joint_def.localAnchorB = new b2Vec2(0, 0);
	world.CreateJoint(joint_def);
}

//Create box2d world object
function createWorld() 
{
    //gravity vector x, y - 10 m/s2 - thats earth!!
	var gravity = new b2Vec2(0, -9.8);//create a new gravity

	world = new b2World(gravity , true );//create a new world
	//setup debug draw
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
	debugDraw.SetDrawScale(scale);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

	world.SetDebugDraw(debugDraw);

	//createground(world);
	ground = createBox(world, 7.33, 0.2, 7.3 , 0.2, 1.0, {type : b2Body.b2_staticBody}),
          createBox(world,13, 0.2, 0.2 , 5, 1.0, {type : b2Body.b2_staticBody});

    var a = createBox(world, 9.8, 3, 2.8, 0.125, 1); 
    var b = createBox(world, 9.8, 1.4, 0.25, 1, 1, {type : b2Body.b2_staticBody});
    var c = createBox(world, 12.5, 1.4, 0.125 , 0.5 , 2);
    var d = createBox(world, 7.1, 1.4, 0.125, 0.5 ,1);

    addjoint1(a,b);
    addjoint2(a,c);
    addjoint3(a,d);
    addjoint4(c,d);


	return world;
}       

function createBall(world, x, y, r, density, options) 
{
	var body_def = new b2BodyDef();
	var fix_def = new b2FixtureDef;
	
	fix_def.density = density;
	fix_def.friction = 0.5;
	fix_def.restitution = 0.5;

	var shape = new b2CircleShape(r);
	fix_def.shape = shape;

	body_def.position.Set(x , y);

	body_def.linearDamping = 0.0;
	body_def.angularDamping = 0.0;

	body_def.type = b2Body.b2_dynamicBody;
	body_def.userData = options.user_data;

	var b = world.CreateBody( body_def );
	b.CreateFixture(fix_def);


	return b;
}
function stonechange(xn,yn,xy)
{
	var x = 0;
		var y = 0;
	if(xy=="java")
	{
		x = xn * 100 - 25;
		y = (3.8 - yn) * 100 - 35;
	}
	else
	{
		x = (xn + 25) / 100;
		y = ((xy + 35) / 100) * -1 + 3.8
		
	}
	return x, y
}
function Obj(x, y) {
	this.x = x;
	this.y = y;
	this.getX = function () {
		return this.x;
	}
}

var test = new Obj(1, 2);

//Create some elements
function createHelloWorld() 
{
	createduck(world,12.05,1.5,0.25,0.25);
	createstone(world, -1, 3);
	createanmy(world, 0.2, 0.6);
    
}
 
//Create standard boxes of given height , width at x,y
function createBox(world, x, y, width, height, density, options) 
{
	//default setting
	options = $.extend(true, {
	'density' : density ,
	'friction' : 1.0 ,
	'restitution' : 0.5 ,
	 
	'linearDamping' : 0.0 ,
	'angularDamping' : 0.0 ,
	 
	'type' : b2Body.b2_dynamicBody
	}, options);
	   
	var body_def = new b2BodyDef();
	var fix_def = new b2FixtureDef();
	 
	fix_def.density = options.density;
	fix_def.friction = options.friction;
	fix_def.restitution = options.restitution;
	 
	fix_def.shape = new b2PolygonShape();
	     
	fix_def.shape.SetAsBox( width , height );
	 
	body_def.position.Set(x , y);
	 
	body_def.linearDamping = options.linearDamping;
	body_def.angularDamping = options.angularDamping;
	body_def.type = options.type;
	body_def.userData = options.user_data;
	
	var b = world.CreateBody( body_def );
	var f = b.CreateFixture(fix_def);
	
	return b;
}
 
/*
    This method will draw the world again and again
    called by settimeout , self looped
*/

var step = function() 
{
    var fps = 60;
    var timeStep = 1.0/fps;
     
    //move the world ahead , step ahead man!!
    world.Step(timeStep , 8 , 3);
    world.ClearForces();
     
    draw_world(world, ctx);
    
    drawanmy(ax,ay);
    //drawline(lx,ly);
    //drawlp(lpx,lpy);
    
    drawDuck(duckx,ducky);
    drawStone(sx,sy);
    ctx.drawImage(rule,5,465);

    ctx.moveTo(735,0);
	ctx.lineTo(735,250);
	ctx.moveTo(900,0);
	ctx.lineTo(900,250);
	ctx.stroke();
	duckx = (box.GetPosition().x)*100-35;
	ducky = (3.8-(box.GetPosition().y))*100+75;

	sx = (ball.GetPosition().x)*100-33;
	sy = (3.8-(ball.GetPosition().y))*100+89;
	if (sy>395)
	{
		world.DestroyBody(ball);
		sx = -60;
		sy = -60;
	}/*
	if (ducky>380)
	{
		world.DestroyBody(box);
		duckx = -100;
		ducky = -100;
	}*/

	testx = (box2.GetPosition().x);
	if (testx == (ax+20)/100)
	{
	}
	else
	{
		//chance = (chance+5)**2+1;
		location.href= ("/win")//+chance); 
	}
	if (ruledtf)
	{
		ctx.drawImage(ruled,rx,ry);
	}

}

function get_real(p)
{
    return new b2Vec2(p.x -0.1,5- p.y);
}

 
// main entry point
$(document).ready(function() 
{
    var canvas = $('#canvas');
    ctx = canvas.get(0).getContext('2d');
     
    //first create the world
    world = createWorld();
     
    //get internal dimensions of the canvas
    canvas_width = parseInt(canvas.attr('width'));
    canvas_height = parseInt(canvas.attr('height'));
     
    //create the hello world boxes in the world
    createHelloWorld();
     
    
	canvas.click( function(e) 
    {
        var p = get_real(new b2Vec2(e.clientX / scale, e.clientY / scale));
         
        //create shape
		
		touchx = p.x * 100;
		touchy = (3.8 - p.y) * 100;
		if (ruledtf==false)
		{
			if (touchx < 900 && touchx>735)
			{
				if (touchy<160)
				{
					if (chance<0)
					{
						location.href= ('/fail'); 
					}
					else
					{
						world.DestroyBody(box);
						
						createduck(world,12.05,1.5,0.25,0.25);

						ax=ax+25;
						world.DestroyBody(box2);
						createanmy(world, (ax+20)/100, 0.6);

						drawstone = 1;
						world.DestroyBody(ball);
						
						createstone(world,p.x, p.y)
						chance = chance - 1;
					}
				}
				
			}
		}
		if (ruledtf)
		{
			rx = -1300;
			ry = -500
			ruledtf = false;
		}
		if (touchx>5 && touchx<65)
		{
			if (touchy>355 && touchy<395)
			{
				ruledtf = true;
				rx = 0;
				ry = 0;
			}
		}
		
    });
	window.setInterval(step, 1000 / 60);
});