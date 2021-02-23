import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  public readonly form: FormGroup;
  public readonly newTitle =  new FormControl('');
  public readonly email =  new FormControl('');

  public Emails :string[] = [];
  constructor(public demoService: DemoService){
    this.form = new FormGroup({
      email: this.email
    });
  }
  async ngOnInit() {

    this.title = await this.demoService.title();
    this.Emails = await this.demoService.getParticipants();

  }

  public async updateTitle(){
    await this.demoService.updateTitle(this.newTitle.value);
    this.ngOnInit();
  }

  public async addParticipant(){
    await this.demoService.addParticipant(this.email.value);
    this.ngOnInit();
  }
}
