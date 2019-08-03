var Stopper = 0;
var Treffer = 0;
var Daneben = 0;

var Hit1 = 0;
var Hit2 = 0;

function Reset() {
    alert("Your final score was" + Treffer + " Hits" + " & " + Daneben + " Misses");
    Stopper = 0
}

function Neustart() {
    document.getElementById("Scoreboard").innerHTML ="0 Hits" + "<br />" + "0 Misses";
    Stopper = 0;
    Treffer = 0;
    Daneben = 0;
}

function Gamestart() {

    document.getElementById("Interaktionsfeld").setAttribute( "onClick", "Schuss1(event)" );

    var x1 = document.getElementById("Gegner1");
    x1.style.visibility = "visible";

    Treffer = 0;

    Stopper = 1;

    var elem = document.getElementById("Gegner1");   
    var pos = 0;
    var posT = 360;
    var posD = 0;

    var elem2 = document.getElementById("Gegner2");   
    var pos2 = 0;
    var posT2 = 360;
    var posD2 = 0;

    var LOL = setInterval(frameAll, 3);

    function Scorekeeper() {
        document.getElementById("Scoreboard").innerHTML = Treffer + " Hits" + "<br />" + Daneben + " Misses";
    }

    function frameAll() {
        Scorekeeper();
        if (Stopper == 0) {
            clearInterval(LOL);
            Neustart();
        }
        frameL();
        if(Treffer >= 5) {
        frameR();
        var x2 = document.getElementById("Gegner2");
        x2.style.visibility = "visible";
        }
    }

    var Timer1 = 0;

    function frameL() {

        if(Timer1 > 0) {
            Timer1 = Timer1 - 1;
        }

        if(Hit1 == 1) {
            Hit1 = 0;
            pos = 0;
            posT = 360;
            posD = Math.floor(Math.random() * 305); 
        }

        if(Treffer >= 10 && Timer1 == 0) {
            var ZufallLeicht1 = Math.floor(Math.random() * 750);
            if(ZufallLeicht1 == 100) {
                Timer1 = 200;
                if(posD == 360) {           //bei Bewegung nach unten          
                    posD = posT;
                    posT = 0;
                }else if(posD < 360) {      //bei Bewegung nach oben
                    posT = posD;
                    posD = 360;
                }
            }
        }

        if (posD == 360) {
            pos++; 
            posT--;
            elem.style.bottom = posT + 'px'; 
            elem.style.left = pos + 'px';
            if(posT == 0) {
                posD = 0;
            }

            if(pos == 974) {
                Daneben = Daneben +1;
                pos = 0;
                posT = 360;
                posD = Math.floor(Math.random() * 305); 
                
            }

        } else if(posD < 360){
                if(pos == 974) {
                    Daneben = Daneben +1;
                    pos = 0;
                    posT = 360;
                    posD = Math.floor(Math.random() * 305); 

                }
            posT = 360;
            pos++; 
            posD++;
            elem.style.bottom = posD + 'px'; 
            elem.style.left = pos + 'px'; 
        }
    }

    var Timer2 = 0

    function frameR() {

        if(Timer2 > 0) {
            Timer2 = Timer2 - 1;
        }

        if(Hit2 == 1) {
            Hit2 = 0;
            pos2 = 0;
            posT2 = 360;
            posD2 = Math.floor(Math.random() * 305); 
        }

        if(Treffer >= 15 && Timer2 == 0) {
            var ZufallLeicht2 = Math.floor(Math.random() * 750);
            if(ZufallLeicht2 == 650) {
                Timer2 = 200;
                if(posD2 == 360) {           //bei Bewegung nach unten          
                    posD2 = posT2;
                    posT2 = 0;
                }else if(posD2 < 360) {      //bei Bewegung nach oben
                    posT2 = posD2;
                    posD2 = 360;
                }
            }
        }

        if (posD2 == 360) {
            pos2--; 
            posT2--;
            elem2.style.bottom = posT2 + 'px'; 
            elem2.style.left = pos2 + 'px';
            if(posT2 == 0) {
                posD2 = 0;
            }

            if(pos2 == -974) {
                Daneben = Daneben +1;
                pos2 = 0;
                posT2 = 360;
                posD2 = Math.floor(Math.random() * 305); 
            }

        } else if(posD2 < 360){
                if(pos2 == -974) {
                    Daneben = Daneben +1;
                    pos2 = 0;
                    posT2 = 360;
                    posD2 = Math.floor(Math.random() * 305); 
                }

            posT2 = 360;
            pos2--; 
            posD2++;
            elem2.style.bottom = posD2 + 'px'; 
            elem2.style.left = pos2 + 'px'; 
        }
    }
}

