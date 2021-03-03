const readXlsxFile = require('read-excel-file/node');

module.exports = CargarDepartamentos = (pDep, pCiud) => {
    readXlsxFile('./services/departamentos.xlsx').then( async (rows) => {
        console.log("Comienza la carga de departamentos o ciudades");
        for (let i = 0; i < rows.length; i++) {
            var dep = await pDep.findAll({where:{nom_departamento: rows[i][0]}});
            var cod_dep;
            if(dep.length == 0){
                dep = await pDep.create({nom_departamento:rows[i][0]})
                cod_dep=dep.cod_departamento
            }else{
                cod_dep = dep[0].cod_departamento
            }
            const ciud = await pCiud.findAll({where:{nom_ciudad: rows[i][2]}});
            if(ciud.length == 0){
                await pCiud.create({nom_ciudad:rows[i][2],cod_departamento:cod_dep})
            }
        }
        console.log("Departamentos y ciudades cargadas con éxito");
    }).catch((err) => {
        console.log(err);
    })
}