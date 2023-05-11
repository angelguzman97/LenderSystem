function calcular(pretamo, porcentaje)
{
    var cantidadTotal, cantidaddia;
    cantidadTotal = ((pretamo*porcentaje)/100)+pretamo;
    return cantidadTotal;
    
}

function calcular1(cantidadTotal, plazo){
    var cantidaddia;
    cantidaddia = cantidadTotal/plazo;
    return cantidaddia;
}
console.log("Por un prestamos de "+ 2500 +" pagaría un total de $"+ calcular(2500, 20) +" y diariamente estaría pagando $"+ calcular1(calcular(2500, 20),30));