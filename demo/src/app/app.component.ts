import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { DemoService } from './demo.service';
import {Participant} from './participant';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  public readonly form: FormGroup;
  public readonly newTitle =  new FormControl('');
  public readonly email =  new FormControl('',);
  public readonly nom =  new FormControl('');
  public readonly prenom =  new FormControl('');
  public readonly ville =  new FormControl('');
  public Participants :Participant[] = [];
  constructor(public demoService: DemoService){
    this.form = new FormGroup({
      nom: this.nom,
      email: this.email,
      prenom: this.prenom,
      ville: this.ville
    });
  }
  async ngOnInit() {

    this.title = await this.demoService.title();
    this.Participants = await this.demoService.getParticipants();

  }

  public async updateTitle(){
    await this.demoService.updateTitle(this.newTitle.value);
    this.ngOnInit();
  }

  public async addParticipant(){
    await this.demoService.addParticipant(this.prenom.value,this.nom.value,this.email.value,this.ville.value);
    this.ngOnInit();
  }
}
