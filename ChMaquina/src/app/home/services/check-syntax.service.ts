import { Injectable } from '@angular/core';
import { Tag } from 'src/app/models/tag';
import { Variable } from 'src/app/models/variables';

@Injectable({
  providedIn: 'root'
})
export class CheckSyntaxService {

  constructor() { }

  checkSyntax(codeLines: string[]): [Tag[], Variable[], string[], number, number, number] {

    let burstIOCount = 0;
    let burstCPUCount = 0;
    let slice: number = 0;

    // Errores
    let errores: string[] = [];

    // Tags Array
    let tags: Tag[] = [];

    // Variables Array
    let variables: Variable[] = [];

    for (let instruccion = 0; instruccion < codeLines.length; instruccion++) {

      let linea = "";

      for (let index = 0; index < codeLines[instruccion].length; index++) {
        linea += " " + codeLines[instruccion][index];
      }

      if (codeLines[instruccion][0].trim().toLowerCase() == 'nueva') {

        let variable: Variable = {
          id: '',
          name: '',
          value: ''
        };

        if (codeLines[instruccion].length < 3) {
          errores.push("Error de sintaxis, menos de 3 operadores especificados: " + linea);
        }

        switch (codeLines[instruccion][2].toUpperCase()) {

          case "C":
            let cadena = "";
            if (codeLines[instruccion].length > 4) {

              for (let variable = 3; variable < codeLines[instruccion].length; variable++) {
                cadena += (codeLines[instruccion][variable]);
              }

              variable.value = cadena;
            } else if (codeLines[instruccion].length === 3) {
              variable.value = cadena;
            }
            break;

          case "I":
            if (codeLines[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
              break;
            } else if (codeLines[instruccion].length === 4) {
              let num = codeLines[instruccion][3];
              let verificList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
              for (let i = 0; i < codeLines[instruccion].length; i++) {
                if (!(verificList.includes(Number(num)))) {
                  errores.push("Error de sintaxis, el tipo de dato no es un entero: " + linea);
                  break;
                }
              }
            } else {
              variable.value = '0';
            }
            break;

          case "R":
            if (codeLines[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
              break;
            } else if (codeLines[instruccion].length > 3) {
              let num = codeLines[instruccion][3];
              let verificList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
              for (let i = 0; i < codeLines[instruccion].length; i++) {
                if (!((verificList.includes(num)))) {
                  errores.push("Error de sintaxis, el tipo de dato no es un Real/Decimal: " + linea);
                  break;
                }
              }
            } else {
              variable.value = '0';
            }
            break;

          case "L":
            if (codeLines[instruccion].length > 4) {
              errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
              break;
            } else if (codeLines[instruccion].length > 3) {
              if (!(codeLines[instruccion][3] == ("0")) && !(codeLines[instruccion][3] == ("1"))) {
                errores.push("Error de sintaxis, el tipo de dato no es un Boolean: " + linea);
                break;
              } else {
                variable.value = codeLines[instruccion][3];
              }

            } else {
              errores.push("Error de sintaxis, no se especifica valor lógico");
            }
            break;

          default:
            errores.push("Error de sintaxis, no se reconoce el tipo de variable: " + linea);
            break;
        }

        variable.name = codeLines[instruccion][1];
        if (codeLines[instruccion].length == 4) {
          variable.value = codeLines[instruccion][3];
        }

        variables.push(variable);
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'lea') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstIOCount++;
        slice += Math.floor(Math.random() * 9) + 1;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'cargue') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'almacene') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'vaya') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'vayasi') {

        if (codeLines[instruccion].length > 3) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 3) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'etiqueta') {

        let tag: Tag = {
          id: '',
          name: '',
          value: ''
        };

        if (codeLines[instruccion].length > 3) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 3) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }

        let num = codeLines[instruccion][2];
        let verificList = "1234567890";
        for (let i = 0; i < num.length; i++) {
          if (!(verificList.includes(num[i]))) {
            errores.push("Error de sintaxis, el tipo de dato no es un número: " + linea);
          }
        }
        tag.name = codeLines[instruccion][1];
        tag.value = num;
        tags.push(tag);
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'sume') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'reste') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'multiplique') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'divida') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'potencia') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'modulo') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'concatene') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'elimine') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'Y') {

        if (codeLines[instruccion].length > 4) {
          errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 4) {
          errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'O') {

        if (codeLines[instruccion].length > 4) {
          errores.push("Error de sintaxis, más de 4 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 4) {
          errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'NO') {

        if (codeLines[instruccion].length > 3) {
          errores.push("Error de sintaxis, más de 3 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 3) {
          errores.push("Error de sintaxis, menos de 4 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstIOCount++;
        slice += Math.floor(Math.random() * 9) + 1;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'imprima') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 2) {
          errores.push("Error de sintaxis, menos de 2 operadores especificados: " + linea);
        }
        burstIOCount++;
        slice += Math.floor(Math.random() * 9) + 1;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'retorne') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 1) {
          errores.push("Error de sintaxis, menos de 1 operadores especificados: " + linea);
        }
        slice++;

      } else if (codeLines[instruccion][0].trim().toLowerCase() == 'extraiga') {

        if (codeLines[instruccion].length > 2) {
          errores.push("Error de sintaxis, más de 2 operadores especificados: " + linea);
        }
        if (codeLines[instruccion].length < 1) {
          errores.push("Error de sintaxis, menos de 1 operadores especificados: " + linea);
        }
        burstCPUCount++;
        slice++;

      } else if (!codeLines[instruccion][0].trim().includes('//')) {
        errores.push("No se reconoce la intrucción: " + linea);
      }

    }

    return [tags, variables, errores, burstIOCount, burstCPUCount, slice];

  }

}
