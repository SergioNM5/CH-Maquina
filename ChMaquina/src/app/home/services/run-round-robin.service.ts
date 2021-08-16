import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class RunRoundRobinService {

  filesStateList: any[] = [];
  quantumCounter: number = 0;

  constructor() { }

  runRoundRobin(filesArray: FileCH[], quantum: number): [FileCH[]] {

    let acumulador: string;

    let listToShow: any[] = [];
    let listToPrint: any[] = [];

    for (let file = 0; file < filesArray.length; file++) {
      
      if (this.filesStateList.length < filesArray.length) {
        acumulador = '0';
      } else {
        acumulador = this.filesStateList[file][1];
      }

      for (let instruccion = filesArray[file].initialRr; instruccion < filesArray[file].endingRr; instruccion++) {
        console.log(filesArray[file].codeLines[instruccion]);

        if (filesArray[file].codeLines[instruccion][0].trim().includes('//')) {
          continue;
        }
        if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'cargue') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1].trim() === filesArray[file].variables[variable].name) {
              acumulador = String(filesArray[file].variables[variable].value);
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'almacene') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] === filesArray[file].variables[variable].name) {
              filesArray[file].variables[variable].value = String(Number(acumulador));
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'reste') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] === filesArray[file].variables[variable].name) {
              acumulador = String(Number(Number(acumulador)) - Number(filesArray[file].variables[variable].value));
            } else if (filesArray[file].codeLines[instruccion][1] === 'acumulador') {
              acumulador = '0';
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'multiplique') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              acumulador = String(Number(acumulador) * Number(filesArray[file].variables[variable].value));              
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'vaya') {

          for (let variable = 0; variable < filesArray[file].tags.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] === filesArray[file].tags[variable].name && +filesArray[file].tags[variable].value < filesArray[file].codeLines.length) {

              if (+filesArray[file].tags[variable].value <= instruccion) {
                instruccion = Number(+filesArray[file].tags[variable].value) - 2;
              }

            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'vayasi') {

          if (Number(acumulador) > 0) {

            for (let variable = 0; variable < filesArray[file].tags.length; variable++) {

              if (filesArray[file].codeLines[instruccion][1] === filesArray[file].tags[variable].name && +filesArray[file].tags[variable].value < filesArray[file].codeLines.length - 1) {
                instruccion = Number(filesArray[file].tags[variable].value) - 2;
              }

            }

          } else if (Number(acumulador) < 0) {

            for (let variable = 0; variable < filesArray[file].tags.length; variable++) {

              if (filesArray[file].codeLines[instruccion][2] == filesArray[file].tags[variable].name && +filesArray[file].tags[variable].value < filesArray[file].codeLines.length) {
                instruccion = Number(+filesArray[file].tags[variable].value);// posible -1 or -2
              }

            }
          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

          if (filesArray[file].codeLines[instruccion][1] == "acumulador") {
            listToShow.push([filesArray[file]._name, `El valor del acumulador es ${acumulador}`]);
          } else {

            for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

              if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
                listToShow.push([filesArray[file]._name, `El valor de ${filesArray[file].variables[variable].name} es ${filesArray[file].variables[variable].value}`]);
              }

            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'lea') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              let newValue = prompt(`Ingrese el valor de la variable ${filesArray[file].variables[variable].name}`);
              filesArray[file].variables[variable].value = String(newValue);
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'sume') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              acumulador = String(Number(acumulador) + Number(filesArray[file].variables[variable].value));
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'divida') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              acumulador = String(Number(acumulador) / Number(filesArray[file].variables[variable].value));
            }

          }



        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'potencia') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              acumulador = String(Number(acumulador) ** Number(filesArray[file].variables[variable].value));
            }

          }



        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'modulo') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {

              let modulo: number = Number(acumulador) % Number(filesArray[file].variables[variable].value);
              alert(`El modulo de ${acumulador} % ${filesArray[file].variables[variable].value} es igual a: ${modulo}`);

            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'concatene') {

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
              acumulador = `${acumulador} ${filesArray[file].variables[variable].value}`;
            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'elimine') {

          acumulador = acumulador.replace(filesArray[file].codeLines[instruccion][1], "");

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'extraiga') {

          let extraer = [];
          for (let variable = 0; variable < Number(filesArray[file].codeLines[instruccion][1]); variable++) {
            extraer.push(acumulador[variable]);
          }
          acumulador = extraer.join(" ");

        } else if (filesArray[file].codeLines[instruccion][0].trim().toUpperCase() == 'Y') {

          let primerOperando: number = 0;
          let segundoOperando: number = 0;

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] === filesArray[file].variables[variable].name) {
              primerOperando = Number(filesArray[file].variables[variable].value);
            }
            if (filesArray[file].codeLines[instruccion][2] === filesArray[file].variables[variable].name) {
              segundoOperando = Number(filesArray[file].variables[variable].value);
            }
            if (filesArray[file].codeLines[instruccion][3] === filesArray[file].variables[variable].name) {

              if (primerOperando === 1 && segundoOperando === 1) {
                filesArray[file].variables[variable].value = '1';
              } else {
                filesArray[file].variables[variable].value = '0';
              }

            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'O') {

          let primerOperando: number = 0;
          let segundoOperando: number = 0;

          for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

            if (filesArray[file].codeLines[instruccion][1] === filesArray[file].variables[variable].name) {
              primerOperando = Number(filesArray[file].variables[variable].value);
            }
            if (filesArray[file].codeLines[instruccion][2] === filesArray[file].variables[variable].name) {
              segundoOperando = Number(filesArray[file].variables[variable].value);
            }
            if (filesArray[file].codeLines[instruccion][3] === filesArray[file].variables[variable].name) {

              if (primerOperando === 0 || segundoOperando === 0) {
                filesArray[file].variables[variable].value = '0';
              } else {
                filesArray[file].variables[variable].value = '0';
              }

            }

          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'NO') {

          let guardarResultado: number = 0;
          for (let variable of filesArray[file].variables) {
            if (filesArray[file].codeLines[instruccion][1].trim() === variable.name) {
              if (variable.value === '0') {
                guardarResultado = 1;
              } else {
                guardarResultado = 0;
              }
            }
          }
          for (let variable of filesArray[file].variables) {
            if (filesArray[file].codeLines[instruccion][2].trim() === variable.name) {
              variable.value = String(guardarResultado);
            }
          }

        } else if (filesArray[file].codeLines[instruccion][0].trim().toLowerCase() == 'imprima') {

          if (filesArray[file].codeLines[instruccion][1] == "acumulador") {
            listToPrint.push([filesArray[file]._name, `El valor del acumulador es ${acumulador}`]);
          } else {

            for (let variable = 0; variable < filesArray[file].variables.length; variable++) {

              if (filesArray[file].codeLines[instruccion][1] == filesArray[file].variables[variable].name) {
                listToPrint.push([filesArray[file]._name, `El valor de ${filesArray[file].variables[variable].name} es ${filesArray[file].variables[variable].value}`]);
              }

            }

          }
        }

        if (listToShow.length > 0) {
          filesArray[file].listToShow = listToShow;
        }

        if (listToPrint.length > 0) {
          filesArray[file].listToPrint = listToPrint;
        }

        console.log(acumulador);
        

      }

      filesArray[file].initialRr += quantum;
      filesArray[file].endingRr += quantum;
      
      if (filesArray[file].endingRr > filesArray[file].codeLines.length) {
        
        filesArray[file].endingRr = filesArray[file].codeLines.length;
        
        if (this.quantumCounter !== quantum) {
          this.quantumCounter = quantum - 1;
        }

      }
     
      if (this.filesStateList.length < filesArray.length) {
        this.filesStateList.push([filesArray[file], acumulador]);
      }

      this.filesStateList[file] = [filesArray[file], acumulador];
      
      if (file === filesArray.length - 1 && this.quantumCounter < quantum) {
        file = -1;
        this.quantumCounter += 1;
      } 
            
    }
    return [filesArray];

  }

}
