import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class RunProcessService {

  constructor() { }

  runProgram(fileCh: FileCH, acumulador: string) {

    for (let instruccion = 0; instruccion < fileCh.codeLines.length; instruccion++) {

      if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'cargue') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1].trim() === fileCh.variables[variable].name) {
            acumulador = String(fileCh.variables[variable].value);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'almacene') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            fileCh.variables[variable].value = String(acumulador);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'reste') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            acumulador = String(Number(acumulador) - Number(fileCh.variables[variable].value));
          } else if (fileCh.codeLines[instruccion][1] === 'acumulador') {
            acumulador = '0';
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'multiplique') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = String(Number(acumulador) * Number(fileCh.variables[variable].value));
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'vaya') {

        for (let variable = 0; variable < fileCh.tags.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.tags[variable].name && +fileCh.tags[variable].value < fileCh.codeLines.length) {

            if (+fileCh.tags[variable].value <= instruccion) {
              instruccion = Number(+fileCh.tags[variable].value); //posible -1 o -2
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'vayasi') {

        if (acumulador > 0) {

          for (let variable = 0; variable < nombreEtiqueta.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == nombreEtiqueta[variable] && +fileCh.tags[variable].value < fileCh.codeLines.length - 1) {
              instruccion = Number(+fileCh.tags[variable].value) - 2;
            }

          }

        } else if (acumulador < 0) {

          for (let variable = 0; variable < nombreEtiqueta.length; variable++) {

            if (fileCh.codeLines[instruccion][2] == nombreEtiqueta[variable] && +fileCh.tags[variable].value < fileCh.codeLines.length) {
              instruccion = Number(+fileCh.tags[variable].value) - 2;
            }

          }
        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

        if (fileCh.codeLines[instruccion][1] == "acumulador") {
          listaMostrar.push(acumulador);
          screenContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][1]} es ${listaMostrar}`;
        } else {

          for (let variable = 0; variable < fileCh.variables.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
              listaMostrar.push(fileCh.variables[variable].value);
              screenContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][1]} es ${listaMostrar.join(" ")}`;
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'lea') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            let nuevoValor = prompt(`Ingrese el valor de la variable ${fileCh.codeLines[instruccion][1]}`);
            fileCh.variables[variable].value = Number(nuevoValor);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'sume') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = acumulador + Number(fileCh.variables[variable].value);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'divida') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = acumulador / Number(fileCh.variables[variable].value);
          }

        }



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'potencia') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name && fileCh.variables[variable].value.isInteger()) {
            acumulador = acumulador ** Number(fileCh.variables[variable].value);
          }

        }



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'modulo') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {

            let modulo = Number(acumulador) % Number(fileCh.variables[variable].value);
            alert(`El modulo de ${acumulador} % ${v.valor} es igual a: ${modulo}`);

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'concatene') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {

            let cadena = acumulador + " " + fileCh.variables[variable].value;
            sectionAcumulador.type = 'text';
            acumulador = cadena;



          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'elimine') {

        let eliminar = fileCh.codeLines[instruccion][1];
        acumulador = acumulador.replaceAll(eliminar, "");



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'extraiga') {

        let extraer = [];
        for (let variable = 0; variable < Number(fileCh.codeLines[instruccion][1]); variable++) {
          extraer.push(acumulador[variable]);
        }
        acumulador = extraer.join("");



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'Y') {

        let primerOperando = 0;
        let segundoOperando = 0;

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            primerOperando = fileCh.variables[variable].value;
          }
          if (fileCh.codeLines[instruccion][2] == fileCh.variables[variable].name) {
            primerOperando = fileCh.variables[variable].value;
          }
          if (fileCh.codeLines[instruccion][3] == fileCh.variables[variable].name) {

            if (primerOperando && segundoOperando == 1) {
              fileCh.variables[variable].value = 1;
            } else if (primerOperando && segundoOperando == 0) {
              fileCh.variables[variable].value = 0;
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'O') {

        let primerOperando = 0;
        let segundoOperando = 0;

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            primerOperando = fileCh.variables[variable].value;
          }
          if (fileCh.codeLines[instruccion][2] == fileCh.variables[variable].name) {
            primerOperando = fileCh.variables[variable].value;
          }
          if (fileCh.codeLines[instruccion][3] == fileCh.variables[variable].name) {

            if (primerOperando || segundoOperando == 1) {
              fileCh.variables[variable].value = 1;
            } else if (primerOperando || segundoOperando == 0) {
              fileCh.variables[variable].value = 0;
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'NO') {

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

        if (fileCh.codeLines[instruccion][1] == "acumulador") {
          listaMostrar.push(acumulador);
          screenContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][2]} es igual a: ${listaMostrar}`;
        } else {

          for (let variable = 0; variable < fileCh.variables.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
              listaMostrar.push(fileCh.variables[variable].value)
              screenContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][2]} es igual a: ${listaMostrar.join(" ")}`;
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'imprima') {

        if (fileCh.codeLines[instruccion][1] == "acumulador") {
          listaImprimir.push(acumulador);
          printContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][1]} es igual a: ${listaImprimir}`;
        } else {

          for (let variable = 0; variable < fileCh.variables.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
              listaImprimir.push(fileCh.variables[variable].value)
              printContent.innerHTML = `El valor de ${fileCh.codeLines[instruccion][1]} es igual a: ${listaImprimir.join(" ")}`;
            }

          }

        }
      }
      // console.log(instruccion + 1);
      // console.log("acumulador: " + acumulador);
      // console.log("listaVariables: " + listaValoresVariablesGeneral[contList]);
      // console.log(fileCh.codeLines[instruccion]);
      // console.log("etiquetas: " + contadorEtiquetas);
      // console.log("___________")
      console.log(longitudesProgramas);
      console.log(contInst);
      mostrarMemoria(memoriaContenido, listaValoresVariablesGeneral[contList]);
      if ((contInst == Number(longitudesProgramas[contLong]) - 1) && (listaValoresVariablesGeneral[contList + 1] != undefined)) {
        contList += 1;
        contLong += 1;
        contInst = 0;
      }
      contInst += 1;
    }
  }

}