//------------------------------------------------------------------------
var MouseposX;
var MouseposY;

var Flugkontrolle1 = 0;
var Flugkontrolle2 = 0;
var Flugkontrolle3 = 0;

//------------------------------------------------------------------------

var FeuerFrei1 = 0;
var pro1;
var projektil1X;
var projektil1Y;
var DeltaWegX1;
var DeltaWegY1;

var BewegungX1 = 0;
var BewegungY1 = 0;
var LoR1 = 0;


function Schuss1(subEvent) {
    
    Flugkontrolle1 = 1;
    Flugtest();

    /*
        MousePos gibt die Mouseposition her
        projektil gibt die Geschossposition her
        Deltaweg gibt den Abstand von Mouseclick und Geschoss her
    */

    findMouseInObjectCoords();
    findProjektileCoords1();

    FeuerFrei1 = 1;

    var elemPro1 = document.getElementById("Projektil1");   
    var posProX1 = projektil1X;
    var posProY1 = 576 - 45 - projektil1Y; //576 = Spielfeldhöhe!!! 45 = Projektilgröße

    DeltaWegX1 = projektil1X - MouseposX;
    DeltaWegY1 = projektil1Y - MouseposY;

    if(DeltaWegX1 < 0) {
        LoR1 = 1;
    }

    DeltaWegX1 = Math.abs(DeltaWegX1);
    DeltaWegY1 = Math.abs(DeltaWegY1);

    if(DeltaWegX1 > DeltaWegY1) {
        BewegungX1 = 1;
        BewegungY1 = DeltaWegY1 / DeltaWegX1;
    } else if(DeltaWegX1 < DeltaWegY1){
        BewegungY1 = 1;
        BewegungX1 = DeltaWegX1 / DeltaWegY1;
    }

    var alpha1 = Math.atan(DeltaWegX1 / DeltaWegY1) * 180 / Math.PI;

    if(LoR1 == 0) {
        alpha1 = alpha1 * (-1);
    }

    elemPro1.style.transform='rotate('+alpha1+'deg)';

    var MyInterval1 = setInterval(frameAllProjektiles, 3);

    function frameAllProjektiles() {

        if(FeuerFrei1 == 1) {
            frameProjektile1();
            Flugtest();
        }
    }

    function frameProjektile1() {

        if(LoR1 == 1) {
            posProX1 = posProX1 + BewegungX1;
            posProY1 = posProY1 + BewegungY1;
        } else {
            posProX1 = posProX1 - BewegungX1; 
            posProY1 = posProY1 + BewegungY1;
        }

        elemPro1.style.bottom = posProY1 + 'px'; 
        elemPro1.style.left = posProX1 + 'px';

        var Gegner1PosX = document.getElementById("Gegner1").offsetLeft;
        var Gegner1PosY = document.getElementById("Gegner1").offsetTop;
        Gegner1PosX = Gegner1PosX + 25;
        Gegner1PosY = Gegner1PosY + 25;

        var Gegner2PosX = document.getElementById("Gegner2").offsetLeft;
        var Gegner2PosY = document.getElementById("Gegner2").offsetTop;
        Gegner2PosX = Gegner2PosX + 25;
        Gegner2PosY = Gegner2PosY + 25;

        findProjektileCoords1();

        projektil1X = projektil1X + 20;
        projektil1Y = projektil1Y + 22,5;

        if(Math.abs(Gegner1PosX - projektil1X) <= 25 && Math.abs(Gegner1PosY - projektil1Y) <= 25 ) {
            document.getElementById("Ghost1").style.visibility = "visible";
            document.getElementById("Ghost1").style.top = Gegner1PosY - 90 + 'px';
            document.getElementById("Ghost1").style.left = Gegner1PosX - 70 + 'px';
            setTimeout(Ghost1Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit1 = 1;
            FeuerFrei1 = 0;
            Flugkontrolle1 = 0;
            clearInterval(MyInterval1);
            ResetProjektile1();
        } else if(Math.abs(Gegner2PosX - projektil1X) <= 25 && Math.abs(Gegner2PosY - projektil1Y) <= 25 && Treffer >= 5) {
            document.getElementById("Ghost2").style.visibility = "visible";
            document.getElementById("Ghost2").style.top = Gegner2PosY - 90 + 'px';
            document.getElementById("Ghost2").style.left = Gegner2PosX - 70 + 'px';
            setTimeout(Ghost2Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit2 = 1;
            FeuerFrei1 = 0;
            Flugkontrolle1 = 0;
            clearInterval(MyInterval1);
            ResetProjektile1();
        }

        if(posProY1 > 531 || posProX1 < 0 || posProX1 > 984) {
            Flugkontrolle1 = 0;
            clearInterval(MyInterval1);
            ResetProjektile1();
        }
    }
}

var FeuerFrei2 = 0;
var pro2;
var projektil2X;
var projektil2Y;
var DeltaWegX2;
var DeltaWegY2;

var BewegungX2 = 0;
var BewegungY2 = 0;
var LoR2 = 0;


function Schuss2(subEvent) {
    
    Flugkontrolle2 = 1;
    Flugtest();

    findMouseInObjectCoords();
    findProjektileCoords2();

    FeuerFrei2 = 1;

    var elemPro2 = document.getElementById("Projektil2");   
    var posProX2 = projektil2X;
    var posProY2 = 576 - 45 - projektil2Y; //576 = Spielfeldhöhe!!! 45 = Projektilgröße

    DeltaWegX2 = projektil2X - MouseposX;
    DeltaWegY2 = projektil2Y - MouseposY;

    if(DeltaWegX2 < 0) {
        LoR2 = 1;
    }

    DeltaWegX2 = Math.abs(DeltaWegX2);
    DeltaWegY2 = Math.abs(DeltaWegY2);

    if(DeltaWegX2 > DeltaWegY2) {
        BewegungX2 = 1;
        BewegungY2 = DeltaWegY2 / DeltaWegX2;
    } else if(DeltaWegX2 < DeltaWegY2){
        BewegungY2 = 1;
        BewegungX2 = DeltaWegX2 / DeltaWegY2;
    }

    var alpha2 = Math.atan(DeltaWegX2 / DeltaWegY2) * 180 / Math.PI;

    if(LoR2 == 0) {
        alpha2 = alpha2 * (-1);
    }

    elemPro2.style.transform='rotate('+alpha2+'deg)';

    var MyInterval2 = setInterval(frameAllProjektiles, 3);

    function frameAllProjektiles() {

        if(FeuerFrei2 == 1) {
            frameProjektile2();
            Flugtest();
        }
    }

    function frameProjektile2() {

        if(LoR2 == 1) {
            posProX2 = posProX2 + BewegungX2;
            posProY2 = posProY2 + BewegungY2;
        } else {
            posProX2 = posProX2 - BewegungX2; 
            posProY2 = posProY2 + BewegungY2;
        }

        elemPro2.style.bottom = posProY2 + 'px'; 
        elemPro2.style.left = posProX2 + 'px';

        var Gegner1PosX = document.getElementById("Gegner1").offsetLeft;
        var Gegner1PosY = document.getElementById("Gegner1").offsetTop;
        Gegner1PosX = Gegner1PosX + 25;
        Gegner1PosY = Gegner1PosY + 25;

        var Gegner2PosX = document.getElementById("Gegner2").offsetLeft;
        var Gegner2PosY = document.getElementById("Gegner2").offsetTop;
        Gegner2PosX = Gegner2PosX + 25;
        Gegner2PosY = Gegner2PosY + 25;

        findProjektileCoords2();

        projektil2X = projektil2X + 20;
        projektil2Y = projektil2Y + 22,5;

        if(Math.abs(Gegner1PosX - projektil2X) <= 25 && Math.abs(Gegner1PosY - projektil2Y) <= 25 ) {
            document.getElementById("Ghost1").style.visibility = "visible";
            document.getElementById("Ghost1").style.top = Gegner1PosY - 90 + 'px';
            document.getElementById("Ghost1").style.left = Gegner1PosX - 70 + 'px';
            setTimeout(Ghost1Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit1 = 1;
            FeuerFrei2 = 0;
            Flugkontrolle2 = 0;
            clearInterval(MyInterval2);
            ResetProjektile2();
        } else if(Math.abs(Gegner2PosX - projektil2X) <= 25 && Math.abs(Gegner2PosY - projektil2Y) <= 25 && Treffer >= 5) {
            document.getElementById("Ghost2").style.visibility = "visible";
            document.getElementById("Ghost2").style.top = Gegner2PosY - 90 + 'px';
            document.getElementById("Ghost2").style.left = Gegner2PosX - 70 + 'px';
            setTimeout(Ghost2Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit2 = 1;
            FeuerFrei2 = 0;
            Flugkontrolle2 = 0;
            clearInterval(MyInterval2);
            ResetProjektile2();
        }

        if(posProY2 > 531 || posProX2 < 0 || posProX2 > 984) {
            Flugkontrolle2 = 0;
            clearInterval(MyInterval2);
            ResetProjektile2();
        }
    }
}


var FeuerFrei3 = 0;
var pro3;
var projektil3X;
var projektil3Y;
var DeltaWegX3;
var DeltaWegY3;

var BewegungX3 = 0;
var BewegungY3 = 0;
var LoR3 = 0;


function Schuss3(subEvent) {
    
    Flugkontrolle3 = 1;
    Flugtest();

    findMouseInObjectCoords();
    findProjektileCoords3();

    FeuerFrei3 = 1;

    var elemPro3 = document.getElementById("Projektil3");   
    var posProX3 = projektil3X;
    var posProY3 = 576 - 45 - projektil3Y; //576 = Spielfeldhöhe!!! 45 = Projektilgröße

    DeltaWegX3 = projektil3X - MouseposX;
    DeltaWegY3 = projektil3Y - MouseposY;

    if(DeltaWegX3 < 0) {
        LoR3 = 1;
    }

    DeltaWegX3 = Math.abs(DeltaWegX3);
    DeltaWegY3 = Math.abs(DeltaWegY3);

    if(DeltaWegX3 > DeltaWegY3) {
        BewegungX3 = 1;
        BewegungY3 = DeltaWegY3 / DeltaWegX3;
    } else if(DeltaWegX3 < DeltaWegY3){
        BewegungY3 = 1;
        BewegungX3 = DeltaWegX3 / DeltaWegY3;
    }

    var alpha3 = Math.atan(DeltaWegX3 / DeltaWegY3) * 180 / Math.PI;

    if(LoR3 == 0) {
        alpha3 = alpha3 * (-1);
    }

    elemPro3.style.transform='rotate('+alpha3+'deg)';

    var MyInterval3 = setInterval(frameAllProjektiles, 3);

    function frameAllProjektiles() {

        if(FeuerFrei3 == 1) {
            frameProjektile3();
            Flugtest();
        }
    }

    function frameProjektile3() {

        if(LoR3 == 1) {
            posProX3 = posProX3 + BewegungX3;
            posProY3 = posProY3 + BewegungY3;
        } else {
            posProX3 = posProX3 - BewegungX3; 
            posProY3 = posProY3 + BewegungY3;
        }

        elemPro3.style.bottom = posProY3 + 'px'; 
        elemPro3.style.left = posProX3 + 'px';

        var Gegner1PosX = document.getElementById("Gegner1").offsetLeft;
        var Gegner1PosY = document.getElementById("Gegner1").offsetTop;
        Gegner1PosX = Gegner1PosX + 25;
        Gegner1PosY = Gegner1PosY + 25;

        var Gegner2PosX = document.getElementById("Gegner2").offsetLeft;
        var Gegner2PosY = document.getElementById("Gegner2").offsetTop;
        Gegner2PosX = Gegner2PosX + 25;
        Gegner2PosY = Gegner2PosY + 25;

        findProjektileCoords3();

        projektil3X = projektil3X + 20;
        projektil3Y = projektil3Y + 22,5;

        if(Math.abs(Gegner1PosX - projektil3X) <= 25 && Math.abs(Gegner1PosY - projektil3Y) <= 25 ) {
            document.getElementById("Ghost1").style.visibility = "visible";
            document.getElementById("Ghost1").style.top = Gegner1PosY - 90 + 'px';
            document.getElementById("Ghost1").style.left = Gegner1PosX - 70 + 'px';
            setTimeout(Ghost1Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit1 = 1;
            FeuerFrei3 = 0;
            Flugkontrolle3 = 0;
            clearInterval(MyInterval3);
            ResetProjektile3();
        } else if(Math.abs(Gegner2PosX - projektil3X) <= 25 && Math.abs(Gegner2PosY - projektil3Y) <= 25 && Treffer >= 5) {
            document.getElementById("Ghost2").style.visibility = "visible";
            document.getElementById("Ghost2").style.top = Gegner2PosY - 90 + 'px';
            document.getElementById("Ghost2").style.left = Gegner2PosX - 70 + 'px';
            setTimeout(Ghost2Aufsteigen, 800);
            Treffer = Treffer + 1;
            Hit2 = 1;
            FeuerFrei3 = 0;
            Flugkontrolle3 = 0;
            clearInterval(MyInterval3);
            ResetProjektile3();
        }

        if(posProY3 > 531 || posProX3 < 0 || posProX3 > 984) {
            Flugkontrolle3 = 0;
            clearInterval(MyInterval3);
            ResetProjektile3();
        }
    }
}

//-------------------------------------------------------

function ResetProjektile1() {
    pro1.style.visibility = "hidden";
    pro1.style.bottom = "45px"; 
    pro1.style.left = "462px";
    pro1 = 0;
    BewegungX1 = 0;
    BewegungY1 = 0;
    LoR1 = 0;

    FeuerFrei1 = 0;
}

function ResetProjektile2() {
    pro2.style.visibility = "hidden";
    pro2.style.bottom = "45px"; 
    pro2.style.left = "462px";
    pro2 = 0;
    BewegungX2 = 0;
    BewegungY2 = 0;
    LoR2 = 0;

    FeuerFrei2 = 0;
}

function ResetProjektile3() {
    pro3.style.visibility = "hidden";
    pro3.style.bottom = "45px"; 
    pro3.style.left = "462px";
    pro3 = 0;
    BewegungX3 = 0;
    BewegungY3 = 0;
    LoR3 = 0;

    FeuerFrei3 = 0;
}

function findProjektileCoords1() {
    projektil1X = 0;
    projektil1Y = 0;
    pro1 = document.getElementById("Projektil1");
    pro1.style.visibility = "visible";       //ändert die Sichtbarkeit des Geschoßes
    projektil1X = pro1.offsetLeft;
    projektil1Y = pro1.offsetTop;
}

function findProjektileCoords2() {
    projektil2X = 0;
    projektil2Y = 0;
    pro2 = document.getElementById("Projektil2");
    pro2.style.visibility = "visible";       //ändert die Sichtbarkeit des Geschoßes
    projektil2X = pro2.offsetLeft;
    projektil2Y = pro2.offsetTop;
}

function findProjektileCoords3() {
    projektil3X = 0;
    projektil3Y = 0;
    pro3 = document.getElementById("Projektil3");
    pro3.style.visibility = "visible";       //ändert die Sichtbarkeit des Geschoßes
    projektil3X = pro3.offsetLeft;
    projektil3Y = pro3.offsetTop;
}

function findMouseInObjectCoords(mouseEvent)
{
        var obj = document.getElementById("Interaktionsfeld");
        var obj_left = 0;
        var obj_top = 0;

        while (obj.offsetParent)
        {
            obj_left += obj.offsetLeft;
            obj_top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        if (mouseEvent)
        {
            //FireFox
            MouseposX = mouseEvent.pageX;
            MouseposY = mouseEvent.pageY;
        }
        else
        {
            //IE
            MouseposX = window.event.x + document.body.scrollLeft - 2;
            MouseposY = window.event.y + document.body.scrollTop - 2;
        }
        MouseposX -= obj_left;
        MouseposY -= obj_top;
}

function Flugtest() {
    if(Flugkontrolle1 == 0) {
        document.getElementById("Interaktionsfeld").setAttribute( "onClick", "Schuss1(event)" );
        return;
    } else if(Flugkontrolle2 == 0) {
        document.getElementById("Interaktionsfeld").setAttribute( "onClick", "Schuss2(event)" );
        return;
    } else if(Flugkontrolle3 == 0) {
        document.getElementById("Interaktionsfeld").setAttribute( "onClick", "Schuss3(event)" );
        return;
    } else if(Flugkontrolle1 == 1 && Flugkontrolle2 ==1 && Flugkontrolle3 == 1) {
        document.getElementById("Interaktionsfeld").removeAttribute("onClick");
        return;
    }
}

function Ghost1Aufsteigen() {
    document.getElementById("Ghost1").style.visibility = "hidden";
}

function Ghost2Aufsteigen() {
    document.getElementById("Ghost2").style.visibility = "hidden";
}














/* Funktioniert bis das Axie respawned:

function frameL() {
        if (pos >= 430 && pos < 860) {

            pos++; 
            posT--;
            elem.style.bottom = posT + 'px'; 
            elem.style.left = pos + 'px';

        } else if(pos < 430 || pos >= 860){
            if(pos == 860) {
                posD = 0;
            }
            if(pos == 1230) {
                pos = 0;
                posT = 430;
                posD = (Math.random() * 400); 
                elem.style.left = 0 + 'px';
                elem.style.bottom = posD + 'px';
            }
            pos++; 
            posD++;
            elem.style.bottom = posD + 'px'; 
            elem.style.left = pos + 'px'; 
            
        }
    }
}

*/
/*
Original:

function StartRechts() {
    var elem = document.getElementById("Gegner1");   
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == 430) {
        clearInterval(id);
        } else {
        pos++; 
        elem.style.bottom = pos + 'px'; 
        elem.style.left = pos + 'px'; 
        }
    }
}
*/