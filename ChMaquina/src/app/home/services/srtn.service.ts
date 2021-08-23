import { Injectable } from '@angular/core';
import { FileCH } from 'src/app/models/file-ch';

@Injectable({
  providedIn: 'root'
})
export class SrtnService {

  filesStateList: any[] = [];

  constructor() { }

  runSrtn(filesArray: FileCH[]): [FileCH[]] {

    let acumulador: string = '0';

    let listToShow: any[] = [];
    let listToPrint: any[] = [];

    for (let file = 0; file < filesArray.length; file++) {

      if (this.filesStateList[file] === undefined) {
        this.filesStateList.push(filesArray[file]);
      }

      if (this.filesStateList.length === filesArray.length) {
        this.filesStateList = this.filesStateList.sort(
          (a, b) => Number(a.burstCPU) - Number(b.burstCPU)
        );
      }

      if (filesArray.length > 1 && file < filesArray.length - 1) {
        this.filesStateList = this.filesStateList.sort(
          (a, b) => Number(a.burstCPU) - Number(b.burstCPU)
        );
        file = 0;
        this.filesStateList[file].endingRr = filesArray[file + 1].arrivalTime - 1;
      } else {
        console.log(this.filesStateList);

        this.filesStateList[0].endingRr = this.filesStateList[0].codeLines.length - 1;
        this.filesStateList[0].burstCPU = 1000;
        file = 0;
      }

      acumulador = this.filesStateList[0].acumulator;
      console.log(acumulador);

      for (let instruccion = this.filesStateList[file].initialRr; instruccion < this.filesStateList[file].endingRr; instruccion++) {
        console.log(this.filesStateList[file]._name, this.filesStateList[file].codeLines[instruccion]);

        if (this.filesStateList[file].codeLines[instruccion][0].trim().includes('//')) {
          continue;
        }
        if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'cargue') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1].trim() === this.filesStateList[file].variables[variable].name) {
              acumulador = String(this.filesStateList[file].variables[variable].value);
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'almacene') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].variables[variable].name) {
              this.filesStateList[file].variables[variable].value = String(Number(acumulador));
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'reste') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].variables[variable].name) {
              acumulador = String(Number(Number(acumulador)) - Number(this.filesStateList[file].variables[variable].value));
            } else if (this.filesStateList[file].codeLines[instruccion][1] === 'acumulador') {
              acumulador = '0';
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'multiplique') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              acumulador = String(Number(acumulador) * Number(this.filesStateList[file].variables[variable].value));
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'vaya') {

          for (let variable = 0; variable < this.filesStateList[file].tags.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].tags[variable].name && +this.filesStateList[file].tags[variable].value < this.filesStateList[file].codeLines.length) {

              if (+this.filesStateList[file].tags[variable].value <= instruccion) {
                instruccion = Number(+this.filesStateList[file].tags[variable].value) - 2;
              }

            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'vayasi') {

          if (Number(acumulador) > 0) {

            for (let variable = 0; variable < this.filesStateList[file].tags.length; variable++) {

              if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].tags[variable].name && +this.filesStateList[file].tags[variable].value < this.filesStateList[file].codeLines.length - 1) {
                instruccion = Number(this.filesStateList[file].tags[variable].value) - 2;
              }

            }

          } else if (Number(acumulador) < 0) {

            for (let variable = 0; variable < this.filesStateList[file].tags.length; variable++) {

              if (this.filesStateList[file].codeLines[instruccion][2] == this.filesStateList[file].tags[variable].name && +this.filesStateList[file].tags[variable].value < this.filesStateList[file].codeLines.length) {
                instruccion = Number(+this.filesStateList[file].tags[variable].value);// posible -1 or -2
              }

            }
          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'muestre') {

          if (this.filesStateList[file].codeLines[instruccion][1] == "acumulador") {
            listToShow.push([this.filesStateList[file]._name, `El valor del acumulador es ${acumulador}`]);
          } else {

            for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

              if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
                listToShow.push([this.filesStateList[file]._name, `El valor de ${this.filesStateList[file].variables[variable].name} es ${this.filesStateList[file].variables[variable].value}`]);
              }

            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'lea') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              let newValue = prompt(`Ingrese el valor de la variable ${this.filesStateList[file].variables[variable].name}`);
              this.filesStateList[file].variables[variable].value = String(newValue);
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'sume') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              acumulador = String(Number(acumulador) + Number(this.filesStateList[file].variables[variable].value));
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'divida') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              acumulador = String(Number(acumulador) / Number(this.filesStateList[file].variables[variable].value));
            }

          }



        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'potencia') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              acumulador = String(Number(acumulador) ** Number(this.filesStateList[file].variables[variable].value));
            }

          }



        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'modulo') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {

              let modulo: number = Number(acumulador) % Number(this.filesStateList[file].variables[variable].value);
              alert(`El modulo de ${acumulador} % ${this.filesStateList[file].variables[variable].value} es igual a: ${modulo}`);

            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'concatene') {

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
              acumulador = `${acumulador} ${this.filesStateList[file].variables[variable].value}`;
            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'elimine') {

          acumulador = acumulador.replace(this.filesStateList[file].codeLines[instruccion][1], "");

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'extraiga') {

          let extraer = [];
          for (let variable = 0; variable < Number(this.filesStateList[file].codeLines[instruccion][1]); variable++) {
            extraer.push(acumulador[variable]);
          }
          acumulador = extraer.join(" ");

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toUpperCase() == 'Y') {

          let primerOperando: number = 0;
          let segundoOperando: number = 0;

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].variables[variable].name) {
              primerOperando = Number(this.filesStateList[file].variables[variable].value);
            }
            if (this.filesStateList[file].codeLines[instruccion][2] === this.filesStateList[file].variables[variable].name) {
              segundoOperando = Number(this.filesStateList[file].variables[variable].value);
            }
            if (this.filesStateList[file].codeLines[instruccion][3] === this.filesStateList[file].variables[variable].name) {

              if (primerOperando === 1 && segundoOperando === 1) {
                this.filesStateList[file].variables[variable].value = '1';
              } else {
                this.filesStateList[file].variables[variable].value = '0';
              }

            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'O') {

          let primerOperando: number = 0;
          let segundoOperando: number = 0;

          for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

            if (this.filesStateList[file].codeLines[instruccion][1] === this.filesStateList[file].variables[variable].name) {
              primerOperando = Number(this.filesStateList[file].variables[variable].value);
            }
            if (this.filesStateList[file].codeLines[instruccion][2] === this.filesStateList[file].variables[variable].name) {
              segundoOperando = Number(this.filesStateList[file].variables[variable].value);
            }
            if (this.filesStateList[file].codeLines[instruccion][3] === this.filesStateList[file].variables[variable].name) {

              if (primerOperando === 0 || segundoOperando === 0) {
                this.filesStateList[file].variables[variable].value = '0';
              } else {
                this.filesStateList[file].variables[variable].value = '0';
              }

            }

          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'NO') {

          let guardarResultado: number = 0;
          for (let variable of this.filesStateList[file].variables) {
            if (this.filesStateList[file].codeLines[instruccion][1].trim() === variable.name) {
              if (variable.value === '0') {
                guardarResultado = 1;
              } else {
                guardarResultado = 0;
              }
            }
          }
          for (let variable of this.filesStateList[file].variables) {
            if (this.filesStateList[file].codeLines[instruccion][2].trim() === variable.name) {
              variable.value = String(guardarResultado);
            }
          }

        } else if (this.filesStateList[file].codeLines[instruccion][0].trim().toLowerCase() == 'imprima') {

          if (this.filesStateList[file].codeLines[instruccion][1] == "acumulador") {
            listToPrint.push([this.filesStateList[file]._name, `El valor del acumulador es ${acumulador}`]);
          } else {

            for (let variable = 0; variable < this.filesStateList[file].variables.length; variable++) {

              if (this.filesStateList[file].codeLines[instruccion][1] == this.filesStateList[file].variables[variable].name) {
                listToPrint.push([this.filesStateList[file]._name, `El valor de ${this.filesStateList[file].variables[variable].name} es ${this.filesStateList[file].variables[variable].value}`]);
              }

            }

          }
        }

        if (listToShow.length > 0) {
          this.filesStateList[file].listToShow = listToShow;
        }

        if (listToPrint.length > 0) {
          this.filesStateList[file].listToPrint = listToPrint;
        }

        console.log(acumulador);


      }

      this.filesStateList[file].initialRr = this.filesStateList[file].endingRr;

      this.filesStateList[file].burstCPU -= this.filesStateList[file].endingRr - this.filesStateList[file].arrivalTime;

      this.filesStateList[file].acumulator = acumulador;
      this.filesStateList[file] = this.filesStateList[file];

      for (let miniFile of this.filesStateList) {
        if (miniFile.burstCPU > 500) {
          file = filesArray.length;
        } else {
          console.log("entra");

          if (this.filesStateList.length === filesArray.length) {
            file = this.filesStateList.length - 2;
          } else {
            file = this.filesStateList.length - 1;
          }
          break;
        }
      }

      // Encontrar al que menor arrivalTime valido tenga
      console.log(this.filesStateList);
      console.log(file, 'fileSer');


      debugger;
    }

    for (let miniStateList = 0; miniStateList < this.filesStateList.length; miniStateList++) {
      filesArray[miniStateList] = this.filesStateList[miniStateList];
    }

    return [filesArray];

  }

}
