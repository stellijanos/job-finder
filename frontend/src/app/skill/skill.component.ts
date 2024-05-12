import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Skill } from '../models/database/skill';
import { SkillService } from '../skill/skill.service';
import { Response } from '../models/auth/response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent implements OnInit {

  createForm: FormGroup = new FormGroup({});

  skills: Skill[] = [];
  filtered: Skill[] = [];

  constructor(private formBuilder: FormBuilder, private skillService: SkillService) {
  }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(64)]]
    });

    this.skillService.getAll().subscribe((skills: Skill[]) => {
      this.skills = skills;
      this.filtered = this.skills;
    });
  }

}
