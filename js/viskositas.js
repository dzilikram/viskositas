const yMax = 0;   //meter ke mm
var velocity = [];
var time = [];
const deltaTime = 1/120;

function ballVolume(radius){
    return (4/3)*(22/7)*Math.pow(radius/1000, 3);
}
function ballMass(ballVolume,ballDensity){
    return ballVolume*ballDensity;
}

function buoyantForce(liquidDensity,ballVolume){
    return liquidDensity*ballVolume*9.8;
}

function c(ballRadius, liquidDensity) {
    return (((22/7)/2)*Math.pow((ballRadius/1000),2))*liquidDensity;
}
function dragForce(dragCoef, c, velocity){
    return c*dragCoef*Math.pow(velocity,2);
}

function dragCoef(velocity, ballRadius, liquidDensity, liquidViscosity){

    if(velocity === 0){
        return 1;
    }else{
        var rn = (ballRadius/1000)*liquidDensity*velocity/(liquidViscosity/1000);

        if(rn < 2){
            return 24/rn;
        }else if(rn >= 200000){
            return 0.31594;
        }else{
            return (24/rn) + ((2.6*(rn/5))/(1+Math.pow(rn/5,2))) +
                ((0.411*(Math.pow(rn/263000,-7.94)))/
                (1+(Math.pow(rn/263000,-8)))) + ((0.25*(rn/1000000))/
                    (1+(rn/1000000)));

        }
    }
}

function reynoldNumber(ballRadius, liquidDensity, liquidViscosity, velocity) {
    return (ballRadius/1000)*liquidDensity*velocity/(liquidViscosity/1000);
}

function acceleration(ballWeight, buoyantForce, dragForce, ballMass) {
    return (ballWeight - buoyantForce - dragForce)/ballMass;
}

function velocityUpdate(acceleration, velocity, ballMass, ballWeight, buoyantForce, c, ballRadius, liquidDensity, liquidViscosity) {
    var T = ballWeight - buoyantForce;

    var k1 = acceleration *deltaTime;
    var v = velocity + (k1/2);
    acceleration = (T-(c*dragCoef(v, ballRadius, liquidDensity, liquidViscosity)*Math.pow((v), 2)))/ballMass;

    var k2 = acceleration *deltaTime;
    v = velocity + (k2/2);
    acceleration = (T-(c*dragCoef(v, ballRadius, liquidDensity, liquidViscosity)*Math.pow((v), 2)))/ballMass;

    var k3 = acceleration *deltaTime;
    v = velocity + k3;
    acceleration = (T-(c*dragCoef(v, ballRadius, liquidDensity, liquidViscosity)*Math.pow((v), 2)))/ballMass;

    var k4 = acceleration *deltaTime;
    return (k1+2*k2+2*k3+k4)/6;
}

function viscosity(ballRadius, ballDensity, liquidDensity, liquidViscosity){
    var ballVolume = this.ballVolume(ballRadius);
    var ballMass = this.ballMass(ballVolume,ballDensity);
    var ballWeight = ballMass * 9.8;
    var buoyantForce = this.buoyantForce(liquidDensity, ballVolume);
    var c = this.c(ballRadius, liquidDensity);
    var y = 1;
    var i=0;
    velocity[0] = 0;
    time[0] = 0;
    var dc,df,a,update;
//    label:
    do{
        i++;
        for (var j = 0 ; j < 10 ; j++) {

            dc = dragCoef(velocity[i - 1], ballRadius, liquidDensity, liquidViscosity);
            df = dragForce(dc, c, velocity[i - 1]);
            //console.log("df: " + df);

            a = acceleration(ballWeight, buoyantForce, df, ballMass);
            if (a < 0.000000001){
                a = 0;
            }

            // console.log("ballWeight: " + ballWeight);
            // console.log("buoyantForce: " + buoyantForce);
            //console.log("a: " + a + ", df: " + df);
            update = velocityUpdate(a, velocity[i - 1], ballMass, ballWeight, buoyantForce, c, ballRadius, liquidDensity, liquidViscosity);
            //console.log("update: " + update);


        }
        velocity[i] = velocity[i - 1] + update;
        time[i] = time[i - 1] + deltaTime;
        y = y - (velocity[i] * deltaTime);
       // console.log(i + " velocity: " + velocity[i] + " , time: " + time[i] + " ,y: " + y + " ,a: " + a);


    }while(y > yMax);

    for (var i = 0 ; i < velocity.length ; i++){
        velocity[i] = velocity[i].toFixed(3);
    }

    for (var i = 0 ; i < time.length ; i++){
        time[i] = time[i].toFixed(3);
    }

}

var ballRadius = 38.65;
var ballDensity = 5444;
var liquidDensity = 1559;
var liquidViscosity = 9000;

viscosity(ballRadius, ballDensity, liquidDensity, liquidViscosity);



$('#btn_proses').click(function(){
    var kerapatan_benda = $('input[name=kerapatan_benda]').val();
    var diameter_benda = $('input[name=diameter_benda]').val();
    var jari_benda = diameter_benda/2;
    var kerapatan_cairan = $('input[name=kerapatan_cairan]').val();
    var viskositas = $('input[name=viskositas]').val();

    var kerapatan_benda2 = $('input[name=kerapatan_benda2]').val();
    var diameter_benda2 = $('input[name=diameter_benda2]').val();
    var jari_benda2 = diameter_benda2/2;
    var kerapatan_cairan2 = $('input[name=kerapatan_cairan2]').val();
    var viskositas2 = $('input[name=viskositas2]').val();

    viscosity(jari_benda, kerapatan_benda, kerapatan_cairan, viskositas);
    var time1 = time;
    var lastTime1 = time[time.length-1] * 1000;
    var velocity1 = velocity;
    var lastVelocity1 = velocity[velocity.length-1];
    var massa1 = ballMass(ballVolume(jari_benda), kerapatan_benda).toFixed(3);

    // reset data time and velocity
    time = [];
    velocity = [];

    viscosity(jari_benda2, kerapatan_benda2, kerapatan_cairan2, viskositas2);
    var time2 = time;
    var lastTime2 = time[time.length-1] * 1000;
    var velocity2 = velocity;
    var lastVelocity2 = velocity[velocity.length-1];
    var massa2 = ballMass(ballVolume(jari_benda2), kerapatan_benda2).toFixed(3);

    if(time1.length > time2.length) {
        time = time1;
    } else {
        time = time2;
    }

    reloadChart(velocity1, velocity2, time);

    // Animasi bola turun
    var jarak_turun1 = 295-diameter_benda;
    var jarak_turun2 = 295-diameter_benda2;
    $('#benda_jatuh').animate({'top': jarak_turun1}, lastTime1);
    $('#benda_jatuh2').animate({'top': jarak_turun2}, lastTime2);
    $('#kecepatan_benda1').val(lastVelocity1);
    $('#massa_benda1').val(massa1);
    $('#kecepatan_benda2').val(lastVelocity2);
    $('#massa_benda2').val(massa2);

});