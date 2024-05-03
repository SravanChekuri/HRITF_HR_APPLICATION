import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'employee-generate-letters',
  templateUrl: './employee-generate-letters.component.html',
  styleUrls: ['./employee-generate-letters.component.css']
})
export class EmployeeGenerateLettersComponent implements OnInit {

  genarateLetterForm: FormGroup;
  letterType: any;
  letterId: any;
  lettersData: any = [
    { name: 'Confirmation Letter', id: 10001 },
    { name: 'Offer Letter', id: 10002 },
    { name: 'Appointment Letter', id: 10003 },
  ];

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.form();
  }

  form() {
    this.genarateLetterForm = this.formbuilder.group({
      letterTypeName: ['', Validators.required],
      letterIdNumber: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      ctc: ['', Validators.required],
    });
  }
  onLetterTypeChange(event: any) {
    this.letterType = event.target.value;
    console.log(this.letterType);
    this.lettersData.forEach((element) => {
      if (element.name === this.letterType) {
        this.letterId = element.id;
        this.genarateLetterForm.patchValue({
          letterIdNumber: this.letterId,
        });
      }
    });
  }

  Genarate() {
    console.log('generate letter fields', this.genarateLetterForm.value);
    const genarateData={
      letterType:this.genarateLetterForm.value['letterTypeName'],
      letterId:this.genarateLetterForm.value['letterIdNumber'],
      Employee_Number:this.genarateLetterForm.value['employeeNumber'],
      CTC:this.genarateLetterForm.value['ctc']
    }
    console.log(genarateData);
  }
}
