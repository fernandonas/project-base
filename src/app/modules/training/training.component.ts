import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Exercise } from './models/training.model';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzNotificationServiceModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTabsModule,
    NzTableModule,
    NzCheckboxModule

  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.less'
})
export class TrainingComponent {
  formBuilder = inject(FormBuilder);
  exercices: Exercise[] = [
    {
      category: 'A',
      id: 1,
      machine: '9',
      name: 'Supino Reto Barra',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '3',
      name: 'Supino Reto Máquina',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '2',
      name: 'Voador',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '1',
      name: 'Triceps Polia Alta Corda',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '1',
      name: 'Triceps Polia Alta Barra',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '',
      name: 'ABS Supra',
      checked: false
    },
    {
      category: 'A',
      id: 1,
      machine: '',
      name: 'ABS Infra',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '4',
      name: 'Puxada Frontal',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '1-6',
      name: 'Puxada Frontal Triangulo',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '5',
      name: 'Remada Curvada Triangulo',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '',
      name: 'Remada Cavalinho',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '1-6',
      name: 'Rosca Direta Polia Barra',
      checked: false
    },
    {
      category: 'B',
      id: 1,
      machine: '',
      name: 'Rosca Direta Martelo',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '',
      name: 'Agachamento No Livre',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '17',
      name: 'Leg Press',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '14',
      name: 'Cadeira Extensora',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '24',
      name: 'Mesa Flexora',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '22',
      name: 'Panturrilha Sentada',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '',
      name: 'ABS Infra',
      checked: false
    },
    {
      category: 'C',
      id: 1,
      machine: '',
      name: 'ABS Supra',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '1-6',
      name: 'Desenvolvimento Halter',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '8',
      name: 'Desenvolvimento Máquina',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '',
      name: 'Elevação Lateral',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '1-6',
      name: 'Remada Alta',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '',
      name: 'Prancha Dinamica',
      checked: false
    },
    {
      category: 'D',
      id: 1,
      machine: '',
      name: 'Prancha Alta Tocando As Mãos Nos Ombros',
      checked: false
    }
  ];
  filteredExercices = this.exercices;


  form = this.buildForm();

  buildForm() {
    return this.formBuilder.group({
      category: ['', Validators.required],
      machine: ['', Validators.required],
      name: ['', Validators.required],
      id: [1, Validators.required],
    })
  }

  filter(treino?: string) {
    if(treino){
      this.filteredExercices = this.exercices.filter(x => x.category == treino);
      return
    }
    this.filteredExercices = this.exercices;
  }

  async onSubmit() {
    if (this.form.valid) {

      this.exercices.push({ ...this.form.value, id: 1 + this.exercices.length } as Exercise)
      this.form.reset();
      this.form = this.buildForm();

    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }
}
