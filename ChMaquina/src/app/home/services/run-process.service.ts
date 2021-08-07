import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';
import { Variable } from 'src/app/models/variables';

@Injectable({
  providedIn: 'root'
})
export class RunProcessService {

  constructor() { }

  runProgram(fileCh: FileCH, acumulador: string): [FileCH, any[], any[]] {

    let listToShow: any[] = [];
    let listToPrint: any[] = [];

    for (let instruccion = 0; instruccion < fileCh.codeLines.length; instruccion++) {

      if (fileCh.codeLines[instruccion][0].trim().includes('//')) {
        continue;
      }
      if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'cargue') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1].trim() === fileCh.variables[variable].name) {
            acumulador = String(fileCh.variables[variable].value);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'almacene') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            fileCh.variables[variable].value = String(Number(acumulador));
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'reste') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            acumulador = String(Number(Number(acumulador)) - Number(fileCh.variables[variable].value));
          } else if (fileCh.codeLines[instruccion][1] === 'acumulador') {
            acumulador = '0';
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'multiplique') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = String(Number(Number(acumulador)) * Number(fileCh.variables[variable].value));
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'vaya') {

        for (let variable = 0; variable < fileCh.tags.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.tags[variable].name && +fileCh.tags[variable].value < fileCh.codeLines.length) {

            if (+fileCh.tags[variable].value <= instruccion) {
              instruccion = Number(+fileCh.tags[variable].value) - 2;
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'vayasi') {

        if (Number(acumulador) > 0) {

          for (let variable = 0; variable < fileCh.tags.length; variable++) {

            if (fileCh.codeLines[instruccion][1] === fileCh.tags[variable].name && +fileCh.tags[variable].value < fileCh.codeLines.length - 1) {
              instruccion = Number(fileCh.tags[variable].value) - 2;
            }

          }

        } else if (Number(acumulador) < 0) {

          for (let variable = 0; variable < fileCh.tags.length; variable++) {

            if (fileCh.codeLines[instruccion][2] == fileCh.tags[variable].name && +fileCh.tags[variable].value < fileCh.codeLines.length) {
              instruccion = Number(+fileCh.tags[variable].value);// posible -1 or -2
            }

          }
        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

        if (fileCh.codeLines[instruccion][1] == "acumulador") {
          listToShow.push([fileCh._name, `El valor del acumulador es ${acumulador}`]);
        } else {

          for (let variable = 0; variable < fileCh.variables.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
              listToShow.push([fileCh._name, `El valor de ${fileCh.variables[variable].name} es ${fileCh.variables[variable].value}`]);
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'lea') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            let newValue = prompt(`Ingrese el valor de la variable ${fileCh.variables[variable].name}`);
            fileCh.variables[variable].value = String(newValue);
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'sume') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = String(Number(acumulador) + Number(fileCh.variables[variable].value));
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'divida') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = String(Number(acumulador) / Number(fileCh.variables[variable].value));
          }

        }



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'potencia') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = String(Number(acumulador) ** Number(fileCh.variables[variable].value));
          }

        }



      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'modulo') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {

            let modulo: number = Number(acumulador) % Number(fileCh.variables[variable].value);
            alert(`El modulo de ${acumulador} % ${fileCh.variables[variable].value} es igual a: ${modulo}`);

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'concatene') {

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
            acumulador = `${acumulador} ${fileCh.variables[variable].value}`;
          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'elimine') {

        acumulador = acumulador.replace(fileCh.codeLines[instruccion][1], "");

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'extraiga') {

        let extraer = [];
        for (let variable = 0; variable < Number(fileCh.codeLines[instruccion][1]); variable++) {
          extraer.push(acumulador[variable]);
        }
        acumulador = extraer.join(" ");

      } else if (fileCh.codeLines[instruccion][0].trim().toUpperCase() == 'Y') {

        let primerOperando: number = 0;
        let segundoOperando: number = 0;

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            primerOperando = Number(fileCh.variables[variable].value);
          }
          if (fileCh.codeLines[instruccion][2] === fileCh.variables[variable].name) {
            segundoOperando = Number(fileCh.variables[variable].value);
          }
          if (fileCh.codeLines[instruccion][3] === fileCh.variables[variable].name) {

            if (primerOperando === 1 && segundoOperando === 1) {
              fileCh.variables[variable].value = '1';
            } else {
              fileCh.variables[variable].value = '0';
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'O') {

        let primerOperando: number = 0;
        let segundoOperando: number = 0;

        for (let variable = 0; variable < fileCh.variables.length; variable++) {

          if (fileCh.codeLines[instruccion][1] === fileCh.variables[variable].name) {
            primerOperando = Number(fileCh.variables[variable].value);
          }
          if (fileCh.codeLines[instruccion][2] === fileCh.variables[variable].name) {
            segundoOperando = Number(fileCh.variables[variable].value);
          }
          if (fileCh.codeLines[instruccion][3] === fileCh.variables[variable].name) {

            if (primerOperando === 0 || segundoOperando === 0) {
              fileCh.variables[variable].value = '0';
            } else {
              fileCh.variables[variable].value = '0';
            }

          }

        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'NO') {

        let guardarResultado: number = 0;
        for (let variable of fileCh.variables) {
          if (fileCh.codeLines[instruccion][1].trim() === variable.name) {
            if (variable.value === '0') {
              guardarResultado = 1;
            } else {
              guardarResultado = 0;
            }
          }
        }
        for (let variable of fileCh.variables) {
          if (fileCh.codeLines[instruccion][2].trim() === variable.name) {
            variable.value = String(guardarResultado);
          }
        }

      } else if (fileCh.codeLines[instruccion][0].trim().toLowerCase() == 'imprima') {

        if (fileCh.codeLines[instruccion][1] == "acumulador") {
          listToPrint.push([fileCh._name, `El valor del acumulador es ${acumulador}`]);
        } else {

          for (let variable = 0; variable < fileCh.variables.length; variable++) {

            if (fileCh.codeLines[instruccion][1] == fileCh.variables[variable].name) {
              listToPrint.push([fileCh._name, `El valor de ${fileCh.variables[variable].name} es ${fileCh.variables[variable].value}`]);
            }

          }

        }
      }
    }

    return [fileCh, listToShow, listToPrint];

  }

}
